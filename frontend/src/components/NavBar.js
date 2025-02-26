import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from './authUtils'; 
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  const goToUserManagement = () => {
    navigate('/users');
  };

  return (
    <nav className="navbar">
      <ul className="left">
        <li onClick={goToHome}>Home</li>
        <li onClick={goToUserManagement}>User Management</li>
      </ul>
      <ul className="right">
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export default NavBar;