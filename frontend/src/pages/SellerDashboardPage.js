import React, { useState, useEffect } from 'react';
// We can import the productData directly since we exported it from ProductPage.js
import { productData } from './ProductPage';
// Import useAuth if you move authentication to Context later, otherwise use props
// import { useAuth } from '../context/AuthContext';

// Receives simulated user details from App.js via ProtectedRoute
function SellerDashboardPage({ userName, userRole }) { // Receive user details as props

   // === Simulation: Assign a sellerId based on the logged-in user's role ===
   // In a real app, the sellerId would come from the user object returned by the backend after login.
   // For this simulation, we'll hardcode sellerId 101 for the 'seller' role.
   // If you log in as 'admin', they can also view this page, but won't manage seller 101's products
   // unless you add more logic. Let's make it manage seller 101 products if role is 'seller'.
   const simulatedSellerId = (userRole === 'seller') ? 101 : null;
   // === End Simulation ===


  const [sellerProducts, setSellerProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0); // Simulated sales number


  useEffect(() => {
    // --- Simulate fetching products for this specific seller ---
    if (simulatedSellerId !== null) {
      const productsForSeller = Object.values(productData).filter(
        product => product.sellerId === simulatedSellerId
      );
      setSellerProducts(productsForSeller);

      // --- Simulate calculating total sales ---
      // This is a very basic simulation (e.g., sum of listed product prices * a random quantity)
      const simulatedSalesAmount = productsForSeller.reduce((sum, product) => {
          // Simulate some sales value, e.g., price * (a small random number if listed)
          return sum + (product.isListed ? (parseFloat(product.price) * Math.random() * 5) : 0); // Random sales if listed
      }, 0);
       // Display it nicely
       setTotalSales(simulatedSalesAmount.toFixed(2));

    } else {
        // Handle case where no sellerId is determined (e.g., logged in as admin or user)
         setSellerProducts([]);
         setTotalSales(0);
    }
     // The dependency array should ideally include simulatedSellerId or userRole
  }, [userRole, simulatedSellerId]); // Recalculate if user/role changes


  // --- Handler to toggle product listed status (Simulation) ---
  const handleListToggle = (productId) => {
    setSellerProducts(prevProducts => {
      const updatedProducts = prevProducts.map(product => {
        if (product.id === productId) {
           console.log(`Simulating toggling list status for product ${productId}`);
          // Toggle the isListed status
          return { ...product, isListed: !product.isListed };
        }
        return product;
      });
       alert(`Product status toggled for ID ${productId}.`); // User feedback
      return updatedProducts;
    });

    // Note: In a real app, this would send a PUT/PATCH API request to the backend
    // to update the product status in the database.
  };
  // --- End Handler ---


  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <h2>Seller Dashboard</h2>

      {/* --- Simulated Sales Info --- */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#e9f7ef' }}> {/* Light green background */}
          <h3>Total Simulated Sales:</h3>
          <p style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#28a745' }}>${totalSales}</p> {/* Green text */}
           {/* Add more sales metrics if needed */}
      </div>
       {/* --- End Simulated Sales Info --- */}


      <h3>Your Listings</h3>

      {sellerProducts.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
            {simulatedSellerId !== null ? "You have no products listed." : "Not logged in as a seller."}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {sellerProducts.map(product => (
            <div key={product.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              backgroundColor: 'white'
            }}>
              {/* Product Image */}
              <img
                src={product.imageUrl} // Using the image URL from productData
                alt={product.name}
                style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px' }}
              />

              {/* Product Details */}
              <div style={{ flexGrow: 1 }}>
                <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{product.name}</p>
                 <p style={{ fontSize: '0.9em', color: '#555' }}>Price: ${product.price}</p>
                 {/* You could add more details like stock count here if you add it to the simulation */}
              </div>

              {/* Status */}
              <div style={{ textAlign: 'center', minWidth: '100px' }}>
                  <p style={{ fontWeight: 'bold', color: product.isListed ? '#28a745' : '#dc3545' }}>
                     {product.isListed ? 'Listed' : 'Unlisted'}
                  </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '120px' }}>
                  <button
                     onClick={() => handleListToggle(product.id)}
                     style={{
                         padding: '8px 12px',
                         cursor: 'pointer',
                         background: product.isListed ? '#ffc107' : '#28a745', // Yellow for Unlist, Green for List
                         color: 'white',
                         border: 'none',
                         borderRadius: '4px'
                     }}
                  >
                     {product.isListed ? 'Unlist' : 'List'}
                  </button>
                  {/* Optional: Add an "Edit" button here */}
                  {/* <button style={{ padding: '8px 12px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Edit</button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerDashboardPage;