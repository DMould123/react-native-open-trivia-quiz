import { View, Text, Button } from 'react-native'

export default function HomeScreen({ navigation }) {
  const handleStartQuiz = () => {
    // Set the navigation options instead of passing as params
    navigation.setOptions({
      setName: navigation.setParams // Set setName in navigation options
    })
    // Navigate to the NameScreen to start the quiz
    navigation.navigate('Quiz', { screen: 'NameScreen' })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Quiz App!</Text>
      <Button title="Start Quiz" onPress={handleStartQuiz} />
    </View>
  )
}
