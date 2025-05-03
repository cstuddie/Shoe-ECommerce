// src/components/FeaturedProducts.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

// Import your local images using require() - This part you already have correctly
import shoe1 from './assets/runningshoes.jpg';
import shoe2 from './assets/classicrunning.jpg';
import shoe3 from './assets/urbanshoes.jpg';
import shoe4 from './assets/casual.webp';

// Placeholder data - Using your image imports
const placeholderProducts = [
  { id: 1, name: 'Stylish Runner', price: '$120', imageUrl: shoe1},
  { id: 2, name: 'Classic Comfort', price: '$90', imageUrl: shoe2},
  { id: 3, name: 'Urban Explorer', price: '$150', imageUrl: shoe3 },
  { id: 4, name: 'Casual Walker', price: '$85', imageUrl: shoe4 },
];

function FeaturedProducts() {
  const navigate = useNavigate(); // <-- Get the navigate function

  const handleShopNowClick = (productId) => {
    // --- FIX: Ensure the path matches the route in App.js (/product/:productId) ---
    console.log(`Attempting navigation to: /product/${productId}`); // Add console log for verification
    navigate(`/product/${productId}`); // <-- Navigate to the correct path (singular 'product')
    // --- End FIX ---
  };

  return (
    <section className="featured-products">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="product-list">
          {placeholderProducts.map(product => (
            <div key={product.id} className="product-card">
              {/* Make the image area clickable too */}
              {/* --- Add onClick handler to image container --- */}
              <div className="product-image-container" onClick={() => handleShopNowClick(product.id)} style={{ cursor: 'pointer' }}>
                 <img src={product.imageUrl} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              {/* Add the "Shop Now" button */}
              {/* --- Add the button and its onClick handler --- */}
              <button
                className="product-card-button" // Use a CSS class for styling (ensure it's in App.css)
                onClick={() => handleShopNowClick(product.id)}
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;