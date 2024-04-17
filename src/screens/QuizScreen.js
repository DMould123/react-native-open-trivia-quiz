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
  const { selectedCategory, selectedDifficulty } = route.params

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
  }
})

export default QuizScreen
