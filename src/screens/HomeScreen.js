import { useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleStartQuiz = () => {
    navigation.navigate('Quiz', { screen: 'NameScreen' })
  }

  // Animation setup
  const spinValue = useRef(new Animated.Value(0)).current
  const spinDuration = 2000
  const pauseDuration = 2500

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: spinDuration,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.delay(pauseDuration)
      ])
    ).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/quiz.jpg')}
        style={[styles.image, { transform: [{ rotate: spin }] }]}
        resizeMode="cover"
      />
      <Text style={styles.title}>Welcome to the Quiz App!</Text>
      <Text style={styles.description}>
        Ready to challenge yourself with our exciting quizzes? Explore a variety
        of topics, improve your knowledge, and enjoy the thrill of learning!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
        <Text style={styles.buttonText}>Start Quiz</Text>
        <Icon name="arrow-right" size={20} color="#fff" style={styles.icon} />
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
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  image: {
    width: '75%',
    height: 200,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5
  },
  icon: {
    marginLeft: 5
  }
})

export default HomeScreen
