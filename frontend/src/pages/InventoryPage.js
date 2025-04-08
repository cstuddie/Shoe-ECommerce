import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shoe1 from '../components/assets/runningshoes.jpg';
import shoe2 from '../components/assets/classicrunning.jpg';
import shoe3 from '../components/assets/urbanshoes.jpg';
import shoe4 from '../components/assets/casual.webp';

// same product data that's in FeaturedProducts.js but duplicated to show more items
const placeholderProducts = [
  { id: 1, name: 'Stylish Runner', price: '$120', imageUrl: shoe1 },
  { id: 2, name: 'Classic Comfort', price: '$90', imageUrl: shoe2 },
  { id: 3, name: 'Urban Explorer', price: '$150', imageUrl: shoe3 },
  { id: 4, name: 'Casual Walker', price: '$85', imageUrl: shoe4 },
  // Duplicated products
  { id: 5, name: 'Stylish Runner', price: '$120', imageUrl: shoe1 },
  { id: 6, name: 'Classic Comfort', price: '$90', imageUrl: shoe2 },
  { id: 7, name: 'Urban Explorer', price: '$150', imageUrl: shoe3 },
  { id: 8, name: 'Casual Walker', price: '$85', imageUrl: shoe4 },
  { id: 9, name: 'Stylish Runner', price: '$120', imageUrl: shoe1 },
  { id: 10, name: 'Classic Comfort', price: '$90', imageUrl: shoe2 },
  { id: 11, name: 'Urban Explorer', price: '$150', imageUrl: shoe3 },
  { id: 12, name: 'Casual Walker', price: '$85', imageUrl: shoe4 }
];

function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(200); // Max price filter

  // not connected to anything yet
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search submitted - this will be connected to backend later');
  };

  const handleReset = () => {
    setSearchTerm('');
    setPriceRange(200);
  };

  return (
    <div style={{ display: 'flex', padding: '20px 0' }}>
      {/* Search/Filter Panel */}
      <div style={{ width: '20%', padding: '0 15px' }}>
        <h3>Search & Filter</h3>
        <form onSubmit={handleSearch}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="search" style={{ display: 'block', marginBottom: '5px' }}>Search:</label>
            <input 
              type="text" 
              id="search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search shoes..."
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
            <select 
              id="category"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">All Categories</option>
              <option value="running">Running</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="athletic">Athletic</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="brand" style={{ display: 'block', marginBottom: '5px' }}>Brand:</label>
            <select 
              id="brand"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">All Brands</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
              <option value="newbalance">New Balance</option>
              <option value="reebok">Reebok</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="price" style={{ display: 'block', marginBottom: '5px' }}>
              Max Price: ${priceRange}
            </label>
            <input 
              type="range" 
              id="price" 
              min="0" 
              max="200" 
              step="5"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit"
              style={{ 
                flex: '1',
                padding: '10px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Apply
            </button>
            <button 
              type="button"
              onClick={handleReset}
              style={{ 
                flex: '1',
                padding: '10px', 
                backgroundColor: '#f8f9fa', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      
      {/* Product Grid - 4/5 of screen width */}
      <div style={{ width: '80%', padding: '0 15px' }}>
        <h2>All Products</h2>
        <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {placeholderProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '15px', 
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                backgroundColor: 'white'
              }} className="hover-effect">
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
                <h3 style={{ margin: '10px 0 5px' }}>{product.name}</h3>
                <p style={{ fontWeight: 'bold', color: '#007bff' }}>{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;