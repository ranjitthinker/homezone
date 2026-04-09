import apiService from '@/utils/api/apiService';

export async function getProperties(page = 1) {
  const response = await apiService.get(`api/v1/properties?page=${page}`);
  return response.data;
}