// lib/settings.js
import apiService from '../api/apiService';

export async function getSettings() {
  try {
    const response = await apiService.get('/settings');
    
    return response.data;
  } catch (error) {
    
    return null;
  }
}