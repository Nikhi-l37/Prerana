import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import BranchPage from './BranchPage';
import './app.css';

function App() {
  return (
    <div className="app-container">
      
      {/* GLOBAL NAVBAR */}
      <nav className="product-navbar">
        <div className="product-nav-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Prerana Firewood Biryani
          </Link>
        </div>
        <ul className="product-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="/#locations">Our Branches</a></li>
          <li><a href="/#reviews">Reviews</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </nav>

      {/* PAGE CONTENT */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/branch/:branchId" element={<BranchPage />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;