import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Receives cart state and handlers from App.js
function CartPage({ cart, updateQuantity, removeItem }) {
  const navigate = useNavigate();

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(item.cartItemId, newQuantity);
    } else if (newQuantity === 0) {
      // Optional: Ask before removing if quantity reaches 0
      // if (window.confirm(`Remove "${item.name}" from cart?`)) {
         removeItem(item.cartItemId);
      // }
    }
  };

   const handleProceedToCheckout = () => {
       // Only allow checkout if the cart is not empty
       if (cart.length > 0) {
           // Navigate to the checkout page
           navigate('/checkout');
       } else {
           alert("Your cart is empty!");
       }
   };

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Your cart is empty. <Link to="/inventory">Continue Shopping</Link></p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cart.map(item => (
            <div key={item.cartItemId} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              backgroundColor: 'white'
            }}>
              {/* Item Image */}
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
              />

              {/* Item Details */}
              <div style={{ flexGrow: 1 }}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p> {/* Ensure price is formatted */}
                <p>Variations: {item.gender}, {item.size}, {item.color}</p>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => handleQuantityChange(item, -1)}
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                >- </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item, 1)}
                   style={{ padding: '5px 10px', cursor: 'pointer' }}
                >+ </button>
              </div>

              {/* Subtotal and Remove */}
              <div style={{ textAlign: 'right' }}>
                 <p style={{ fontWeight: 'bold' }}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                 <button
                     onClick={() => removeItem(item.cartItemId)}
                     style={{ padding: '5px 10px', cursor: 'pointer', background: 'none', border: 'none', color: '#dc3545' }}
                 >
                     Remove
                 </button>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '1.2em' }}>
            <p><strong>Total: ${calculateTotal()}</strong></p>
            <button
                onClick={handleProceedToCheckout}
                style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
            >
                Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;