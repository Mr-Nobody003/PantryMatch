import React from 'react';
import { formatAdaptationText } from '../../utils/helpers';

function AdaptationSection({ 
  missing, 
  setMissing, 
  adaptedStep, 
  adaptLoading, 
  onGetAdaptation 
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !adaptLoading && missing.trim()) {
      onGetAdaptation();
    }
  };

  return (
    <section className="modal-section-block">
      <div className="section-header">
        <div className="section-icon-wrapper">
          <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4C9.243 4 7 6.243 7 9h2c0-1.654 1.346-3 3-3s3 1.346 3 3c0 1.069-.454 1.465-1.481 2.255-.382.294-.813.626-1.226 1.038C10.981 13.604 10.995 14.897 11 15v2h2v-2.009c0-.024.023-.601.707-1.284.32-.32.682-.598 1.031-.867C15.798 12.024 17 11.1 17 9c0-2.757-2.243-5-5-5zm-1 14h2v2h-2z"/>
          </svg>
        </div>
        <h3 className="section-heading">Missing Something?</h3>
      </div>
      <div className="adaptation-panel">
        <div className="adaptation-controls">
          <input
            type="text"
            className="adaptation-field"
            placeholder="What ingredient are you missing?"
            value={missing}
            onChange={(e) => setMissing(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={adaptLoading}
          />
          <button
            className="adaptation-submit"
            onClick={onGetAdaptation}
            disabled={!missing.trim() || adaptLoading}
          >
            {adaptLoading ? (
              <span className="btn-loader-small"></span>
            ) : (
              <>
                <span>Get Suggestion</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </>
            )}
          </button>
        </div>

        {adaptedStep && (
          <div className="adaptation-result">
            <div className="result-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>AI Suggestion</span>
            </div>
            <div className="result-text">
              {formatAdaptationText(adaptedStep).length > 0 ? (
                <ul className="adaptation-list">
                  {formatAdaptationText(adaptedStep).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{adaptedStep}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdaptationSection;

