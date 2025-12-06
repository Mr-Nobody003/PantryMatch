import React from 'react';

function VideosSection({ videos, videosLoading }) {
  return (
    <section className="modal-section-block">
      <div className="section-header">
        <div className="section-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
        </div>
        <h3 className="section-heading">Video Tutorials</h3>
      </div>
      {videosLoading ? (
        <div className="videos-loading-state">
          <span className="btn-loader-small"></span>
          <span>Loading videos...</span>
        </div>
      ) : videos.length > 0 ? (
        <div className="videos-grid">
          {videos.map((v, i) => (
            <a
              key={i}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="video-card"
            >
              <div className="video-thumbnail">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <div className="video-info">
                <span className="video-name">{v.title}</span>
                <span className="video-link-text">Watch on YouTube</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="no-videos-message">No video tutorials available</p>
      )}
    </section>
  );
}

export default VideosSection;

