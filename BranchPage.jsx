import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { menuData, branchData } from './MenuData';

const BranchPage = () => {
  const { branchId } = useParams();
  const branch = branchData[branchId];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!branch) {
    return (
      <div className="branch-not-found">
        <h2>Branch not found</h2>
        <Link to="/" className="map-link-btn">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="branch-page">
      <header className="branch-header">
        <h1>{branch.name}</h1>
        <p>{branch.address}</p>
        <a href={branch.mapLink} target="_blank" rel="noopener noreferrer" className="map-link-btn">Open in Google Maps</a>
      </header>

      <section className="branch-map-section">
        <iframe 
          title={`${branch.name} Map`}
          src={branch.mapEmbedUrl}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="branch-map-iframe">
        </iframe>
      </section>

      <section className="branch-menu-section">
        <h2 className="menu-title">Our Menu</h2>
        {Object.entries(menuData).map(([categoryName, items]) => (
          <div key={categoryName} className="menu-category">
            <h3 className="category-title">{categoryName}</h3>
            <div className="menu-items-grid">
              {items.map((item, idx) => (
                <div key={idx} className="menu-item-card">
                  <div className="menu-item-info">
                    <h4>{item.name} - ₹{item.price}</h4>
                    <ul className="menu-item-desc">
                      <li>Authentic preparation</li>
                      <li>Secret spice blend</li>
                      <li>Fresh ingredients</li>
                    </ul>
                  </div>
                  <div className="menu-item-image-placeholder">
                    {/* Placeholder for future images */}
                    <span>{item.name} Image Coming Soon</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BranchPage;
