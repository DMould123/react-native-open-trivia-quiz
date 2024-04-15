import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Our Company</Text>
      <Text style={styles.description}>
        Welcome to Trivify! Trivify was founded in 2015 by a group of trivia
        enthusiasts who shared a passion for knowledge and learning. Our mission
        is to create engaging and educational experiences through fun and
        challenging quizzes. Since our inception, we have been dedicated to
        providing high-quality content across a wide range of categories, from
        history and science to pop culture and entertainment.
      </Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  }
})

export default AboutScreen
