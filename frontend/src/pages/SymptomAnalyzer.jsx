import { useState, useEffect } from 'react';
import { analyzeSymptoms } from '../services/apiService';

export default function SymptomAnalyzer() {
  const [symptoms, setSymptoms] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please enter at least one symptom');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await analyzeSymptoms(symptoms.split(',').map(s => s.trim()));
      setResults(data);
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="card mb-8">
        <h1 className="text-4xl font-bold mb-2">Medical Symptom Analyzer</h1>
        <p className="text-gray-600 mb-6">Enter your symptoms and get AI-powered analysis</p>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter Symptoms (comma-separated)
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., fever, cough, headache"
              className="input-field h-24"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Symptoms'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      {results && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          
          <div className="space-y-4">
            {results.potential_diseases && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Potential Diseases</h3>
                <ul className="space-y-2">
                  {results.potential_diseases.map((disease, idx) => (
                    <li key={idx} className="p-3 bg-blue-50 rounded border border-blue-200">
                      <div className="font-medium">{disease.name}</div>
                      <div className="text-sm text-gray-600">Confidence: {(disease.confidence * 100).toFixed(1)}%</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {results.recommendations && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {results.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                ⚠️ This is an AI analysis and not a medical diagnosis. Please consult a healthcare professional for proper medical advice.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
