import axios from './axiosConfig'; // Adjust the path as necessary

const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  console.log('Token:', token); // Add this to inspect the token value
  return !!token; // Return true if token exists, false otherwise
};

const handleLogin = async (email, password) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    console.log('Response:', response.data);  // Check the response structure here
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Store the token
      window.location.href = '/home'; // Redirect to home page or dashboard
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