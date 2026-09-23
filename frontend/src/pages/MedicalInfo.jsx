import { useState } from 'react';
import { getMedicalInfo } from '../services/apiService';

export default function MedicalInfo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicalData, setMedicalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter a disease or condition');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getMedicalInfo(searchTerm);
      setMedicalData(data);
    } catch (err) {
      setError('Failed to fetch medical information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="card mb-8">
        <h1 className="text-4xl font-bold mb-2">Medical Information</h1>
        <p className="text-gray-600 mb-6">Search for diseases and medical conditions</p>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for disease or condition..."
              className="input-field flex-1"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      {medicalData && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">{medicalData.name || searchTerm}</h2>

          {medicalData.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{medicalData.description}</p>
            </div>
          )}

          {medicalData.symptoms && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Common Symptoms</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {medicalData.symptoms.map((symptom, idx) => (
                  <li key={idx}>{symptom}</li>
                ))}
              </ul>
            </div>
          )}

          {medicalData.treatment && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Treatment</h3>
              <p className="text-gray-700">{medicalData.treatment}</p>
            </div>
          )}

          {medicalData.prevention && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Prevention</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {Array.isArray(medicalData.prevention) 
                  ? medicalData.prevention.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))
                  : <li>{medicalData.prevention}</li>
                }
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
