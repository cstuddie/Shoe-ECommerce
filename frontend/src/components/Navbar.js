import React from 'react';
// We will use React Router's Link component later instead of <a> tags
// import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        {/* Replace '#' with '/' for home link later */}
        <a href="#" className="navbar-brand">ShoeStore</a>
        <div className="navbar-links">
          {/* Replace '#' with actual paths later e.g., '/products', '/cart', '/login' */}
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Cart</a>
          <a href="#">Login/Sign Up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;