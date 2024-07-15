import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://shiv-fast-food-backend-wuq9.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch menu items
export const fetchItems = async () => {
  const response = await apiClient.get('/menu/get-item');
  return response.data;
};

// Fetch kitchen status
export const fetchKitchenStatus = async () => {
  const response = await apiClient.get('/kitchen/');
  return response.data;
};
