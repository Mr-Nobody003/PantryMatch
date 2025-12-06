import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-section">
          <div className="logo-circle">
            <span className="logo-text">PM</span>
          </div>
          <div className="logo-content">
            <h1 className="logo-title">PANTRY MATCH</h1>
            <p className="logo-subtitle">Recipe Retrieval Using Image of Ingredients</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

