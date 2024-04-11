import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'

const DifficultyScreen = ({ navigation, setSelectedDifficulty }) => {
  const [selectedDifficultyLocal, setSelectedDifficultyLocal] = useState('')

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty)
    setSelectedDifficultyLocal(difficulty)
  }

  return (
    <View>
      <Text>Select Difficulty:</Text>
      <Button title="Easy" onPress={() => handleDifficultySelect('easy')} />
      <Button title="Medium" onPress={() => handleDifficultySelect('medium')} />
      <Button title="Hard" onPress={() => handleDifficultySelect('hard')} />
      <Button
        title="Next"
        onPress={() =>
          navigation.navigate('QuizScreen', {
            selectedCategory,
            selectedDifficulty: selectedDifficultyLocal
          })
        }
        disabled={!selectedDifficultyLocal}
      />
    </View>
  )
}

export default DifficultyScreen
