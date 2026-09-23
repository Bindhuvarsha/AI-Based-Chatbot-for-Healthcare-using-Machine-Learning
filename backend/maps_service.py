import googlemaps
from config import settings

# Initialize Google Maps client
gmaps = googlemaps.Client(key=settings.GOOGLE_MAPS_API_KEY)

def find_nearby_hospitals(latitude: float, longitude: float, radius: int = 5000):
    """Find nearby hospitals using Google Places API"""
    try:
        location = (latitude, longitude)
        places_result = gmaps.places_nearby(location=location, radius=radius, type='hospital')
        
        hospitals = []
        for place in places_result.get('results', []):
            hospital = {
                'name': place.get('name'),
                'address': place.get('vicinity'),
                'latitude': place['geometry']['location']['lat'],
                'longitude': place['geometry']['location']['lng'],
                'distance': calculate_distance(latitude, longitude, 
                                             place['geometry']['location']['lat'],
                                             place['geometry']['location']['lng']),
                'rating': place.get('rating'),
                'user_ratings_total': place.get('user_ratings_total'),
                'place_id': place.get('place_id'),
            }
            hospitals.append(hospital)
        
        return {
            'hospitals': hospitals,
            'count': len(hospitals),
            'location': {'latitude': latitude, 'longitude': longitude}
        }
    except Exception as e:
        print(f"Error finding hospitals: {e}")
        return {'hospitals': [], 'count': 0, 'error': str(e)}

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two coordinates (Haversine formula)"""
    from math import radians, cos, sin, asin, sqrt
    
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    km = 6371 * c
    return km

def get_place_details(place_id: str):
    """Get detailed information about a place"""
    try:
        place_details = gmaps.place(place_id=place_id)
        return place_details.get('result', {})
    except Exception as e:
        print(f"Error getting place details: {e}")
        return {}
