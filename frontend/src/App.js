// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage'; // Your existing ProductPage
import InventoryPage from './pages/InventoryPage';
import ProtectedRoute from './components/Auth/ProtectedRoute'; // Your existing ProtectedRoute

import CartPage from './pages/CartPage'; // Your existing CartPage
import CheckoutPage from './pages/CheckoutPage'; // Your existing CheckoutPage

// === Import the new Seller Dashboard Page ===
import SellerDashboardPage from './pages/SellerDashboardPage';

import './App.css';

// --- Local Storage Keys for Persistence Simulation ---
// Note: In a real app, auth tokens are more common than persisting user state like this
const USER_STATE_STORAGE_KEY = 'userState'; // { isAuthenticated, userRole, userName }
const CART_STORAGE_KEY = 'cart';
const WISHLIST_STORAGE_KEY = 'wishlist';
const PRODUCT_DATA_STORAGE_KEY = 'simulatedProductData'; // Key for product data persistence
// --- End Storage Keys ---

// === Import the base productData ===
// This is imported once to provide the initial state structure
// Make sure productData is exported from ProductPage.js using `export { productData };`
import { productData as baseProductData } from './pages/ProductPage';
// === End Import ===


// Load initial product data from localStorage or use the base data if not found
// We need to track 'isListed' changes and other potential modifications across refreshes
const initialProductData = JSON.parse(localStorage.getItem(PRODUCT_DATA_STORAGE_KEY));

// If no data in localStorage, use a deep copy of the base data as initial state
const defaultInitialProductData = initialProductData || JSON.parse(JSON.stringify(baseProductData));


