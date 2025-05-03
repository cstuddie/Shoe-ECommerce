import React, { useState, useEffect } from 'react'; // Import useEffect
import { Link, useLocation } from 'react-router-dom'; // Import useLocation

// Remove the local placeholderProducts data - it will be passed as a prop
// import shoe1 from '../components/assets/runningshoes.jpg';
// import shoe2 from '../components/assets/classicrunning.jpg';
// import shoe3 from '../components/assets/urbanshoes.jpg';
// import shoe4 from '../components/assets/casual.webp';
// const placeholderProducts = [...] // Delete this block

// Receives simulatedAllProducts data as a prop from App.js
function InventoryPage({ productData }) { // Receive productData prop
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(200); // Max price filter
  const [categoryFilter, setCategoryFilter] = useState(''); // New state for category filter
  const [brandFilter, setBrandFilter] = useState(''); // New state for brand filter
  const location = useLocation(); // Hook to access URL query parameters


  // --- Filtered Products State ---
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
      // Convert the object of products into an array, filter for 'isListed',
      // and then apply search/filter criteria
      const allProductsArray = Object.values(productData);

      // --- Filter for Listed Products (Only show listed products on Inventory page) ---
      let currentFiltered = allProductsArray.filter(product => product.isListed);
      // --- End Filter for Listed Products ---


      // --- Apply Search Term Filter ---
      if (searchTerm) {
          currentFiltered = currentFiltered.filter(product =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.description.toLowerCase().includes(searchTerm.toLowerCase()) // Search name or description
          );
      }
      // --- End Search Term Filter ---

      // --- Apply Category Filter ---
      if (categoryFilter) {
           // Assuming you have category data on your products (we don't in current simulation)
           // For simulation, let's just filter by name containing category name (very basic)
           currentFiltered = currentFiltered.filter(product =>
                product.name.toLowerCase().includes(categoryFilter.toLowerCase())
           );
      }
      // --- End Category Filter ---

      // --- Apply Brand Filter ---
       if (brandFilter) {
           // Assuming you have brand data on your products (we don't in current simulation)
           // For simulation, let's just filter by name containing brand name (very basic)
           currentFiltered = currentFiltered.filter(product =>
                product.name.toLowerCase().includes(brandFilter.toLowerCase())
           );
       }
      // --- End Brand Filter ---


      // --- Apply Price Range Filter ---
       currentFiltered = currentFiltered.filter(product => parseFloat(product.price) <= priceRange);
      // --- End Price Range Filter ---


      setFilteredProducts(currentFiltered);

  }, [productData, searchTerm, priceRange, categoryFilter, brandFilter]); // Re-run effect when any filter dependency changes


    // --- Read search term from URL on load ---
     useEffect(() => {
         const params = new URLSearchParams(location.search);
         const search = params.get('search');
         if (search) {
             setSearchTerm(search); // Set the search term state from the URL
         }
         // Note: This only reads the initial search term. For dynamic updates as you type
         // directly into the input, the onChange handler is already doing that.
     }, [location.search]); // Re-run if the search part of the URL changes


  // Handle form submission (currently just prevents default)
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log('Filters applied:', { searchTerm, priceRange, categoryFilter, brandFilter });
     // The filtering logic is already happening in the useEffect above,
     // so this button just acts as a visual cue/way to trigger a filter run if needed.
  };

  const handleReset = () => {
    setSearchTerm('');
    setPriceRange(200); // Reset to max price
    setCategoryFilter('');
    setBrandFilter('');
     // The useEffect will run automatically when these states change
  };

  return (
    <div className="container" style={{ display: 'flex', padding: '20px 0' }}>
      {/* Search/Filter Panel */}
      <div style={{ width: '25%', padding: '0 15px', flexShrink: 0 }}> {/* Fixed width, prevent shrinking */}
        <h3>Search & Filter</h3>
        <form onSubmit={handleFilterSubmit}>
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
               value={categoryFilter} // Bind value to state
               onChange={(e) => setCategoryFilter(e.target.value)} // Update state on change
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">All Categories</option>
              <option value="runner">Running</option> {/* Assuming 'runner' in name */}
              <option value="casual">Casual</option> {/* Assuming 'casual' in name */}
              <option value="classic">Classic</option> {/* Assuming 'classic' in name */}
               <option value="urban">Urban</option> {/* Assuming 'urban' in name */}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="brand" style={{ display: 'block', marginBottom: '5px' }}>Brand:</label>
            <select
              id="brand"
               value={brandFilter} // Bind value to state
               onChange={(e) => setBrandFilter(e.target.value)} // Update state on change
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">All Brands</option>
              {/* Add more brands if you add them to your simulated data and filtering logic */}
              <option value="brandA">Brand A (Simulated)</option>
              <option value="brandB">Brand B (Simulated)</option>
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
              max="200" // Ensure max matches range of your simulated prices
              step="5"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
             {/* Apply button is less necessary now that useEffect filters live, but keep for form structure */}
            <button
              type="submit" // This will trigger the onSubmit, but useEffect does the heavy lifting
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
              Apply Filters
            </button>
            <button
              type="button" // Use type="button" to prevent form submission
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

      {/* Product Grid - 3/4 of screen width */}
      <div style={{ width: '75%', padding: '0 15px' }}> {/* Adjust width */}
        <h2>All Products ({filteredProducts.length})</h2>
        {filteredProducts.length === 0 ? (
            <p style={{textAlign: 'center', marginTop: '20px'}}>No products match your criteria.</p>
        ) : (
            <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}> {/* Use auto-fit for responsiveness */}
              {filteredProducts.map(product => (
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
                    <p style={{ fontWeight: 'bold', color: '#007bff' }}>${product.price}</p>
                    {/* You could add a quick "Add to Cart" button here too */}
                  </div>
                </Link>
              ))}
            </div>
        )}
      </div>
    </div>
  );
}

export default InventoryPage;