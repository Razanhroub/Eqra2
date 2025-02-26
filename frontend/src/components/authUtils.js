import axios from './axiosConfig'; 
const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  console.log('Token:', token); 
  return !!token; // Return true if token exists
};

const handleLogin = async (email, password) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    console.log('Response:', response.data);  
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Store the token
      window.location.href = '/home'; // Redirect to home page 
    } else {
      console.error('No token received from the server.');
    }
  } catch (error) {
    throw new Error('Login failed. Please check your credentials and try again.');
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/auth'; // Redirect to login page
};

export { checkTokenExpiration, handleLogin, handleLogout };