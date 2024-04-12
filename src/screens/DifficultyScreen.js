import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { useQuiz } from '../context/quizContext'

const DifficultyScreen = ({ navigation }) => {
  const [selectedDifficultyLocal, setSelectedDifficultyLocal] = useState('')
  const { setSelectedDifficulty } = useQuiz()

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
            selectedDifficulty: selectedDifficultyLocal
          })
        }
        disabled={!selectedDifficultyLocal}
      />
    </View>
  )
}

export default DifficultyScreen
