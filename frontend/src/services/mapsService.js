const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const getPlaceDetails = async (placeId) => {
  try {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );
    
    return new Promise((resolve, reject) => {
      service.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject(status);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};

export const searchNearbyPlaces = async (location, type) => {
  try {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );
    
    return new Promise((resolve, reject) => {
      const request = {
        location,
        radius: 5000,
        type,
      };
      
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  } catch (error) {
    console.error('Error searching nearby places:', error);
    throw error;
  }
};

export const geocodeAddress = async (address) => {
  try {
    const geocoder = new window.google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          resolve(results[0]);
        } else {
          reject(status);
        }
      });
    });
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};
