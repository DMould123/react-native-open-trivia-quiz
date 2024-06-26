import { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import { fetchQuestions } from '../utils/apiUtils'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ConfettiCannon from 'react-native-confetti-cannon'

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
  const [showConfetti, setShowConfetti] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const { selectedCategory, selectedDifficulty } = route.params
  const [error, setError] = useState(null)

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
        setError('Error fetching questions. Please try again.')
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
    if (currentQuestionIndex === questions.length - 1) {
      setShowConfetti(true)
    }
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
    setShowConfetti(false)
    setShowAnswers(false)
    navigation.navigate('Home')
  }

  const toggleShowAnswers = () => {
    setShowAnswers(!showAnswers)
  }

  const renderQuestion = () => {
    if (loading) {
      // If loading, show loading indicator
      return <ActivityIndicator size="large" color="#0000ff" />
    }

    if (error) {
      // If there's an error, display error message
      return (
        <View style={styles.container}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )
    }

    const question = questions[currentQuestionIndex]
    const questionsLeft = questions.length - currentQuestionIndex
    if (!question) {
      // If all questions answered, show completion message
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Congratulations 🎉</Text>
          <Text style={styles.result}>Your Quiz has Ended</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Final Score:</Text>
            <Text style={styles.score}>{score}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={restartQuiz}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
          {showConfetti && (
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }}
              autoStart={true}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={toggleShowAnswers}>
            <Text style={styles.buttonText}>
              {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </Text>
          </TouchableOpacity>
          {showAnswers && (
            <ScrollView style={styles.answerContainer}>
              {questions.map((q, index) => (
                <View key={index} style={styles.questionAnswer}>
                  <Text style={styles.question}>{q.question}</Text>
                  <Text style={styles.answer}>{q.correct_answer}</Text>
                </View>
              ))}
            </ScrollView>
          )}
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  question: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    backgroundColor: '#2196F3',
    borderRadius: 10
  },
  correctButton: {
    backgroundColor: 'green'
  },
  incorrectButton: {
    backgroundColor: 'red'
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center'
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  scoreText: {
    marginRight: 10,
    fontSize: 25
  },
  result: {
    marginRight: 10,
    fontSize: 25
  },
  score: {
    fontSize: 25,
    fontWeight: 'bold'
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
  answerContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    maxHeight: '60%'
  },
  questionAnswer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10
  },
  answer: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default QuizScreen
