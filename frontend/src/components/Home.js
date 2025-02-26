import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from './authUtils'; 
import NavBar from './NavBar'; 
import './Home.css';


const Home = () => {
  const navigate = useNavigate();

  const goToUserManagement = () => {
    navigate('/user-management');
  };

  return (
    <div>
      <NavBar /> 
      <div className="home-container">
        <h1>Welcome to the Home Page</h1>

      </div>
    </div>
  );
};

export default Home;