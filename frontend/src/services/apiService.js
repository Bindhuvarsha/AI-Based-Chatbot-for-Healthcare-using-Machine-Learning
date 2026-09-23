import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Symptom Analysis API
export const analyzeSymptoms = async (symptoms) => {
  try {
    const response = await apiClient.post('/analyze-symptoms', { symptoms });
    return response.data;
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw error;
  }
};

// Get similar diseases
export const getSimilarDiseases = async (symptoms) => {
  try {
    const response = await apiClient.post('/similar-diseases', { symptoms });
    return response.data;
  } catch (error) {
    console.error('Error fetching similar diseases:', error);
    throw error;
  }
};

// Get nearby hospitals/clinics
export const getNearbyHospitals = async (latitude, longitude, radius = 5000) => {
  try {
    const response = await apiClient.get('/nearby-hospitals', {
      params: { lat: latitude, lng: longitude, radius },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    throw error;
  }
};

// Get medical information
export const getMedicalInfo = async (disease) => {
  try {
    const response = await apiClient.get(`/medical-info/${disease}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching medical info:', error);
    throw error;
  }
};

// Chat with AI
export const chatWithAI = async (message) => {
  try {
    const response = await apiClient.post('/chat', { message });
    return response.data;
  } catch (error) {
    console.error('Error in chat:', error);
    throw error;
  }
};

export default apiClient;
