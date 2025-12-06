import React from 'react';
import RecipeCard from './RecipeCard';
import EmptyState from './EmptyState';

function RecipeList({ results, loading, onViewRecipe }) {
  if (results.length === 0 && !loading) {
    return <EmptyState />;
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <>
      <div className="results-header">
        <h2 className="results-title">
          <span className="results-count">{results.length}</span>
          <span className="results-label">Recipe{results.length !== 1 ? 's' : ''} Found</span>
        </h2>
      </div>

      <div className="recipes-container">
        {results.map((recipe, index) => (
          <RecipeCard
            key={recipe.title}
            recipe={recipe}
            index={index}
            onViewRecipe={onViewRecipe}
          />
        ))}
      </div>
    </>
  );
}

export default RecipeList;

