import React, { useState } from 'react';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';

function App() {
  const [appState, setAppState] = useState('hero'); // hero, loading, dashboard
  const [learningGoal, setLearningGoal] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleGenerate = (goal, file) => {
    setLearningGoal(goal);
    setUploadedFile(file);
    setAppState('loading');

    // Simulate AI generation time
    setTimeout(() => {
      setAppState('dashboard');
    }, 3000);
  };

  const handleBack = () => {
    setAppState('hero');
    setLearningGoal('');
    setUploadedFile(null);
  };

  return (
    <div className="app">
      {appState === 'hero' && (
        <Hero onGenerate={handleGenerate} />
      )}

      {appState === 'loading' && (
        <LoadingScreen learningGoal={learningGoal} />
      )}

      {appState === 'dashboard' && (
        <Dashboard
          learningGoal={learningGoal}
          file={uploadedFile}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
