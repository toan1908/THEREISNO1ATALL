import React, { useState } from 'react';
import './Quiz.css';

function Quiz({ questions, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === questions[currentQuestion].correct;

      if (isCorrect) {
        setScore(score + 1);
      }

      setAnswers([...answers, {
        question: currentQuestion,
        selected: selectedAnswer,
        correct: isCorrect
      }]);

      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete
      onComplete(score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0), questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (!questions || questions.length === 0) return null;

  const question = questions[currentQuestion];
  const percentage = Math.round(((score + (showResult && selectedAnswer === question.correct ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3 className="quiz-title">📝 Quick Quiz</h3>
        <div className="quiz-progress">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {!showResult ? (
        <div className="quiz-content">
          <p className="question-text">{question.question}</p>

          <div className="answers-list">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`answer-option ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>

          <button
            className="submit-answer-btn"
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <div className="quiz-result">
          <div className={`result-icon ${selectedAnswer === question.correct ? 'correct' : 'incorrect'}`}>
            {selectedAnswer === question.correct ? '✓' : '✗'}
          </div>

          <p className="result-text">
            {selectedAnswer === question.correct ? (
              <span className="correct-text">🎉 Correct!</span>
            ) : (
              <span className="incorrect-text">
                Not quite. The correct answer was: <strong>{question.options[question.correct]}</strong>
              </span>
            )}
          </p>

          {currentQuestion < questions.length - 1 ? (
            <button className="next-question-btn" onClick={handleNextQuestion}>
              Next Question →
            </button>
          ) : (
            <div className="final-score">
              <h4>Quiz Complete! 🎉</h4>
              <p className="score-display">
                You scored {score + (selectedAnswer === question.correct ? 1 : 0)} out of {questions.length}
              </p>
              <div className="score-stars">
                {percentage >= 80 && <span className="star">⭐</span>}
                {percentage >= 80 && <span className="star">⭐</span>}
                {percentage >= 80 && <span className="star">⭐</span>}
                {percentage >= 50 && percentage < 80 && <span className="star">⭐</span>}
                {percentage >= 50 && percentage < 80 && <span className="star">⭐</span>}
                {percentage < 50 && <span className="star">⭐</span>}
              </div>
              <button className="restart-quiz-btn" onClick={handleRestart}>
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
