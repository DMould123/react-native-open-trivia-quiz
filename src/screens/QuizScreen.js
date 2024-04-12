import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { fetchQuestions } from '../utils/apiUtils'
import { useNavigation, useRoute } from '@react-navigation/native'

const QuizScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const { selectedCategory, selectedDifficulty } = route.params

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      console.log('Selected Category:', selectedCategory)
      console.log('Selected Difficulty:', selectedDifficulty)
      try {
        const fetchedQuestions = await fetchQuestions(
          selectedCategory,
          selectedDifficulty
        )
        console.log('Fetched Questions:', fetchedQuestions)
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
    setCurrentQuestionIndex(0)
    setScore(0)
    navigation.navigate('Home')
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
