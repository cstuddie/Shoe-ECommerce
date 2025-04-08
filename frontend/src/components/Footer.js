import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>© {currentYear} ShoeStore. All Rights Reserved.</p>
        {/* Add other footer links or info here later */}
      </div>
    </footer>
  );
}

export default Footer;