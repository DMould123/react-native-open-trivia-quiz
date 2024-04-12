import React, { createContext, useContext, useState } from 'react'

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('')

  return (
    <QuizContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizContext)
