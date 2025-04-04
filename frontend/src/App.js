import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import './App.css'; // Import main CSS

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Routes will go here later to switch between pages */}
      <main className="main-content">
        <Hero />
        <FeaturedProducts />
        {/* Other page components will be rendered here based on routing */}
      </main>
      <Footer />
    </div>
  );
}

export default App;