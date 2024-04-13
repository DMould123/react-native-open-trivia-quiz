import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

const HomeScreen = ({ navigation }) => {
  const handleStartQuiz = () => {
    navigation.navigate('Quiz', { screen: 'NameScreen' })
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/quiz.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>Welcome to the Quiz App!</Text>
      <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  image: {
    width: '75%',
    height: 200,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default HomeScreen
