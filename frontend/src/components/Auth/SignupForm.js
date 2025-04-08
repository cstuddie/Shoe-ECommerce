// src/components/Auth/SignupForm.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Simulate role choice
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // For success message
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Basic validation
    if (!name || !email || !password) {
        setError('Please fill in all required fields.');
        return;
    }

    // --- Backend API Call would go here ---
    // Instead, we simulate:
    console.log('Simulating signup for:', { name, email, role }); // Don't log password

    // Simulate potential backend error (e.g., email exists)
    if (email === 'taken@example.com') {
        setError('Simulated Error: Email already taken.');
        return;
    }

    // Simulate success
    setMessage('Signup successful! Redirecting to login...');
    alert('Simulated Signup Successful!'); // Simple alert feedback

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate('/login');
    }, 1500); // Wait 1.5 seconds before redirecting

    // --- End Simulation ---
  };

  return (
    // Using basic inline styles for structure, replace with CSS classes later
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Full Name:</label>
        <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter taken@example.com to simulate error"
            style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
       {/* --- Role Selector for Simulation --- */}
       <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="role-select-signup" style={{ display: 'block', marginBottom: '5px' }}>Register as:</label>
            <select
                id="role-select-signup"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
            >
                <option value="user">Customer</option>
                <option value="seller">Seller</option>
                {/* Usually Admin accounts aren't created via public signup */}
            </select>
       </div>
       {/* --- End Role Selector --- */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
        <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', width: '100%' }}>
        Sign Up
      </button>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Already have an account? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login</Link>
      </p>
    </form>
  );
}
export default SignupForm;