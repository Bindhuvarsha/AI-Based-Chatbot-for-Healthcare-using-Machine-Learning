import googlemaps
import os
from dotenv import load_dotenv
from typing import List, Dict, Optional, Tuple
import math

load_dotenv()

# Specialty to search keywords mapping
SPECIALTY_KEYWORDS = {
    "cardiology": ["cardiology", "cardiac", "heart", "cardiovascular"],
    "neurology": ["neurology", "neuro", "brain", "neurological"],
    "orthopedic": ["orthopedic", "orthopedics", "bone", "joint"],
    "pediatrics": ["pediatric", "children", "child"],
    "dermatology": ["dermatology", "skin", "dermatologist"],
    "ophthalmology": ["ophthalmology", "eye", "vision"],
    "psychiatry": ["psychiatry", "mental", "psychology"],
    "oncology": ["oncology", "cancer"],
    "gastroenterology": ["gastroenterology", "digestive", "stomach"],
    "pulmonology": ["pulmonology", "respiratory", "lung", "pneumonia"],
    "emergency": ["emergency", "er", "e.r.", "urgent"],
    "general": ["general", "primary", "family medicine"]
}


class MapsService:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_MAPS_API_KEY")
        if self.api_key:
            self.gmaps = googlemaps.Client(key=self.api_key)
        else:
            self.gmaps = None

    def get_nearby_hospitals(self, location: str, radius: int = 5000, specialty: Optional[str] = None, sort_by: str = "distance") -> Dict:
        """
        Get nearby hospitals with optional specialty filtering
        """
        if not self.gmaps:
            return {"error": "Google Maps API Key not configured", "hospitals": []}

        try:
            # location can be a string (address) or coordinates
            places_result = self.gmaps.places_nearby(
                location=location,
                radius=radius,
                type='hospital'
            )
            
            hospitals = []
            user_location = self._parse_location(location) if isinstance(location, str) else location
            
            for place in places_result.get('results', []):
                hospital = self._parse_hospital(place, user_location, specialty)
                if hospital:
                    hospitals.append(hospital)
            
            # Apply sorting
            hospitals = self._sort_hospitals(hospitals, sort_by)
            
            return {
                "status": "success",
                "hospitals": hospitals,
                "total": len(hospitals)
            }
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "hospitals": []
            }

    def search_hospitals_by_specialty(self, location: str, specialty: str, radius: int = 5000) -> Dict:
        """
        Search hospitals filtered by medical specialty
        """
        if not self.gmaps:
            return {"error": "Google Maps API Key not configured", "hospitals": []}

        try:
            # Search for specialty-specific hospitals
            keywords = SPECIALTY_KEYWORDS.get(specialty.lower(), [specialty])
            
            hospitals = []
            user_location = self._parse_location(location)
            
            for keyword in keywords[:3]:  # limit searches
                places_result = self.gmaps.places_nearby(
                    location=location,
                    radius=radius,
                    type='hospital',
                    keyword=keyword
                )
                
                for place in places_result.get('results', []):
                    hospital = self._parse_hospital(place, user_location, specialty)
                    if hospital and hospital not in hospitals:
                        hospitals.append(hospital)
            
            return {
                "status": "success",
                "specialty": specialty,
                "hospitals": hospitals,
                "total": len(hospitals)
            }
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "hospitals": []
            }

    def get_emergency_services(self, location: str, radius: int = 5000) -> Dict:
        """
        Get emergency services (hospitals with 24-hour ER)
        """
        if not self.gmaps:
            return {"error": "Google Maps API Key not configured"}

        try:
            # Search for hospitals with emergency services
            places_result = self.gmaps.places_nearby(
                location=location,
                radius=radius,
                type='hospital',
                keyword='emergency'
            )
            
            emergency_services = []
            user_location = self._parse_location(location)
            
            for place in places_result.get('results', []):
                hospital = self._parse_hospital(place, user_location)
                if hospital:
                    hospital['emergency_available'] = True
                    emergency_services.append(hospital)
            
            return {
                "status": "success",
                "emergency_services": emergency_services,
                "total": len(emergency_services)
            }
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "emergency_services": []
            }

    def get_distance_between(self, location1: Tuple[float, float], location2: Tuple[float, float]) -> float:
        """
        Calculate distance between two coordinates in km using Haversine formula
        """
        lat1, lon1 = location1
        lat2, lon2 = location2
        
        R = 6371  # Earth radius in km
        
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat/2) * math.sin(dlat/2) +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
             math.sin(dlon/2) * math.sin(dlon/2))
        c = 2 * math.asin(math.sqrt(a))
        
        return R * c

    def _parse_location(self, location_str: str) -> Tuple[float, float]:
        """
        Parse location string to coordinates
        """
        if isinstance(location_str, str) and ',' in location_str:
            try:
                lat, lng = location_str.split(',')
                return (float(lat.strip()), float(lng.strip()))
            except:
                # Geocode the address
                try:
                    geocode_result = self.gmaps.geocode(location_str)
                    if geocode_result:
                        location = geocode_result[0]['geometry']['location']
                        return (location['lat'], location['lng'])
                except:
                    pass
        return (0, 0)

    def _parse_hospital(self, place: Dict, user_location: Tuple[float, float], specialty: Optional[str] = None) -> Optional[Dict]:
        """
        Parse Google Places result into hospital object
        """
        try:
            geometry = place.get("geometry", {}).get("location", {})
            hospital_location = (geometry.get("lat"), geometry.get("lng"))
            
            distance = self.get_distance_between(user_location, hospital_location) if user_location != (0, 0) else 0
            
            hospital = {
                "id": place.get("place_id"),
                "name": place.get("name"),
                "address": place.get("vicinity"),
                "latitude": geometry.get("lat"),
                "longitude": geometry.get("lng"),
                "distance": round(distance, 2),
                "rating": place.get("rating"),
                "reviews_count": place.get("user_ratings_total", 0),
                "opening_hours": place.get("opening_hours", {}).get("weekday_text"),
                "is_open": place.get("opening_hours", {}).get("open_now"),
                "specialties": self._detect_specialties(place.get("types", [])),
                "emergency_available": self._has_emergency_service(place)
            }
            
            return hospital
        except Exception as e:
            print(f"Error parsing hospital: {e}")
            return None

    def _detect_specialties(self, types: List[str]) -> List[str]:
        """
        Detect hospital specialties from place types
        """
        specialties = []
        types_str = " ".join(types).lower()
        
        for specialty, keywords in SPECIALTY_KEYWORDS.items():
            for keyword in keywords:
                if keyword in types_str:
                    if specialty not in specialties:
                        specialties.append(specialty)
                    break
        
        return specialties if specialties else ["general"]

    def _has_emergency_service(self, place: Dict) -> bool:
        """
        Check if hospital has emergency services
        """
        # Check if it's open 24/7 or has emergency keyword
        types = place.get("types", [])
        if any("emergency" in t.lower() for t in types):
            return True
        
        opening_hours = place.get("opening_hours", {})
        if opening_hours.get("open_now") is True:
            return True
        
        return False

    def _sort_hospitals(self, hospitals: List[Dict], sort_by: str) -> List[Dict]:
        """
        Sort hospitals by specified criteria
        """
        if sort_by == "distance":
            return sorted(hospitals, key=lambda x: x.get("distance", float('inf')))
        elif sort_by == "rating":
            return sorted(hospitals, key=lambda x: x.get("rating", 0), reverse=True)
        elif sort_by == "emergency_availability":
            return sorted(hospitals, key=lambda x: (not x.get("emergency_available", False), x.get("distance", float('inf'))))
        
        return hospitals


maps_service = MapsService()
