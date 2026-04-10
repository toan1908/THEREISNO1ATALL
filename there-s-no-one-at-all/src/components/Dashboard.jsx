import React, { useState } from 'react';
import './Dashboard.css';
import { CheckCircle, Lock, PlayCircle, MessageSquare, Send, Trophy, BookOpen } from 'lucide-react';
import Quiz from './Quiz';
import { marked } from 'marked';

function Dashboard({ learningGoal, file, onBack }) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);
  const [xp, setXp] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: `Hi! I'm your AI learning companion. I'm here to help you master **${learningGoal}**. Ask me anything about your current lesson! 🚀` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Generate curriculum based on learning goal
  const curriculum = generateCurriculum(learningGoal);

  const currentModule = curriculum.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[0]; // Simplified: first lesson of module

  function generateCurriculum(goal) {
    // This is a mock generator - in production this would call an AI API
    const templates = {
      default: {
        title: goal,
        modules: [
          {
            id: 1,
            title: `Introduction to ${goal}`,
            description: 'Foundational concepts and overview',
            status: 'in-progress',
            lessons: [
              {
                id: 1,
                title: 'Getting Started',
                content: `# 🎯 Getting Started with ${goal}\n\nWelcome to your learning journey! In this lesson, we'll cover the fundamentals.\n\n## What You'll Learn\n\n- Core concepts and terminology\n- Why this matters\n- How to apply this knowledge\n\n## Key Concepts\n\n### 1. Foundation Basics\nEvery great skill starts with understanding the basics. Think of this as building the foundation of a house – without it, everything else crumbles.\n\n### 2. Practical Applications\nTheory is important, but application is where real learning happens. We'll focus on hands-on examples throughout this course.\n\n### 3. Common Pitfalls\nKnowing what *not* to do is just as important as knowing what to do. We'll highlight common mistakes so you can avoid them.\n\n## 💡 Pro Tips\n\n> "The expert in anything was once a beginner." – Take your time, practice consistently, and don't be afraid to make mistakes!\n\n## Next Steps\n\nOnce you've reviewed this content, take the quiz below to test your understanding. Then mark this lesson as complete to earn XP and unlock the next module!`,
                quiz: [
                  {
                    question: 'What is the most important aspect of learning something new?',
                    options: ['Memorizing everything', 'Understanding fundamentals', 'Skipping ahead', 'Watching videos only'],
                    correct: 1
                  },
                  {
                    question: 'Why should you learn about common pitfalls?',
                    options: ['To feel scared', 'To avoid making the same mistakes', 'It\'s not important', 'To impress others'],
                    correct: 1
                  },
                  {
                    question: 'What does the quote suggest about expertise?',
                    options: ['Experts are born talented', 'Everyone starts as a beginner', 'You can\'t become an expert', 'Only some people can learn'],
                    correct: 1
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            title: `Building Core Skills`,
            description: 'Deep dive into essential techniques',
            status: 'locked',
            lessons: [
              {
                id: 2,
                title: 'Essential Techniques',
                content: `# 🔧 Essential Techniques\n\nNow that you understand the basics, let's dive deeper into the core skills.\n\n## Mastering the Fundamentals\n\nPractice makes perfect! Here are the key techniques you need to master:\n\n### Technique 1: The Basics\nStart simple and build up complexity gradually.\n\n### Technique 2: Advanced Applications\nOnce comfortable, explore more complex scenarios.\n\n### Technique 3: Real-World Projects\nApply your skills to actual projects for maximum retention.\n\n## Practice Exercises\n\n1. Try the basic exercise for 15 minutes\n2. Review your work and identify areas for improvement\n3. Attempt a slightly more challenging variation\n\nRemember: Consistency beats intensity. Practice a little every day!`,
                quiz: [
                  {
                    question: 'What beats intensity when learning?',
                    options: ['Skipping practice', 'Consistency', 'Cramming', 'Watching tutorials'],
                    correct: 1
                  },
                  {
                    question: 'How long should you practice the basic exercise?',
                    options: ['1 hour', '5 minutes', '15 minutes', 'All day'],
                    correct: 2
                  },
                  {
                    question: 'What should you do after practicing?',
                    options: ['Forget about it', 'Review and improve', 'Move on immediately', 'Give up'],
                    correct: 1
                  }
                ]
              }
            ]
          },
          {
            id: 3,
            title: `Advanced Applications`,
            description: 'Put your skills to the test',
            status: 'locked',
            lessons: [
              {
                id: 3,
                title: 'Real-World Projects',
                content: `# 🚀 Real-World Projects\n\nCongratulations on making it this far! Now it's time to apply everything you've learned.\n\n## Project Ideas\n\nHere are some project ideas to solidify your knowledge:\n\n### Beginner Project\nCreate a simple implementation of the core concepts.\n\n### Intermediate Project\nCombine multiple concepts into one cohesive project.\n\n### Advanced Project\nBuild something that solves a real problem you care about.\n\n## Sharing Your Work\n\nDon't forget to share your projects with the community! Feedback is invaluable for growth.\n\n## 🎉 You're Almost There!\n\nComplete this final lesson and quiz to earn your mastery badge!`,
                quiz: [
                  {
                    question: 'What type of project should you start with?',
                    options: ['The hardest one', 'A beginner project', 'Nothing', 'Copy someone else\'s'],
                    correct: 1
                  },
                  {
                    question: 'Why should you share your work?',
                    options: ['To show off', 'To get feedback', 'It\'s not important', 'To get likes'],
                    correct: 1
                  },
                  {
                    question: 'What\'s the best advanced project?',
                    options: ['Something random', 'One that solves a real problem', 'The easiest one', 'None'],
                    correct: 1
                  }
                ]
              }
            ]
          },
          {
            id: 4,
            title: `Mastery & Beyond`,
            description: 'Continue your journey to expertise',
            status: 'locked',
            lessons: [
              {
                id: 4,
                title: 'Continuous Learning',
                content: `# 🌟 Continuous Learning\n\nLearning never stops! Here's how to continue growing:\n\n## Next Steps\n\n1. **Join Communities**: Connect with other learners\n2. **Teach Others**: The best way to solidify knowledge\n3. **Stay Updated**: Fields evolve, and so should you\n4. **Build a Portfolio**: Showcase your best work\n\n## Resources\n\n- Books and articles\n- Online courses\n- Practice platforms\n- Mentorship opportunities\n\n## 🏆 Congratulations!\n\nYou've completed this learning path! But remember, this is just the beginning of your journey. Keep learning, keep growing!`,
                quiz: [
                  {
                    question: 'What\'s one of the best ways to solidify knowledge?',
                    options: ['Forget it', 'Teach others', 'Ignore it', 'Hide it'],
                    correct: 1
                  },
                  {
                    question: 'Should you stay updated in your field?',
                    options: ['No', 'Yes', 'Maybe', 'Only sometimes'],
                    correct: 1
                  },
                  {
                    question: 'Is learning ever truly complete?',
                    options: ['Yes', 'No', 'Sometimes', 'Rarely'],
                    correct: 1
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    return templates.default;
  }

  const handleCompleteLesson = () => {
    if (!completedModules.includes(currentModule.id)) {
      setCompletedModules([...completedModules, currentModule.id]);
      setXp(xp + 100);

      // Unlock next module
      if (currentModuleIndex < curriculum.modules.length - 1) {
        const nextModule = curriculum.modules[currentModuleIndex + 1];
        // In a real app, we'd update the module status
      }
    }
  };

  const handleQuizComplete = (score, total) => {
    setQuizCompleted(true);
    const xpEarned = score * 20; // 20 XP per correct answer
    setXp(xp + xpEarned);
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const userMessage = { role: 'user', content: chatInput };
      setChatMessages([...chatMessages, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          role: 'assistant',
          content: generateAIResponse(chatInput, currentLesson)
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 500);

      setChatInput('');
    }
  };

  function generateAIResponse(input, lesson) {
    // Mock AI responses based on context
    const responses = [
      `Great question about "${lesson.title}"! Based on the lesson content, here's what I can tell you...`,
      `I'm glad you're diving deeper! This relates to the key concepts we covered.`,
      `Excellent curiosity! Let me explain this in the context of ${learningGoal}.`,
      `That's a thoughtful question! Here's how this connects to what you're learning.`
    ];
    return responses[Math.floor(Math.random() * responses.length)] +
           `\n\n**Key Point**: Remember to review the lesson material above for more details. Practice is essential for mastery! 💪`;
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <h1 className="dashboard-title">{curriculum.title}</h1>
        </div>
        <div className="header-right">
          <div className="xp-display">
            <Trophy size={20} />
            <span>{xp} XP</span>
          </div>
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <div className="dashboard-grid">
        {/* Left Sidebar - Module Map */}
        <aside className="sidebar-left">
          <div className="sidebar-header">
            <BookOpen size={20} />
            <h2>Learning Path</h2>
          </div>

          <div className="modules-timeline">
            {curriculum.modules.map((module, index) => (
              <div
                key={module.id}
                className={`module-item ${index === currentModuleIndex ? 'active' : ''} ${completedModules.includes(module.id) ? 'completed' : ''}`}
                onClick={() => index <= currentModuleIndex && setCurrentModuleIndex(index)}
              >
                <div className="module-status">
                  {completedModules.includes(module.id) ? (
                    <CheckCircle size={20} className="status-icon completed" />
                  ) : index === currentModuleIndex ? (
                    <PlayCircle size={20} className="status-icon active" />
                  ) : (
                    <Lock size={20} className="status-icon locked" />
                  )}
                </div>
                <div className="module-info">
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center - Content Area */}
        <main className="content-area">
          <div className="lesson-content">
            {currentLesson && (
              <>
                <h2 className="lesson-title">{currentLesson.title}</h2>
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{ __html: marked.parse(currentLesson.content) }}
                />

                {!showQuiz ? (
                  <div className="lesson-actions">
                    <button
                      className="start-quiz-btn"
                      onClick={() => setShowQuiz(true)}
                    >
                      📝 Take Quiz
                    </button>
                    <button
                      className={`complete-btn ${completedModules.includes(currentModule.id) ? 'completed' : ''}`}
                      onClick={handleCompleteLesson}
                      disabled={completedModules.includes(currentModule.id)}
                    >
                      {completedModules.includes(currentModule.id) ? (
                        <>✓ Completed (+100 XP)</>
                      ) : (
                        <>Complete Lesson (+100 XP)</>
                      )}
                    </button>
                  </div>
                ) : (
                  <Quiz
                    questions={currentLesson.quiz}
                    onComplete={handleQuizComplete}
                  />
                )}
              </>
            )}
          </div>
        </main>

        {/* Right Sidebar - AI Companion */}
        <aside className="sidebar-right">
          <div className="sidebar-header">
            <MessageSquare size={20} />
            <h2>AI Companion</h2>
          </div>

          <div className="chat-container">
            <div className="chat-messages">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${message.role}`}
                >
                  <div className="message-avatar">
                    {message.role === 'assistant' ? '🤖' : '👤'}
                  </div>
                  <div className="message-content">
                    <div
                      className="message-text"
                      dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-area">
              <textarea
                className="chat-input"
                placeholder="Ask about this lesson..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={3}
              />
              <button
                className="send-message-btn"
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;
