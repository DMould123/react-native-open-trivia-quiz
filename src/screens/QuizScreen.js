import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { fetchQuestions } from '../utils/apiUtils'

const QuizScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  // Function to handle starting the quiz
  const startQuiz = async () => {
    try {
      const fetchedQuestions = await fetchQuestions(
        selectedCategory,
        selectedDifficulty
      )
      setQuestions(fetchedQuestions)
    } catch (error) {
      // Handle error gracefully
      console.error('Error starting quiz:', error)
    }
  }

  useEffect(() => {
    // Fetch questions when component mounts
    if (selectedCategory && selectedDifficulty) {
      startQuiz()
    }
  }, [selectedCategory, selectedDifficulty])

  // Function to handle user's answer
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      // Increment score if answer is correct
      setScore(score + 1)
    }
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  // Function to render the current question
  const renderQuestion = () => {
    const question = questions[currentQuestionIndex]
    if (!question) {
      // Handle end of quiz
      return null
    }
    return (
      <View>
        <Text>{question.question}</Text>
        {/* Render answer options as buttons */}
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

  return (
    <View>
      <Text>Enter your name:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10
        }}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <View>
        <Text>Select Category:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }
        >
          <Picker.Item label="Any" value="" />
          <Picker.Item label="General Knowledge" value="9" />
          <Picker.Item label="Science & Nature" value="17" />
          {/* Add more Picker items based on available categories */}
        </Picker>
      </View>
      <View>
        <Text>Select Difficulty:</Text>
        <Picker
          selectedValue={selectedDifficulty}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedDifficulty(itemValue)
          }
        >
          <Picker.Item label="Any" value="" />
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>
      </View>
      <Button title="Start Quiz" onPress={startQuiz} />
      <Text>Score: {score}</Text>
      {renderQuestion()}
    </View>
  )
}

export default QuizScreen
