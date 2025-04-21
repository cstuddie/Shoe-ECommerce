// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// will eventually come from DB, but mock data for now
// will be seperate function for calling inventory/product
const productData = {
  1: { // Numeric key
    id: 1,
    name: 'Stylish Runner',
    price: '120',
    description: 'Premium running shoes with exceptional comfort and support. Perfect for daily runs and training sessions.',
    imageUrl: require('../components/assets/runningshoes.jpg'),
    menSizes: ['7', '8', '9', '10', '11', '12', '13'],
    womenSizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: ['Black/White', 'Blue/Gray', 'Red/White']
  },
  2: { // Numeric key
    id: 2,
    name: 'Classic Comfort',
    price: '90',
    description: 'Timeless design meets everyday comfort. These shoes are perfect for casual wear and light activities.',
    imageUrl: require('../components/assets/classicrunning.jpg'),
    menSizes: ['7', '8', '9', '10', '11', '12'],
    womenSizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['White/Gray', 'Black/Black', 'Navy/White']
  },
  3: { // Numeric key
    id: 3,
    name: 'Urban Explorer',
    price: '150',
    description: 'Versatile shoes designed for the city explorer. Stylish enough for work, comfortable enough for play.',
    imageUrl: require('../components/assets/urbanshoes.jpg'),
    menSizes: ['7', '8', '9', '10', '11', '12'],
    womenSizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['Black/Black', 'Brown/Tan', 'Gray/White']
  },
  4: { // Numeric key
    id: 4,
    name: 'Casual Walker',
    price: '85',
    description: 'Lightweight and flexible shoes perfect for everyday walking and casual outings.',
    imageUrl: require('../components/assets/casual.webp'),
    menSizes: ['7', '8', '9', '10', '11', '12', '13'],
    womenSizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: ['Gray/White', 'Black/White', 'Blue/White']
  }
};

// Receives onAddToCart handler from App.js route setup
function ProductPage({ onAddToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedGender, setSelectedGender] = useState('men'); // Default to men
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setError(null); // Clear previous errors
    const productIdNum = parseInt(productId);
    const fetchedProduct = productData[productIdNum];

    // Simulate network delay
    setTimeout(() => {
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        // Set initial selected variation states
        setSelectedGender('men'); // Default
        setSelectedSize(fetchedProduct.menSizes && fetchedProduct.menSizes.length > 0 ? fetchedProduct.menSizes[0] : '');
        setSelectedColor(fetchedProduct.colors && fetchedProduct.colors.length > 0 ? fetchedProduct.colors[0] : '');
      } else {
        setProduct(null); // Ensure product is null if not found
        setError("Product not found."); // Set error message
      }
      setLoading(false);
    }, 300);

  }, [productId]); // Re-run effect when productId changes

  const getCurrentSizes = () => {
    if (!product) return [];
    return selectedGender === 'men' ? product.menSizes : product.womenSizes;
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    // Reset size selection to first available in the new gender category
    const newSizes = gender === 'men' ? product.menSizes : product.womenSizes;
    setSelectedSize(newSizes && newSizes.length > 0 ? newSizes[0] : '');
  };

  const handleAddToCartClick = () => {
      // === Validation: Ensure size and color are selected ===
      if (!selectedSize) {
          alert("Please select a size.");
          return;
      }
       if (!selectedColor) {
          alert("Please select a color.");
          return;
      }
      // Gender is defaulted, but you could add a check if needed

      // Call the handler passed from App.js
      // Pass the product details and selected variations
      onAddToCart(product, selectedSize, selectedColor, selectedGender, 1); // Add 1 quantity by default
  };


  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) { // Handle both explicit error and product not found
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
        <h2>{error || "Product Not Found"}</h2> {/* Display error message */}
        <p>{!error && "The product you're looking for doesn't exist or has been removed."}</p>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          Return to Home
        </Link>
      </div>
    );
  }

   // Use inline styles or move to CSS file
  const pageStyles = {
      padding: '20px 0',
      maxWidth: '1000px', // Limit width
      margin: 'auto', // Center the container
  };

  const flexContainerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    marginTop: '20px',
    justifyContent: 'center' // Center content if it wraps
  };

  const imageContainerStyles = {
    flex: '1',
    minWidth: '300px',
    maxWidth: '450px', // Adjust max width as needed
  };

   const detailsContainerStyles = {
    flex: '1',
    minWidth: '300px',
    maxWidth: '500px', // Adjust max width as needed
  };

  const imageStyles = {
    width: '100%',
    height: 'auto', // Maintain aspect ratio
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const buttonStyles = {
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '10px', // Space between buttons
      marginBottom: '10px' // Space below buttons if they wrap
  }

  const selectedButtonStyles = {
       ...buttonStyles, // Inherit basic styles
       border: '2px solid #007bff',
       background: '#f0f8ff',
       fontWeight: 'bold'
  }

   const unselectedButtonStyles = {
       ...buttonStyles, // Inherit basic styles
        border: '1px solid #ddd',
        background: 'white',
        fontWeight: 'normal'
   }


  return (
    <div className="container product-detail-page" style={pageStyles}>
      <div style={flexContainerStyles}>
        {/* Image Column */}
        <div style={imageContainerStyles}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={imageStyles}
          />
        </div>

        {/* Details Column */}
        <div style={detailsContainerStyles}>
          <h2>{product.name}</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff', marginBottom: '20px' }}>${product.price}</p>

          <div style={{ margin: '20px 0' }}>
            <h3>Description</h3>
            <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>{product.description}</p>
          </div>

          {/* Gender Selection */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Select Size Type</h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => handleGenderChange('men')}
                 style={selectedGender === 'men' ? selectedButtonStyles : unselectedButtonStyles}
              >
                Men's Sizes
              </button>
              <button
                onClick={() => handleGenderChange('women')}
                style={selectedGender === 'women' ? selectedButtonStyles : unselectedButtonStyles}
              >
                Women's Sizes
              </button>
            </div>
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Select Size</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
              {getCurrentSizes().map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={selectedSize === size ? selectedButtonStyles : unselectedButtonStyles}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div style={{ marginBottom: '30px' }}>
            <h3>Select Color</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                   style={selectedColor === color ? selectedButtonStyles : unselectedButtonStyles}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button
               onClick={handleAddToCartClick} // === Add the click handler ===
              style={{
                padding: '12px 24px',
                background: '#28a745', // Green color for Add to Cart
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Add to Cart
            </button>
            <button
              // Add onClick handler later for adding to wishlist simulation
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#333',
                border: '1px solid #333',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;