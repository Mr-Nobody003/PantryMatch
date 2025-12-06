import React from 'react';

function ModalHeader({ recipe }) {
  return (
    <div className="modal-header-section">
      <h2 className="modal-recipe-title">{recipe.title}</h2>
      {recipe.time && (
        <div className="modal-time-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {recipe.time} minutes
        </div>
      )}
    </div>
  );
}

export default ModalHeader;

