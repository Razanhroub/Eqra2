import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // Adjust this to match your Laravel backend URL
    withCredentials: true, // This is important for Sanctum
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;