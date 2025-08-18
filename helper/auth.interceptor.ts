import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = __DEV__
  ? // 'http://192.168.100.130:8080' // ip Seba
    'http://192.168.3.135:8080' // ip notebook Gabi
  : 'https://api.miapp.com'; // Producción

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor: agrega token a cada request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
