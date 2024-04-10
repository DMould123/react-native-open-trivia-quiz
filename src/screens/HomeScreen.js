import React from 'react'
import { View, Text, Button } from 'react-native'

export default function HomeScreen({ navigation }) {
  const handleStartQuiz = () => {
    // Navigate to the NameScreen to start the quiz
    navigation.navigate('Name')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Quiz App!</Text>
      <Button title="Start Quiz" onPress={handleStartQuiz} />
    </View>
  )
}