function App() {
  // === State for All Simulated Product Data (Includes seller modifications) ===
  const [simulatedAllProducts, setSimulatedAllProducts] = useState(defaultInitialProductData);
  // === End State for All Simulated Product Data ===


  // --- Simulation State (Existing, uses localStorage) ---
  const storedUserState = JSON.parse(localStorage.getItem(USER_STATE_STORAGE_KEY)) || {
      isAuthenticated: false,
      userRole: null,
      userName: ''
  };
  const [isAuthenticated, setIsAuthenticated] = useState(storedUserState.isAuthenticated);
  const [userRole, setUserRole] = useState(storedUserState.userRole);
  const [userName, setUserName] = useState(storedUserState.userName);
  // --- End Simulation State ---

  // === Cart State (Existing, uses localStorage) ===
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || []);
  // === End Cart State ===

  // === Wishlist State (Existing, uses localStorage) ===
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || []);
  // === End Wishlist State ===


   // --- Local Storage Persistence Effects ---
   // Save user state whenever it changes
   useEffect(() => {
       localStorage.setItem(USER_STATE_STORAGE_KEY, JSON.stringify({ isAuthenticated, userRole, userName }));
   }, [isAuthenticated, userRole, userName]);

    // Save cart state whenever it changes
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

     // Save wishlist state whenever it changes
     useEffect(() => {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }, [wishlist]);

    // === Effect to persist simulated product data state ===
     useEffect(() => {
         localStorage.setItem(PRODUCT_DATA_STORAGE_KEY, JSON.stringify(simulatedAllProducts));
         // Note: This will stringify the image requires, which works with require()
         // in other components upon load.
     }, [simulatedAllProducts]);
   // --- End Persistence Effects ---


  // --- Simulation Handlers (Existing) ---
  const handleLogin = (role, name) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
     // In a real app, you'd fetch the user's data, cart, and wishlist here
     // and update the state based on backend response.
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName('');
    setCart([]); // Clear cart on logout
    setWishlist([]); // Clear wishlist on logout
    // Note: simulatedAllProducts (product listing status) is NOT cleared on logout,
    // as seller actions should persist for all users.
  };

  const handleProfileUpdate = (newName) => {
    setUserName(newName);
    alert("Simulated profile update! Name changed to: " + newName);
  }

  const handleDeleteAccount = () => {
     if(window.confirm("Are you sure you want to delete your account? This is a simulation.")) {
        alert("Simulating account deletion...");
        handleLogout(); // Log out after simulated deletion
     }
  }
  // --- End Simulation Handlers ---


  // === Cart Handlers (Existing) ===
  const addToCart = (product, selectedSize, selectedColor, selectedGender, quantity = 1) => {
    const cartItemId = `${product.id}-${selectedGender}-${selectedSize}-${selectedColor}`;

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        alert(`${quantity} more "${product.name}" added to cart.`);
        return newCart;
      } else {
        // Include necessary details to display in cart/checkout
        const newItem = {
          cartItemId,
          productId: product.id,
          name: product.name,
          price: parseFloat(product.price),
          imageUrl: product.imageUrl, // Pass image URL
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
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
       // Optional: filter out items with quantity 0 if you allow setting to 0
       // return newCart.filter(item => item.quantity > 0);
       return newCart; // Keep item in list even if quantity is 0, quantity input should prevent 0
    });
  };

   const removeFromCart = (cartItemId) => {
      setCart(prevCart => {
          const newCart = prevCart.filter(item => item.cartItemId !== cartItemId);
           alert("Item removed from cart.");
           return newCart;
      });
   };
   // === End Cart Handlers ===


   // === Wishlist Handlers (Existing) ===
   const addToWishlist = (product, selectedSize, selectedColor, selectedGender) => {
       const wishlistItemId = `${product.id}-${selectedGender}-${selectedSize}-${selectedColor}`;

       setWishlist(prevWishlist => {
           const existingItemIndex = prevWishlist.findIndex(item => item.wishlistItemId === wishlistItemId);

           if (existingItemIndex > -1) {
               alert(`"${product.name}" is already in your wishlist.`);
               return prevWishlist; // Item already exists, do nothing
           } else {
               // Include necessary details to display in wishlist
               const newItem = {
                   wishlistItemId,
                   productId: product.id,
                   name: product.name,
                   price: parseFloat(product.price),
                   imageUrl: product.imageUrl, // Pass image URL
                   size: selectedSize,
                   color: selectedColor,
                   gender: selectedGender,
               };
                alert(`"${product.name}" added to wishlist.`);
               return [...prevWishlist, newItem];
           }
       });
   };

    const removeFromWishlist = (wishlistItemId) => {
       setWishlist(prevWishlist => {
           const newWishlist = prevWishlist.filter(item => item.wishlistItemId !== wishlistItemId);
            alert("Item removed from wishlist.");
           return newWishlist;
       });
    };

    const moveItemToCart = (wishlistItemId) => {
        setWishlist(prevWishlist => {
            const itemToMove = prevWishlist.find(item => item.wishlistItemId === wishlistItemId);

            if (itemToMove) {
                 // Use the item details to add to cart
                 // Need to reconstruct a "product-like" object for addToCart
                const productDetailsForCart = {
                    id: itemToMove.productId, // Use productId from stored item
                    name: itemToMove.name,
                    price: itemToMove.price,
                     imageUrl: itemToMove.imageUrl, // Pass image URL
                };
                 // Pass the required arguments to addToCart
                addToCart(productDetailsForCart, itemToMove.size, itemToMove.color, itemToMove.gender, 1);

                // Remove the item from the wishlist
                const newWishlist = prevWishlist.filter(item => item.wishlistItemId !== wishlistItemId);
                alert(`"${itemToMove.name}" moved to cart.`);
                return newWishlist;
            }
             alert("Error moving item to cart.");
            return prevWishlist; // Item not found, return original wishlist
        });
    };
   // === End Wishlist Handlers ===


   // === Seller Product Management Handler (New) ===
    // This handler updates the global simulatedAllProducts state
    const toggleProductListedStatus = (productId) => {
        setSimulatedAllProducts(prevProducts => {
            const newProducts = { ...prevProducts }; // Create a shallow copy of the object
            const productToUpdate = newProducts[productId]; // Get the product by ID

            if (productToUpdate) {
                 // Create a deep copy of the specific product object to avoid mutation issues
                 newProducts[productId] = { ...productToUpdate, isListed: !productToUpdate.isListed };
                 console.log(`Product ${productId} list status toggled.`);
                  // SellerDashboardPage and InventoryPage will re-filter/re-calculate based on this state change
            } else {
                 console.warn(`Product ${productId} not found in simulated data.`);
            }
            return newProducts; // Return the new state object
        });
    };

    // === Handler to add a new product (Simulated) ===
    const addSimulatedProduct = (newProductData) => {
         setSimulatedAllProducts(prevProducts => {
             // Find the next available ID (simple simulation)
             const existingIds = Object.keys(prevProducts).map(Number); // Convert keys to numbers
             const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

             const fullNewProduct = {
                 id: nextId,
                 ...newProductData, // Includes name, price, imageUrl, sizes, colors, sellerId, etc.
                 isListed: newProductData.isListed !== undefined ? newProductData.isListed : true, // Default to listed if not specified
                 // Add default empty arrays if sizes/colors are missing to prevent errors
                  menSizes: newProductData.menSizes || [],
                  womenSizes: newProductData.womenSizes || [],
                  colors: newProductData.colors || [],

             };

             const newProducts = {
                 ...prevProducts,
                 [nextId]: fullNewProduct
             };

             alert(`Simulated product "${fullNewProduct.name}" added with ID ${nextId}.`);
             return newProducts;
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
  // === End Checkout Handler ===


  return (
    <Router>
      <div className="App">
        {/* Pass simulation state, handlers, and counts to Navbar */}
        <Navbar
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          userName={userName}
          onLogout={handleLogout}
          cartItemCount={cart.reduce((count, item) => count + item.quantity, 0)}
          wishlistItemCount={wishlist.length}
        />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

             {/* Product/Inventory Routes */}
            {/* Pass addToCart and addToWishlist handlers to ProductPage */}
            {/* Pass simulatedAllProducts state down to components that need to read product data */}
            <Route
                path="/product/:productId"
                element={<ProductPage
                            onAddToCart={addToCart}
                            onAddToWishlist={addToWishlist}
                            productData={simulatedAllProducts} // Pass the global product state
                         />}
            />
            <Route
                path="/inventory"
                element={<InventoryPage productData={simulatedAllProducts} />} // Pass the global product state
            />


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
            <Route
                path="/cart"
                element={
                  <CartPage
                    cart={cart}
                    updateQuantity={updateCartItemQuantity}
                    removeItem={removeFromCart}
                    wishlist={wishlist}
                    removeFromWishlist={removeFromWishlist}
                    moveItemToCart={moveItemToCart}
                   />
                }
            />

             {/* === Checkout Route (Protected - only for logged-in 'user' role) === */}
             <Route
                path="/checkout"
                element={
                    <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['user']}>
                         <CheckoutPage cart={cart} placeOrder={placeOrder} />
                    </ProtectedRoute>
                }
             />

             {/* === Seller Dashboard Route (Protected - only for 'seller' and 'admin' roles) === */}
             <Route
                path="/seller"
                element={
                    <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['seller', 'admin']}>
                         {/* Pass product data, user role, and the toggle/add handlers */}
                         <SellerDashboardPage
                            simulatedAllProducts={simulatedAllProducts} // Pass the global product state
                            userRole={userRole} // Pass user role to determine sellerId
                            toggleProductListedStatus={toggleProductListedStatus} // Pass the handler
                            addSimulatedProduct={addSimulatedProduct} // Pass add product handler
                         />
                    </ProtectedRoute>
                }
             />

            {/* Admin Protected Routes (add later if needed) */}
            {/* <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin']}><AdminDashboardPage simulatedAllProducts={simulatedAllProducts} /></ProtectedRoute>} /> */}


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