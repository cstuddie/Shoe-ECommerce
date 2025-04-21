import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Receives cart state and placeOrder handler from App.js
// This page is protected by ProtectedRoute to ensure the user is logged in as 'user'
function CheckoutPage({ cart, placeOrder }) {
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });
   const [paymentMethod, setPaymentMethod] = useState(''); // Simulate payment method selection
   const [error, setError] = useState('');


  // If cart is empty, redirect the user back to the cart page or home
  if (cart.length === 0) {
      alert("Your cart is empty! Redirecting to cart page."); // Or navigate directly
      // Use Navigate component for declarative redirect or navigate hook
      // return <Navigate to="/cart" replace />;
      navigate('/cart', { replace: true });
      return null; // Don't render anything while redirecting
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setError('');

    // === Basic Frontend Validation ===
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.phone) {
        setError("Please fill in all shipping details.");
        return;
    }
     if (!paymentMethod) {
         setError("Please select a payment method.");
         return;
     }
    // === End Validation ===


    // --- Simulation: Prepare order details ---
    const orderDetails = {
      shipping: shippingDetails,
      paymentMethod: paymentMethod,
      items: cart, // Include all cart items
      total: calculateTotal(),
      // Add user ID from simulated state if available in App.js (more complex with current state structure)
      // userId: // get user ID from App.js simulation state if possible
      timestamp: new Date().toISOString(),
    };
    // --- End Simulation ---

    // Call the placeOrder handler from App.js
    placeOrder(orderDetails);

    // Redirect to home or a thank you page after simulated order placement
    navigate('/'); // Or navigate to '/order-confirmation' if you create that page
  };

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px', maxWidth: '700px', margin: 'auto' }}>
      <h2>Checkout</h2>

       {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      {/* Order Summary (Read-only) */}
      <div style={{ marginBottom: '30px', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
        <h3>Order Summary</h3>
        {cart.map(item => (
          <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px dotted #eee' }}>
            <span>{item.name} ({item.gender}, {item.size}, {item.color}) x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
         <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '15px' }}>
             <span>Total:</span>
             <span>${calculateTotal()}</span>
         </div>
      </div>


      <form onSubmit={handleSubmitOrder}>
        {/* Shipping Details Section */}
        <div style={{ marginBottom: '30px', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: '#fff' }}>
          <h3>Shipping Information</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingDetails.name}
              onChange={handleInputChange}
              required
              style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="address" style={{ display: 'block', marginBottom: '5px' }}>Shipping Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingDetails.address}
              onChange={handleInputChange}
              required
               style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
           <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone Number:</label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="phone"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleInputChange}
              required
               style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
        </div>

        {/* Payment Section (Simulation) */}
         <div style={{ marginBottom: '30px', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: '#fff' }}>
           <h3>Payment Information (Simulation)</h3>
           <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="paymentMethod" style={{ display: 'block', marginBottom: '5px' }}>Select Method:</label>
                <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                    style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                    <option value="">-- Select Payment Method --</option>
                    <option value="credit_card">Credit Card (Simulated)</option>
                    <option value="paypal">PayPal (Simulated)</option>
                </select>
           </div>
            {/* Placeholder for actual payment inputs */}
            {paymentMethod === 'credit_card' && (
                <div style={{ border: '1px dashed #ccc', padding: '10px', marginTop: '15px', backgroundColor: '#f8f8f8' }}>
                     <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#555' }}>
                         Credit Card Input Fields Go Here (e.g., Card Number, Expiry, CVV)
                     </p>
                </div>
            )}
              {paymentMethod === 'paypal' && (
                <div style={{ border: '1px dashed #ccc', padding: '10px', marginTop: '15px', backgroundColor: '#f8f8f8' }}>
                     <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#555' }}>
                         PayPal Checkout Button/Flow Integration Goes Here
                     </p>
                </div>
            )}
         </div>


        {/* Place Order Button */}
        <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{ padding: '15px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.2em', fontWeight: 'bold' }}
            >
              Simulate Place Order
            </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;