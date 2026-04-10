import React, { useState } from 'react';
import './Hero.css';
import { Paperclip, Sparkles } from 'lucide-react';

function Hero({ onGenerate }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onGenerate(inputValue.trim(), selectedFile);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          There's no one at all
        </h1>
        <p className="hero-subtitle">
          The Ultimate AI Learning Architect
        </p>

        <div className="omni-input-wrapper">
          <div
            className={`omni-input-container ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <textarea
              className="omni-input"
              placeholder="What do you want to master today?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={3}
            />

            <div className="input-actions">
              <label className={`file-upload-btn ${selectedFile ? 'has-file' : ''}`}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  hidden
                />
                <Paperclip size={20} />
                <span className="file-label">
                  {selectedFile ? selectedFile.name : 'Attach a file (optional)'}
                </span>
              </label>

              {selectedFile && (
                <button className="clear-file-btn" onClick={clearFile}>
                  ×
                </button>
              )}

              <button
                className="generate-btn"
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
              >
                <Sparkles size={18} />
                Generate Syllabus
              </button>
            </div>
          </div>
        </div>

        <div className="hero-examples">
          <p className="examples-label">Try these examples:</p>
          <div className="example-chips">
            <button onClick={() => setInputValue('Learn Spanish Basics')}>
              🇪🇸 Learn Spanish Basics
            </button>
            <button onClick={() => setInputValue('Master Python in 30 days')}>
              🐍 Master Python in 30 days
            </button>
            <button onClick={() => setInputValue('How to bake sourdough bread')}>
              🍞 How to bake sourdough bread
            </button>
            <button onClick={() => setInputValue('Learn Astrophysics')}>
              🌌 Learn Astrophysics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
