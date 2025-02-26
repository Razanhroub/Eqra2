import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from './authUtils'; // Adjust the path as necessary

const Home = () => {
  const navigate = useNavigate();

  const goToUserManagement = () => {
    navigate('/users');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <button onClick={goToUserManagement} className="btn">User Management</button>
      <button onClick={handleLogout} className="btn">Logout</button>
    </div>
  );
};

export default Home;