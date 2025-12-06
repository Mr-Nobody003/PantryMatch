import React from 'react';
import ModalHeader from './ModalHeader';
import IngredientsSection from './IngredientsSection';
import InstructionsSection from './InstructionsSection';
import AdaptationSection from './AdaptationSection';
import VideosSection from './VideosSection';

function RecipeModal({ 
  recipe, 
  onClose, 
  missing, 
  setMissing, 
  adaptedStep, 
  adaptLoading, 
  onGetAdaptation,
  videos,
  videosLoading
}) {
  if (!recipe) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="recipe-modal">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="recipe-modal-content">
          <ModalHeader recipe={recipe} />

          <div className="modal-body">
            <IngredientsSection ingredients={recipe.ingredients} />
            <InstructionsSection instructions={recipe.instructions} />
            <AdaptationSection
              missing={missing}
              setMissing={setMissing}
              adaptedStep={adaptedStep}
              adaptLoading={adaptLoading}
              onGetAdaptation={onGetAdaptation}
            />
            <VideosSection videos={videos} videosLoading={videosLoading} />
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeModal;

