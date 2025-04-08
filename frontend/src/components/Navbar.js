import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Receives simulated state and logout handler from App.js props
function Navbar({ isAuthenticated, userRole, userName, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); // Call the logout handler from App.js
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">ShoeStore</Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {/* Add link to Products page later */}
          {/* <Link to="/products">Products</Link> */}

          {isAuthenticated ? (
            <>
              {/* === Role Specific Links (Simulation) === */}
              {userRole === 'admin' && <Link to="/admin">Admin Panel</Link>}
              {userRole === 'seller' && <Link to="/seller">Seller Dashboard</Link>}
              {/* === End Role Specific Links === */}

              <Link to="/profile">Profile ({userName})</Link> {/* Show simulated name */}
              {/* Add link to Cart page later */}
              {/* <Link to="/cart">Cart</Link> */}
              <button onClick={handleLogoutClick} className="logout-button" style={{ marginLeft:'10px', cursor:'pointer', background:'transparent', border:'none', color:'white', padding:'5px 10px' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* <Link to="/cart">Cart</Link> */}
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