// src/pages/SignupPage.js
import React from 'react';
import SignupForm from '../components/Auth/SignupForm'; // <-- Import the actual form component

function SignupPage() {
  return (
    // You can add specific styling for the page container if needed
    <div className="container signup-page-container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
      <SignupForm /> {/* <-- Render the imported form here, replacing the placeholder */}
    </div>
  );
}

export default SignupPage;