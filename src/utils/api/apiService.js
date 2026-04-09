import { api } from './axios';

// Helper methods for common HTTP operations
const apiService = {
  // GET request
  get: (url, config = {}) => api.get(url, config),
  
  // POST request
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  
  // PUT request
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  
  // PATCH request
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  
  // DELETE request
  delete: (url, config = {}) => api.delete(url, config),
  
  // File upload
  upload: (url, formData, config = {}) => {
    const uploadConfig = {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post(url, formData, uploadConfig);
  },
  
  // Download file
  download: (url, config = {}) => {
    const downloadConfig = {
      ...config,
      responseType: 'blob',
    };
    return api.get(url, downloadConfig);
  },
};

export default apiService;
