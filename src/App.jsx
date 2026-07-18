import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BranchPage from './pages/BranchPage';
import BranchesList from './pages/BranchesList';
import FamousFoodItems from './pages/FamousFoodItems';
import './styles/app.css';

function App() {
  const { pathname } = useLocation();

  // Scroll to top instantly on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

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