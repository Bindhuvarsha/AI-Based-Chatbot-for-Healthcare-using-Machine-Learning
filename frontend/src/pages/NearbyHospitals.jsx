import { useState } from 'react';
import { getNearbyHospitals } from '../services/apiService';

export default function NearbyHospitals() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoading(false);
        },
        (error) => {
          setError('Unable to get your location: ' + error.message);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!latitude || !longitude) {
      setError('Please enter or allow location access');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getNearbyHospitals(parseFloat(latitude), parseFloat(longitude));
      setHospitals(data.hospitals || []);
    } catch (err) {
      setError('Failed to fetch hospitals. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="card mb-8">
        <h1 className="text-4xl font-bold mb-2">Find Nearby Hospitals</h1>
        <p className="text-gray-600 mb-6">Locate healthcare facilities near you</p>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Enter latitude"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Enter longitude"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search Hospitals'}
            </button>
            <button
              type="button"
              onClick={getLocation}
              disabled={loading}
              className="btn-secondary flex-1 disabled:opacity-50"
            >
              Use My Location
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      {hospitals.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Nearby Hospitals ({hospitals.length})</h2>
          
          <div className="grid gap-4">
            {hospitals.map((hospital, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{hospital.name}</h3>
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
                    {hospital.distance?.toFixed(1) || 'N/A'} km
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{hospital.address}</p>
                {hospital.phone && (
                  <p className="text-sm text-gray-700">📞 {hospital.phone}</p>
                )}
                {hospital.rating && (
                  <p className="text-sm text-yellow-600">⭐ {hospital.rating}/5 ({hospital.user_ratings_total} reviews)</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
