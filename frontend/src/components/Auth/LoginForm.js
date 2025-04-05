import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

// Receives onLogin prop from LoginPage (which gets it from App.js)
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Add state to simulate different roles for testing
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // To get redirect target after login (optional)

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- Backend API Call would go here ---
    // Instead, we simulate:
    console.log('Simulating login for:', email, 'with role:', role);

    // Basic validation simulation
    if (email === '' || password === '') {
        setError('Please enter email and password.');
        return;
    }
    if (password === 'fail') { // Simple way to test failure
        setError('Simulated login failure.');
        return;
    }

    // Simulate successful login by calling the handler passed from App.js
    // Pass the selected role and a fake name
    onLogin(role, email.split('@')[0]); // Use part of email as fake name

    // Determine where to redirect after login
    const from = location.state?.from?.pathname || '/profile'; // Default to profile
    navigate(from, { replace: true });

    // --- End Simulation ---
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email">Email:</label>
        <input
          style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">Password:</label>
        <input
           style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter 'fail' to simulate error"
        />
      </div>
       {/* --- Role Selector for Simulation --- */}
       <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="role-select">Simulate Role:</label>
            <select
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            >
                <option value="user">User/Customer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
            </select>
       </div>
       {/* --- End Role Selector --- */}
      <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
        Login
      </button>
      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );
}
export default LoginForm;