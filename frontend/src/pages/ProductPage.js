import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


// will eventually come from DB, but mock data for now
// will be seperate function for calling inventory/product
const productData = {
  1: {
    id: 1,
    name: 'Stylish Runner',
    price: '120',
    description: 'Premium running shoes with exceptional comfort and support. Perfect for daily runs and training sessions.',
    imageUrl: require('../components/assets/runningshoes.jpg'),
    menSizes: ['7', '8', '9', '10', '11', '12', '13'],
    womenSizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: ['Black/White', 'Blue/Gray', 'Red/White']
  },
  2: {
    id: 2,
    name: 'Classic Comfort',
    price: '90',
    description: 'Timeless design meets everyday comfort. These shoes are perfect for casual wear and light activities.',
    imageUrl: require('../components/assets/classicrunning.jpg'),
    menSizes: ['7', '8', '9', '10', '11', '12'],
    womenSizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['White/Gray', 'Black/Black', 'Navy/White']
  },
  3: {
    id: 3,
    name: 'Urban Explorer',
    price: '150',
    description: 'Versatile shoes designed for the city explorer. Stylish enough for work, comfortable enough for play.',
    imageUrl: require('../components/assets/urbanshoes.jpg'),
    menSizes: ['7', '8', '9', '10', '11', '12'],
    womenSizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['Black/Black', 'Brown/Tan', 'Gray/White']
  },
  4: {
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

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedGender, setSelectedGender] = useState('men');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    const fetchedProduct = productData[productId];
    
    // Simulate network delay
    setTimeout(() => {
      setProduct(fetchedProduct || null);
      if (fetchedProduct) {
        setSelectedColor(fetchedProduct.colors[0]);
        setSelectedSize(fetchedProduct.menSizes[0]);
      }
      setLoading(false);
    }, 300);
  }, [productId]);


  const getCurrentSizes = () => {
    if (!product) return [];
    return selectedGender === 'men' ? product.menSizes : product.womenSizes;
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    // Reset size selection to first available in the new gender category
    const newSizes = gender === 'men' ? product.menSizes : product.womenSizes;
    setSelectedSize(newSizes[0]);
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginTop: '20px' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2>{product.name}</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>${product.price}</p>
          
          <div style={{ margin: '20px 0' }}>
            <p>{product.description}</p>
          </div>
          
          {/* Gender Selection */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Select Size Type</h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                onClick={() => handleGenderChange('men')}
                style={{ 
                  padding: '8px 16px', 
                  border: selectedGender === 'men' ? '2px solid #007bff' : '1px solid #ddd',
                  background: selectedGender === 'men' ? '#f0f8ff' : 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: selectedGender === 'men' ? 'bold' : 'normal'
                }}
              >
                Men's Sizes
              </button>
              <button 
                onClick={() => handleGenderChange('women')}
                style={{ 
                  padding: '8px 16px', 
                  border: selectedGender === 'women' ? '2px solid #007bff' : '1px solid #ddd',
                  background: selectedGender === 'women' ? '#f0f8ff' : 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: selectedGender === 'women' ? 'bold' : 'normal'
                }}
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
                  style={{ 
                    padding: '8px 16px', 
                    border: selectedSize === size ? '2px solid #007bff' : '1px solid #ddd',
                    background: selectedSize === size ? '#f0f8ff' : 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
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
                  style={{ 
                    padding: '8px 16px', 
                    border: selectedColor === color ? '2px solid #007bff' : '1px solid #ddd',
                    background: selectedColor === color ? '#f0f8ff' : 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              style={{ 
                padding: '12px 24px', 
                background: '#007bff', 
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