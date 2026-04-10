import React from 'react';
import './LoadingScreen.css';

function LoadingScreen({ learningGoal }) {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="brain-animation">
          <div className="brain-core"></div>
          <div className="brain-ring ring-1"></div>
          <div className="brain-ring ring-2"></div>
          <div className="brain-ring ring-3"></div>
        </div>

        <h2 className="loading-title">
          Architecting Your Learning Path...
        </h2>

        <p className="loading-subtitle">
          Analyzing: "{learningGoal}"
        </p>

        <div className="loading-steps">
          <div className="loading-step completed">
            <span className="step-icon">✓</span>
            <span>Understanding your goal</span>
          </div>
          <div className="loading-step active">
            <span className="step-icon animate">⟳</span>
            <span>Generating curriculum structure</span>
          </div>
          <div className="loading-step pending">
            <span className="step-icon">○</span>
            <span>Creating lesson content</span>
          </div>
          <div className="loading-step pending">
            <span className="step-icon">○</span>
            <span>Preparing quizzes & exercises</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
