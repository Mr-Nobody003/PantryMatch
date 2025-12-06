import React from 'react';
import Alert from './Alert';

function SearchBox({ 
  ingredients, 
  setIngredients, 
  onSearch, 
  loading, 
  error 
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && ingredients.trim()) {
      onSearch();
    }
  };

  return (
    <div className="search-area">
      <div className="search-box">
        <div className="search-icon-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        <input
          type="text"
          className="search-field"
          placeholder="What's in your pantry? (e.g., chicken, tomatoes, rice)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button
          className="search-btn"
          onClick={onSearch}
          disabled={loading || !ingredients.trim()}
        >
          {loading ? (
            <span className="btn-loader"></span>
          ) : (
            <span>Find Recipes</span>
          )}
        </button>
      </div>

      <Alert message={error} />
    </div>
  );
}

export default SearchBox;

