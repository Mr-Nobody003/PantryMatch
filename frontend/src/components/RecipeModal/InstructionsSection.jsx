import React from 'react';

function InstructionsSection({ instructions }) {
  const steps = instructions.split('\n').filter(step => step.trim());

  return (
    <section className="modal-section-block">
      <div className="section-header">
        <div className="section-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <h3 className="section-heading">Instructions</h3>
      </div>
      <div className="instructions-container">
        {steps.map((step, i) => (
          <div key={i} className="instruction-item">
            <div className="instruction-number">{i + 1}</div>
            <div className="instruction-content">{step.trim()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InstructionsSection;

