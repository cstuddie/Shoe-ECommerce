import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Receives simulated state, logout handler, and cartItemCount from App.js props
function Navbar({ isAuthenticated, userRole, userName, onLogout, cartItemCount }) { // Receive cartItemCount
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogoutClick = () => {
    onLogout(); // Call the logout handler from App.js
    navigate('/'); // Redirect to home page after logout
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the Inventory page with the search term as a query parameter
      navigate(`/inventory?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(''); // Clear the search input after submitting
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" className="navbar-brand">Stepup</Link>
          {/* Removed the duplicate empty link here */}
          {/* Add a link to the Inventory/Products page */}
          <Link to="/inventory" style={{ color: 'white', marginLeft: '20px', textDecoration: 'none' }}>Inventory</Link>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '400px',
          margin: '0 20px'
        }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '4px 0 0 4px',
              border: 'none',
              fontSize: '14px'
            }}
          />
          <button
            type="submit"
            style={{
              background: '#007bff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '0 4px 4px 0',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </form>

        <div className="navbar-links">
           {/* === Add Cart Link === */}
           <Link to="/cart">Cart ({cartItemCount || 0})</Link> {/* Display item count */}

          {isAuthenticated ? (
            <>
              {/* === Role Specific Links (Simulation) === */}
              {userRole === 'admin' && <Link to="/admin">Admin Panel</Link>}
              {userRole === 'seller' && <Link to="/seller">Seller Dashboard</Link>}
              {/* === End Role Specific Links === */}

              <Link to="/profile">Profile ({userName})</Link> {/* Show simulated name */}

              <button onClick={handleLogoutClick} className="logout-button" style={{ marginLeft:'10px', cursor:'pointer', background:'transparent', border:'none', color:'white', padding:'5px 10px' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;