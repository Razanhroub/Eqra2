import axios from 'axios';
import Swal from 'sweetalert2';

const instance = axios.create({
    baseURL: 'http://localhost:8000', 
    withCredentials: true, 
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Token expired or invalid');
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