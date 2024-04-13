import React from 'react'
import { View, Text, Button } from 'react-native'
import { useQuiz } from '../context/quizContext'

const DifficultyScreen = ({ navigation }) => {
  const { selectedCategory, setSelectedCategory, selectedDifficulty } =
    useQuiz()

  const handleDifficultySelect = (difficulty) => {
    // Check if selectedCategory and selectedDifficulty are not undefined
    if (selectedDifficulty) {
      if (selectedCategory) {
        // If selectedCategory is already set, navigate directly to the QuizScreen
        navigation.navigate('QuizScreen', {
          selectedCategory,
          selectedDifficulty
        })
      } else {
        // If selectedCategory is not set, prompt the user to select a category
        console.error('Please select a category')
      }
    } else {
      // If selectedDifficulty is not set, prompt the user to select a difficulty
      console.error('Please select a difficulty')
    }
  }

  return (
    <View>
      <Text>Select Difficulty:</Text>
      <Button title="Easy" onPress={() => handleDifficultySelect('easy')} />
      <Button title="Medium" onPress={() => handleDifficultySelect('medium')} />
      <Button title="Hard" onPress={() => handleDifficultySelect('hard')} />
    </View>
  )
}

export default DifficultyScreen
