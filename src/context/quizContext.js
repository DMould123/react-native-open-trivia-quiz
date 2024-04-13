import React, { createContext, useContext, useState } from 'react'

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [error, setError] = useState(null)

  return (
    <QuizContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
        error,
        setError
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizContext)
