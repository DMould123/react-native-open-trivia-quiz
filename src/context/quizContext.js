import React, { createContext, useContext, useState } from 'react'

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')

  return (
    <QuizContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizContext)
