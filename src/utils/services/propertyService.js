import apiService from "../api/apiService";
import { API_URLS } from "../api/apiUrls";

export const getPropertyById = async (id) => {
  const res = await apiService.get(`${API_URLS.PROPERTY}/${id}`);
  return res.data.data;
};