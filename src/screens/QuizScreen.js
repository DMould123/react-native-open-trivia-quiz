import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
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
  const [timerSeconds, setTimerSeconds] = useState(15)
  const [timerActive, setTimerActive] = useState(true)
  const { selectedCategory, selectedDifficulty } = route.params

  // Timer countdown effect
  useEffect(() => {
    let timer
    if (timerActive && timerSeconds > 0) {
      timer = setTimeout(() => setTimerSeconds(timerSeconds - 1), 1000)
    } else if (timerSeconds === 0) {
      handleAnswer(false)
    }
    return () => clearTimeout(timer)
  }, [timerActive, timerSeconds])

  // Fetch quiz questions on component mount
  useEffect(() => {
    const fetchQuizQuestions = async () => {
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

  // Function to handle user's answer selection
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowCorrectAnswer(true)
    setTimerActive(false)
    setTimeout(() => {
      setShowCorrectAnswer(false)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimerSeconds(15)
      setTimerActive(true)
    }, 1000)
  }

  // Function to restart the quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    navigation.navigate('Home')
  }

  // Render quiz question and options
  const renderQuestion = () => {
    const question = questions[currentQuestionIndex]
    if (!question) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Quiz completed!</Text>
          <Text style={styles.text}>Final Score: {score}</Text>
          <Button title="Restart Quiz" onPress={restartQuiz} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{question.question}</Text>
        {question.incorrect_answers.map((answer, index) => (
          <View style={styles.buttonContainer} key={index}>
            <Button
              title={answer}
              onPress={() => {
                handleAnswer(false)
                setSelectedAnswer(answer)
              }}
            />
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <Button
            title={question.correct_answer}
            onPress={() => {
              handleAnswer(true)
              setSelectedAnswer(question.correct_answer)
            }}
          />
        </View>
        {showCorrectAnswer && (
          <Text
            style={[
              styles.text,
              selectedAnswer === question.correct_answer
                ? styles.correct
                : styles.incorrect
            ]}
          >
            {selectedAnswer === question.correct_answer
              ? 'Correct!'
              : 'Incorrect!'}
          </Text>
        )}
        <Text style={styles.timer}>Time Remaining: {timerSeconds} sec</Text>
      </View>
    )
  }

  return <View style={styles.container}>{renderQuestion()}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginVertical: 5,
    width: '80%'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10
  },
  correct: {
    color: 'green'
  },
  incorrect: {
    color: 'red'
  },
  timer: {
    marginTop: 10,
    fontSize: 16
  }
})

export default QuizScreen
