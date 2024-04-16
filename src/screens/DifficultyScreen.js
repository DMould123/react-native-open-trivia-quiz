import { View, Text, Button, StyleSheet } from 'react-native'
import { useQuiz } from '../context/quizContext'

const DifficultyScreen = ({ navigation }) => {
  const { selectedCategory, selectedDifficulty } = useQuiz()

  const handleDifficultySelect = (difficulty) => {
    console.log('Selected Category:', selectedCategory)
    console.log('Selected Difficulty:', selectedDifficulty)

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
    <View style={styles.container}>
      <Text style={styles.title}>Select Difficulty:</Text>
      <View style={styles.buttonContainer}>
        <Button title="Easy" onPress={() => handleDifficultySelect('easy')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Medium"
          onPress={() => handleDifficultySelect('medium')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Hard" onPress={() => handleDifficultySelect('hard')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%'
  }
})

export default DifficultyScreen
