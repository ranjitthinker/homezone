// ✅ axios.js — clean version
import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.homzzone.com/api/v1';
  let cleaned = envUrl.trim().replace(/\/+$/, '');
  if (!cleaned.endsWith('/v1') && cleaned.includes('/api')) {
    cleaned = `${cleaned}/v1`;
  }
  return cleaned;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});

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
