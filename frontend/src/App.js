import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage'; // Your existing ProductPage
import InventoryPage from './pages/InventoryPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// === Import new pages ===
import CartPage from './pages/CartPage'; // We will create this
import CheckoutPage from './pages/CheckoutPage'; // We will create this
// import OrderConfirmationPage from './pages/OrderConfirmationPage'; // Optional: create this

import './App.css';

function App() {
  // --- Simulation State (Existing) ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // null, 'user', 'seller', 'admin'
  const [userName, setUserName] = useState('');
  // --- End Simulation State ---

  // === Cart State ===
  // Cart is an array of items. Each item needs product details + selected variations + quantity.
  // Add a unique ID for each specific cart item (product ID + variations) to easily update/remove.
  const [cart, setCart] = useState([]);
  // === End Cart State ===


  // --- Simulation Handlers (Existing) ---
  const handleLogin = (role, name) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName('');
     setCart([]); // Clear cart on logout (optional behavior, depends on requirements)
  };

  const handleProfileUpdate = (newName) => {
    setUserName(newName);
    alert("Simulated profile update! Name changed to: " + newName);
  }

  const handleDeleteAccount = () => {
     if(window.confirm("Are you sure you want to delete your account? This is a simulation.")) {
        alert("Simulating account deletion...");
        handleLogout(); // Log out after deleting
     }
  }
  // --- End Simulation Handlers ---


  // === Cart Handlers ===
  const addToCart = (product, selectedSize, selectedColor, selectedGender, quantity = 1) => {
    // Create a unique ID for this specific cart item based on product ID and variations
    const cartItemId = `${product.id}-${selectedGender}-${selectedSize}-${selectedColor}`;

    // Check if the exact item is already in the cart
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        alert(`${quantity} more "${product.name}" added to cart.`);
        return newCart;
      } else {
        // Item does not exist, add as a new item
        const newItem = {
          cartItemId, // Unique ID for this cart item instance
          productId: product.id, // Original product ID
          name: product.name,
          price: parseFloat(product.price), // Convert price to number for calculations
          imageUrl: product.imageUrl,
          size: selectedSize,
          color: selectedColor,
          gender: selectedGender,
          quantity: quantity,
        };
        alert(`"${product.name}" added to cart.`);
        return [...prevCart, newItem];
      }
    });
  };

  const updateCartItemQuantity = (cartItemId, newQuantity) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item => {
        if (item.cartItemId === cartItemId) {
          // Ensure quantity is not less than 1
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
       // Optional: filter out items with quantity 0 if you allow setting to 0
       // return newCart.filter(item => item.quantity > 0);
       return newCart;
    });
  };

   const removeFromCart = (cartItemId) => {
      setCart(prevCart => {
          const newCart = prevCart.filter(item => item.cartItemId !== cartItemId);
           alert("Item removed from cart.");
           return newCart;
      });
   };

   // === Checkout Handler (Simulation) ===
   const placeOrder = (orderDetails) => {
       console.log("Simulating order placement:", orderDetails);
       // --- Backend API Call would go here ---
       // Instead, simulate success:
       alert("Simulated Order Placed Successfully!");
       setCart([]); // Clear cart after placing order
       // --- End Simulation ---
       // Navigate to a confirmation page or home
       // navigate('/order-confirmation'); // If you create a page
   };
  // === End Cart Handlers ===


  return (
    <Router>
      <div className="App">
        {/* Pass simulation state and handlers to Navbar */}
        <Navbar
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          userName={userName}
          onLogout={handleLogout}
          cartItemCount={cart.reduce((count, item) => count + item.quantity, 0)} // Pass total item count
        />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

             {/* Product/Inventory Routes */}
            {/* Pass addToCart handler to ProductPage */}
            <Route path="/product/:productId" element={<ProductPage onAddToCart={addToCart} />} />
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
                  <ProfilePage
                      userName={userName}
                      userRole={userRole}
                      onProfileUpdate={handleProfileUpdate}
                      onDeleteAccount={handleDeleteAccount}
                   />
                </ProtectedRoute>
              }
            />

            {/* === Cart Route === */}
             {/* Pass cart state and handlers to CartPage */}
            <Route
                path="/cart"
                element={<CartPage cart={cart} updateQuantity={updateCartItemQuantity} removeItem={removeFromCart} />}
            />

             {/* === Checkout Route (Protected - only for logged-in 'user' role) === */}
             {/* Pass cart state and placeOrder handler to CheckoutPage */}
             <Route
                path="/checkout"
                element={
                    <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['user']}>
                         <CheckoutPage cart={cart} placeOrder={placeOrder} />
                    </ProtectedRoute>
                }
             />


            {/* Admin/Seller Protected Routes (optional for now) */}
            {/* <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin']}><AdminDashboardPage /></ProtectedRoute>} /> */}
            {/* <Route path="/seller" element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['seller', 'admin']}><SellerDashboardPage /></ProtectedRoute>} /> */}


             {/* Fallback for unknown routes */}
             <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;