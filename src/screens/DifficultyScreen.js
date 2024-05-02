import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useQuiz } from '../context/quizContext'

const DifficultyScreen = ({ navigation }) => {
  const { selectedCategory, selectedDifficulty } = useQuiz()

  const handleDifficultySelect = (difficulty) => {
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
      <TouchableOpacity
        style={[styles.buttonContainer, styles.easyButton]}
        onPress={() => handleDifficultySelect('easy')}
      >
        <Text style={styles.buttonText}>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.mediumButton]}
        onPress={() => handleDifficultySelect('medium')}
      >
        <Text style={styles.buttonText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.hardButton]}
        onPress={() => handleDifficultySelect('hard')}
      >
        <Text style={styles.buttonText}>Hard</Text>
      </TouchableOpacity>
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
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10
  },
  easyButton: {
    backgroundColor: '#4CAF50'
  },
  mediumButton: {
    backgroundColor: '#FFC107'
  },
  hardButton: {
    backgroundColor: '#F44336'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default DifficultyScreen
