import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Receives cart state and handlers from App.js
// === Receives wishlist state and handlers from App.js as well ===
function CartPage({ cart, updateQuantity, removeItem, wishlist, removeFromWishlist, moveItemToCart }) { // Receive wishlist props
  const navigate = useNavigate();

  // Calculate total price (only for cart items)
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(item.cartItemId, newQuantity);
    } else if (newQuantity === 0) {
       removeItem(item.cartItemId);
    }
  };

   const handleProceedToCheckout = () => {
       if (cart.length > 0) {
           navigate('/checkout');
       } else {
           alert("Your cart is empty!");
       }
   };

   // === Wishlist Handlers on Cart Page ===
    const handleMoveToCartClick = (item) => {
        moveItemToCart(item.wishlistItemId); // Call the handler from App.js
        // App.js will handle the state update (remove from wishlist, add to cart)
    };

    const handleRemoveFromWishlistClick = (item) => {
        removeFromWishlist(item.wishlistItemId); // Call the handler from App.js
        // App.js will handle the state update (remove from wishlist)
    };
   // === End Wishlist Handlers ===


  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <h2>Shopping Cart</h2>

      {/* === Cart Section === */}
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Your cart is empty. <Link to="/inventory">Continue Shopping</Link></p>
      ) : (
        <>
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
                    <p>Price: ${item.price.toFixed(2)}</p>
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
            </div>

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
        </>
      )}
      {/* === End Cart Section === */}

      <hr style={{ margin: '40px 0', borderColor: '#ccc' }}/> {/* Visual separator */}

      {/* === Wishlist Section (New) === */}
      <h2>My Wishlist</h2>
       {wishlist.length === 0 ? (
         <p style={{ textAlign: 'center', marginTop: '20px' }}>Your wishlist is empty.</p>
       ) : (
         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}> {/* Slightly smaller gap for wishlist items */}
            {wishlist.map(item => (
               <div key={item.wishlistItemId} style={{
                   border: '1px solid #e0e0e0', // Lighter border for distinction
                   borderRadius: '6px', // Slightly smaller border radius
                   padding: '10px', // Less padding
                   display: 'flex',
                   alignItems: 'center',
                   gap: '15px', // Less gap
                   backgroundColor: '#fefefe' // Slightly different background color
               }}>
                   {/* Item Image */}
                   <img
                       src={item.imageUrl}
                       alt={item.name}
                       style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} // Smaller image
                   />

                   {/* Item Details */}
                   <div style={{ flexGrow: 1 }}>
                       <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{item.name}</p>
                       <p style={{ fontSize: '0.9em', color: '#555' }}>Variations: {item.gender}, {item.size}, {item.color}</p>
                       <p style={{ fontSize: '1em', fontWeight: 'bold', color: '#007bff', marginTop: '5px' }}>${item.price.toFixed(2)}</p>
                   </div>

                   {/* Wishlist Actions */}
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'right' }}>
                       <button
                           onClick={() => handleMoveToCartClick(item)} // Call move to cart handler
                           style={{ padding: '5px 10px', cursor: 'pointer', background: '#ffc107', color: 'white', border: 'none', borderRadius: '4px' }} // Yellowish background
                       >
                           Move to Cart
                       </button>
                       <button
                           onClick={() => handleRemoveFromWishlistClick(item)} // Call remove handler
                           style={{ padding: '5px 10px', cursor: 'pointer', background: 'none', border: 'none', color: '#dc3545' }}
                       >
                           Remove
                       </button>
                   </div>
               </div>
           ))}
         </div>
       )}
      {/* === End Wishlist Section === */}


    </div>
  );
}

export default CartPage;