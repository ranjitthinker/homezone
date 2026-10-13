// lib/settings.js
import apiService from '../api/apiService';

export async function getSettings() {
  try {
    const response = await apiService.get('/settings', {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
      },
    });

    return response.data;
  } catch (error) {
    return null;
  }
}