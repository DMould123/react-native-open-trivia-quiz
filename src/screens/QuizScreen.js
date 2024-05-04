import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import { fetchQuestions } from '../utils/apiUtils'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

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
  const [loading, setLoading] = useState(true)
  const { selectedCategory, selectedDifficulty } = route.params

  useEffect(() => {
    let timer
    if (timerActive && timerSeconds > 0) {
      timer = setTimeout(() => setTimerSeconds(timerSeconds - 1), 1000)
    } else if (timerSeconds === 0) {
      handleAnswer(false)
    }
    return () => clearTimeout(timer)
  }, [timerActive, timerSeconds])

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestions(
          selectedCategory,
          selectedDifficulty
        )
        // Shuffle the answers for each question
        const shuffledQuestions = fetchedQuestions.map((question) => {
          const answers = [
            ...question.incorrect_answers,
            question.correct_answer
          ]
          answers.sort(() => Math.random() - 0.5)
          return { ...question, answers }
        })
        setQuestions(shuffledQuestions)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching questions:', error)
        setLoading(false)
      }
    }
    fetchQuizQuestions()
  }, [route.params])

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

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    navigation.navigate('Home')
  }

  const renderQuestion = () => {
    if (loading) {
      // If loading, show loading indicator
      return <ActivityIndicator size="large" color="#0000ff" />
    }

    const question = questions[currentQuestionIndex]
    const questionsLeft = questions.length - currentQuestionIndex
    if (!question) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Quiz Completed!</Text>
          <Text style={styles.result}>Final Score: {score}</Text>
          <Button title="Restart Quiz" onPress={restartQuiz} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{question.question}</Text>
        {question.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedAnswer === answer && showCorrectAnswer
                ? answer === question.correct_answer
                  ? styles.correctButton
                  : styles.incorrectButton
                : null
            ]}
            onPress={() => {
              handleAnswer(answer === question.correct_answer)
              setSelectedAnswer(answer)
            }}
            disabled={showCorrectAnswer}
          >
            <Text style={styles.buttonText}>{answer}</Text>
          </TouchableOpacity>
        ))}
        {showCorrectAnswer && (
          <Icon
            name={
              selectedAnswer === question.correct_answer
                ? 'check-circle'
                : 'times-circle'
            }
            size={24}
            style={[
              styles.feedbackIcon,
              selectedAnswer === question.correct_answer
                ? styles.correctIcon
                : styles.incorrectIcon
            ]}
          />
        )}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Score: {score}</Text>
          <Text style={styles.statsText}>Questions Left: {questionsLeft}</Text>
          <View style={styles.timerContainer}>
            <Icon
              name="clock-o"
              size={20}
              color="#555"
              style={styles.clockIcon}
            />
            <Text style={styles.timer}>{timerSeconds}</Text>
          </View>
        </View>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#2196F3' // Default button color
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  correctButton: {
    backgroundColor: 'green'
  },
  incorrectButton: {
    backgroundColor: 'red'
  },
  result: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  feedbackIcon: {
    marginTop: 10
  },
  correctIcon: {
    color: 'green'
  },
  incorrectIcon: {
    color: 'red'
  },
  statsContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  statsText: {
    fontSize: 16,
    marginBottom: 5
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  clockIcon: {
    marginRight: 5
  },
  timer: {
    fontSize: 24,
    color: '#555'
  }
})

export default QuizScreen
