import React, { useState } from 'react';
import axios from './axiosConfig'; // Adjust the path as necessary
import './Form.css';

const LoginForm = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Basic validation
    if (!email || !password) {
      setErrors({ api: 'Both email and password are required.' });
      return;
    }

    try {
      const response = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store the token
      window.location.href = '/home'; // Redirect to home page or dashboard
    } catch (error) {
      setErrors({ api: 'Login failed. Please check your credentials and try again.' });
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p className="error">{errors.email}</p>}
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p className="error">{errors.password}</p>}
        <button className="btn" type="submit">Login</button>
        {errors.api && <p className="error">{errors.api}</p>}
      </form>
      <p>
        Don't have an account? <span onClick={toggleForm} className="toggle-link">Register</span>
      </p>
    </div>
  );
};

export default LoginForm;
