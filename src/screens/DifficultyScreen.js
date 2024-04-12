import { View, Text, Button } from 'react-native'
import { useQuiz } from '../context/quizContext'

const DifficultyScreen = ({ navigation }) => {
  const { selectedCategory, selectedDifficulty } = useQuiz()

  const handleDifficultySelect = (difficulty) => {
    // Check if selectedCategory and selectedDifficulty are not undefined
    if (selectedCategory && selectedDifficulty) {
      navigation.navigate('QuizScreen', {
        selectedCategory,
        selectedDifficulty
      })
    } else {
      console.error('Selected category or difficulty is undefined')
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