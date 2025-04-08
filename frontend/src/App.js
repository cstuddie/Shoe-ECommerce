import React, { useState } from 'react'; // Import useState
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';
import InventoryPage from './pages/InventoryPage';
// Import placeholder Admin/Seller pages later if needed for testing Nav links
// import AdminDashboardPage from './pages/AdminDashboardPage';
// import SellerDashboardPage from './pages/SellerDashboardPage';
import ProtectedRoute from './components/Auth/ProtectedRoute'; // We will create this

import './App.css';

function App() {
  // --- Simulation State ---
  // This state will mimic if the user is logged in and their role
  // We pass the 'setter' functions down so components can simulate login/logout
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // null, 'user', 'seller', 'admin'
  const [userName, setUserName] = useState(''); // Simulate user's name for display
  // --- End Simulation State ---

  // Function to simulate login
  const handleLogin = (role, name) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
  };

  // Function to simulate logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName('');
  };

  // Function to simulate profile update (only name for now)
  const handleProfileUpdate = (newName) => {
    setUserName(newName);
    alert("Simulated profile update! Name changed to: " + newName);
  }

  // Function to simulate account deletion
  const handleDeleteAccount = () => {
     if(window.confirm("Are you sure you want to delete your account? This is a simulation.")) {
        alert("Simulating account deletion...");
        handleLogout(); // Log out after deleting
        // Navigate away (usually handled within the component triggering delete)
     }
  }


  return (
    <Router>
      <div className="App">
        {/* Pass simulation state and handlers to Navbar */}
        <Navbar
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          userName={userName}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

            {/* Product/Inventory Routes */}
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/inventory" element={<InventoryPage />} />

            {/* Redirect logged-in users away from login/signup */}
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/profile" /> : <LoginPage onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/profile" /> : <SignupPage />}
            />

            {/* Protected Routes (Using simulation state) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  {/* Pass necessary state/handlers to ProfilePage */}
                  <ProfilePage
                      userName={userName}
                      userRole={userRole}
                      onProfileUpdate={handleProfileUpdate}
                      onDeleteAccount={handleDeleteAccount}
                   />
                </ProtectedRoute>
              }
            />

            {/* Example Protected Admin Route (add later if needed) */}
            {/* <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin']}>
                   <div>Admin Dashboard Placeholder</div>
                   <AdminDashboardPage />
                </ProtectedRoute>
              }
            /> */}

             {/* Example Protected Seller Route (add later if needed) */}
            {/* <Route
              path="/seller"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['seller', 'admin']}>
                   <div>Seller Dashboard Placeholder</div>
                   <SellerDashboardPage />
                </ProtectedRoute>
              }
            /> */}

            {/* Add other routes (Products, Cart, etc.) */}

             {/* Fallback for unknown routes */}
             <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;