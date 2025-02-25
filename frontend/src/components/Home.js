import React from 'react';
import { handleLogout } from './authUtils'; // Adjust the path as necessary

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLogout} className="btn">Logout</button>
    </div>
  );
};

export default Home;