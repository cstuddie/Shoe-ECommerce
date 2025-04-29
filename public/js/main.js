// Client-side JavaScript for interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Add any global event listeners or UI enhancements here
    
    // Example: Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
      });
    });
  
    // Example: Add to cart button effect
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Visual feedback
        this.textContent = 'Adding...';
        
        // Reset after a delay (if not using form submission)
        setTimeout(() => {
          this.textContent = 'Add to Cart';
        }, 2000);
      });
    });
  });