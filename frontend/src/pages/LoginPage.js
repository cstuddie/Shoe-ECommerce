import React from 'react';
import LoginForm from '../components/Auth/LoginForm'; // Import the form

// Receives onLogin from App.js route setup
function LoginPage({ onLogin }) {
  return (
    <div className="container">
      <h2>Login</h2>
      {/* Pass the onLogin handler down to the form */}
      <LoginForm onLogin={onLogin} />
    </div>
  );
}
export default LoginPage;