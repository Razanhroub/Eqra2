import React, { useState } from 'react';
import axios from './axiosConfig'; // Adjust the path as necessary
import './Form.css';

const RegisterForm = ({ toggleForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (name.length > 50) newErrors.name = 'Name must be less than 50 characters';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email must be valid';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}/.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, and at least two special characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('/api/register', { name, email, password });
      toggleForm(); // Redirect to login form
    } catch (error) {
      setErrors({ api: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p className="error">{errors.name}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p className="error">{errors.email}</p>}
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p className="error">{errors.password}</p>}
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <button className="btn" type="submit">Register</button>
        {errors.api && <p className="error">{errors.api}</p>}
      </form>
      <p>
        Already have an account? <span onClick={toggleForm} className="toggle-link">Login</span>
      </p>
    </div>
  );
};

export default RegisterForm;