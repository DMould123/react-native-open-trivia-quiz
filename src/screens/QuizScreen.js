import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { fetchQuestions } from '../utils/apiUtils'

const QuizScreen = ({ navigation, route }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      const { selectedCategory, selectedDifficulty } = route.params
      try {
        const fetchedQuestions = await fetchQuestions(
          selectedCategory,
          selectedDifficulty
        )
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
    setShowCorrectAnswer(true)
    setTimeout(() => {
      setShowCorrectAnswer(false)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }, 1000)
  }

  const restartQuiz = () => {
    setQuestions([])
    setCurrentQuestionIndex(0)
    setScore(0)
    navigation.navigate('Name')
  }

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex]
    if (!question) {
      return (
        <View>
          <Text>Quiz completed!</Text>
          <Text>Final Score: {score}</Text>
          <Button title="Restart Quiz" onPress={restartQuiz} />
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
            onPress={() => {
              handleAnswer(false)
              setSelectedAnswer(answer)
            }}
          />
        ))}
        <Button
          title={question.correct_answer}
          onPress={() => {
            handleAnswer(true)
            setSelectedAnswer(question.correct_answer)
          }}
        />
        {showCorrectAnswer && (
          <Text>
            {selectedAnswer === question.correct_answer
              ? 'Correct!'
              : 'Incorrect!'}
          </Text>
        )}
      </View>
    )
  }

  return <View>{renderQuestion()}</View>
}

export default QuizScreen
