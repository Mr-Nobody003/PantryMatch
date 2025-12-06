import React from 'react';

function RecipeCard({ recipe, index, onViewRecipe }) {
  return (
    <article
      className="recipe-tile"
      style={{ '--delay': `${index * 50}ms` }}
    >
      <div className="tile-header">
        <h3 className="tile-title">{recipe.title}</h3>
        {recipe.time && (
          <div className="tile-badge">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {recipe.time}m
          </div>
        )}
      </div>
      
      <div className="tile-body">
        <div className="tile-section">
          <span className="section-label">Ingredients</span>
          <p className="section-text">{recipe.ingredients}</p>
        </div>
        
        <div className="tile-section">
          <span className="section-label">Instructions</span>
          <p className="section-text">
            {recipe.instructions.slice(0, 120)}
            {recipe.instructions.length > 120 ? '...' : ''}
          </p>
        </div>
      </div>

      <div className="tile-footer">
        {recipe.score && (
          <div className="match-indicator">
            <div className="match-bar">
              <div 
                className="match-fill" 
                style={{ width: `${recipe.score * 100}%` }}
              ></div>
            </div>
            <span className="match-text">{Math.round(recipe.score * 100)}% match</span>
          </div>
        )}
        <button
          className="tile-action"
          onClick={() => onViewRecipe(recipe)}
        >
          View Recipe
          <svg className="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;

