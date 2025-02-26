import React, { useState } from 'react';
import './Form.css';
import { handleLogin } from './authUtils'; 

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
      await handleLogin(email, password);
    } catch (error) {
      setErrors({ api: error.message });
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
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
    </div>
  );
};

export default LoginForm;