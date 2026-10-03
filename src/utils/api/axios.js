// ✅ axios.js — clean version
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});
// should print your IP

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const duration = new Date() - response.config.metadata.startTime;

    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });

    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('authToken'); // ✅ guarded
      window.location.href = '/'; // ✅ guarded
    }

    return Promise.reject(error);
  }
);

export { api }; // ✅ only export api here, apiService is in its own file
