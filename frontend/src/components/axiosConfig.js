// axiosConfig.js
import axios from 'axios';
import Swal from 'sweetalert2';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // Adjust this to match your Laravel backend URL
    withCredentials: true, // This is important for Sanctum
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add CSRF token to headers
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }

  return config;
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem('token');
      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again.',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = '/auth'; // Redirect to login page
      });
    }
    return Promise.reject(error);
  }
);

export default instance;