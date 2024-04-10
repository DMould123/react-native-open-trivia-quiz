import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { fetchQuestions } from '../utils/apiUtils'

const QuizScreen = ({ navigation, route }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      const { category, difficulty } = route.params
      try {
        const fetchedQuestions = await fetchQuestions(category, difficulty)
        setQuestions(fetchedQuestions)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }
    fetchQuizQuestions()
  }, [route.params])

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex]
    if (!question) {
      return (
        <View>
          <Text>Quiz completed!</Text>
          <Text>Final Score: {score}</Text>
          <Button title="Restart Quiz" onPress={() => navigation.popToTop()} />
        </View>
      )
    }
    return (
      <View>
        <Text>{question.question}</Text>
        {question.incorrect_answers.map((answer, index) => (
          <Button
            key={index}
            title={answer}
            onPress={() => handleAnswer(false)}
          />
        ))}
        <Button
          title={question.correct_answer}
          onPress={() => handleAnswer(true)}
        />
      </View>
    )
  }

  return <View>{renderQuestion()}</View>
}

export default QuizScreen
