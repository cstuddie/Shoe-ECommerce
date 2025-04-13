import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <h1>Welcome to Stepup</h1>
        <p>Find your perfect pair today!</p>
        <Link to="/inventory" style={{ textDecoration: 'none' }}>
          <button className="hero-button">Shop Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;