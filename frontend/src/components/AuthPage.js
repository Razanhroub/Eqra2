import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      {isLogin ? <LoginForm toggleForm={toggleForm} /> : <RegisterForm toggleForm={toggleForm} />}
    </div>
  );
};

export default AuthPage;