// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import UserManagement from './components/UserManagement';
import { checkTokenExpiration } from './components/authUtils'; 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={checkTokenExpiration() ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/users" element={checkTokenExpiration() ? <UserManagement /> : <Navigate to="/auth" />} />
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;