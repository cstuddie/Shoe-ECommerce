import React from 'react';

// Placeholder data - This will come from your backend API later
const placeholderProducts = [
  { id: 1, name: 'Stylish Runner', price: '$120', imageUrl: 'https://via.placeholder.com/250x180?text=Shoe+1' },
  { id: 2, name: 'Classic Comfort', price: '$90', imageUrl: 'https://via.placeholder.com/250x180?text=Shoe+2' },
  { id: 3, name: 'Urban Explorer', price: '$150', imageUrl: 'https://via.placeholder.com/250x180?text=Shoe+3' },
  { id: 4, name: 'Casual Walker', price: '$85', imageUrl: 'https://via.placeholder.com/250x180?text=Shoe+4' },
];

function FeaturedProducts() {
  return (
    <section className="featured-products">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="product-list">
          {placeholderProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              {/* Add to Cart button will be added later */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;