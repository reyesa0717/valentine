import { useState } from 'react'
import './Questionnaire.css'

const questions = [
  {
    id: 1,
    question: "What is our anniversary date? 💕",
    options: ["Feburary 14th", "May 2nd", "Septemeber 24th", "Decemeber 8th"],
    correct: 1
  },
  {
    id: 2,
    question: "What do I love most about you?",
    options: ["Everything!", "Your Butt", "Your Opera", "Nothing special"],
    correct: 0
  },
  {
    id: 3,
    question: "Where was our first kiss?",
    options: ["Whataburger Line", "Burlington Parking Lot", "Dog Park?", "Not sure"],
    correct: 1
  },
  {
    id: 4,
    question: "Where haven't we gone for our anniversary?",
    options: ["Disney World", "Cozumel", "San Antonio", "Galveston"],
    correct: 0
  },
  {
    id: 5,
    question: "Why do I call you Peep?",
    options: ["I am trying to Bop you with name calling", "Just because i thought it was cute", "You peed my bed", "Just cause"],
    correct: 2
  }
]

function Questionnaire({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleOptionClick = (optionIndex) => {
    if (showFeedback) return

    setSelectedOption(optionIndex)
    const correct = optionIndex === questions[currentQuestion].correct
    setIsCorrect(correct)
    setShowFeedback(true)

    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, correct }]
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOption(null)
        setShowFeedback(false)
      } else {
        // Quiz complete - check if all correct
        const allCorrect = newAnswers.every(a => a.correct)
        onComplete(allCorrect)
      }
    }, 1200)
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="quiz-container glass-card">
      <div className="quiz-header">
        <span className="quiz-badge">Question {currentQuestion + 1}/{questions.length}</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h2 className="quiz-question">{question.question}</h2>

      <div className="options-grid">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${
              selectedOption === index
                ? (index === question.correct ? 'correct' : 'incorrect')
                : ''
            } ${showFeedback && index === question.correct ? 'reveal-correct' : ''}`}
            onClick={() => handleOptionClick(index)}
            disabled={showFeedback}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <span>Perfect! You now get to have a date with me. 💕</span>
          ) : (
            <span>Hmm... I thought I meant something to you 🤔</span>
          )}
        </div>
      )}

      <div className="quiz-footer">
        <span className="hearts-display">
          {answers.map((a, i) => (
            <span key={i} className={a.correct ? 'heart-correct' : 'heart-wrong'}>
              {a.correct ? '💖' : '💔'}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

export default Questionnaire
