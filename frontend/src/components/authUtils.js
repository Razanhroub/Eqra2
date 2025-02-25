import axios from './axiosConfig'; // Adjust the path as necessary

const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1]));
  const expiry = payload.exp * 1000;
  return Date.now() < expiry;
};

const handleLogin = async (email, password) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = '/home';
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export { checkTokenExpiration, handleLogin, handleLogout };