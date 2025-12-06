import React from 'react';

function IngredientsSection({ ingredients }) {
  return (
    <section className="modal-section-block">
      <div className="section-header">
        <div className="section-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
        </div>
        <h3 className="section-heading">Ingredients</h3>
      </div>
      <div className="ingredients-grid">
        {ingredients.split(',').map((ing, i) => (
          <div key={i} className="ingredient-chip">
            {ing.trim()}
          </div>
        ))}
      </div>
    </section>
  );
}

export default IngredientsSection;

