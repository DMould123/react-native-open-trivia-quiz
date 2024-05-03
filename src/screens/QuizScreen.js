import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
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
    const question = questions[currentQuestionIndex]
    const questionsLeft = questions.length - currentQuestionIndex
    if (!question) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Quiz Completed!</Text>
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
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.questionsLeftText}>
            Questions Left: {questionsLeft}
          </Text>
        </View>
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
    marginBottom: 20,
    textAlign: 'center'
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10
  },
  correctIcon: {
    color: 'green'
  },
  incorrectIcon: {
    color: 'red'
  },
  feedbackIcon: {
    marginTop: 10
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  scoreText: {
    marginRight: 10,
    fontSize: 16
  },
  questionsLeftText: {
    fontSize: 16
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
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
