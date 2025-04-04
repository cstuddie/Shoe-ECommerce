import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure you kept/replaced this file
import App from './App'; // Make sure App.js is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// reportWebVitals related lines are now removed.