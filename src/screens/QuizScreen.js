import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker' // Import Picker from @react-native-picker/picker
import axios from 'axios'

const QuizScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Fetch questions when component mounts
    fetchQuestions()
  }, [])

  // Function to fetch questions from the API
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
      )
      setQuestions(response.data.results)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }

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
        {/* Render answer options here */}
        {/* Example: <Button title={question.correct_answer} onPress={() => handleAnswer(true)} /> */}
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
      <Button title="Start Quiz" onPress={fetchQuestions} />
      <Text>Score: {score}</Text>
      {renderQuestion()}
    </View>
  )
}

export default QuizScreen
