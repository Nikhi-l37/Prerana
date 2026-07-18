import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BranchPage from './pages/BranchPage';
import BranchesList from './pages/BranchesList';
import FamousFoodItems from './pages/FamousFoodItems';
import './styles/app.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/branches" element={<BranchesList />} />
          <Route path="/famous-items" element={<FamousFoodItems />} />
          <Route path="/branch/:branchId" element={<BranchPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;