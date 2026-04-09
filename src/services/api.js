import apiService from '../utils/api/axios';

// Example API service methods
export const exampleApi = {
  // Get all items
  getAllItems: () => apiService.get('/items'),
  
  // Get item by ID
  getItemById: (id) => apiService.get(`/items/${id}`),
  
  // Create new item
  createItem: (itemData) => apiService.post('/items', itemData),
  
  // Update item
  updateItem: (id, itemData) => apiService.put(`/items/${id}`, itemData),
  
  // Delete item
  deleteItem: (id) => apiService.delete(`/items/${id}`),
  
  // Upload file
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiService.upload('/upload', formData);
  },
  
  // Download file
  downloadFile: (fileId) => apiService.download(`/files/${fileId}/download`),
};

// Real estate specific API methods (example for this project)
export const propertyApi = {
  // Get all properties
  getProperties: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/properties?${queryString}`);
  },
  
  // Get property by ID
  getPropertyById: (id) => apiService.get(`/properties/${id}`),
  
  // Search properties
  searchProperties: (searchCriteria) => apiService.post('/properties/search', searchCriteria),
  
  // Get featured properties
  getFeaturedProperties: () => apiService.get('/properties/featured'),
  
  // Get properties by agent
  getPropertiesByAgent: (agentId) => apiService.get(`/properties/agent/${agentId}`),
  
  // Save property to favorites
  saveToFavorites: (propertyId) => apiService.post(`/favorites/${propertyId}`),
  
  // Remove from favorites
  removeFromFavorites: (propertyId) => apiService.delete(`/favorites/${propertyId}`),
};

export default { exampleApi, propertyApi };
