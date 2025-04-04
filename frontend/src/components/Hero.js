import React from 'react';

function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <h1>Welcome to ShoeStore</h1>
        <p>Find your perfect pair today!</p>
        {/* This button will eventually link to the products page */}
        <button className="hero-button">Shop Now</button>
      </div>
    </div>
  );
}

export default Hero;