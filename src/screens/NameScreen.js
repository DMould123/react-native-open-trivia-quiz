import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const NameScreen = ({ navigation }) => {
  const [inputName, setInputName] = useState('')

  const handleSubmit = () => {
    if (inputName.trim() !== '') {
      navigation.navigate('CategoryScreen', { name: inputName })
    } else {
      console.error('Please enter a valid name')
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#77A1D3', '#79CBCA', '#E684AE']}
        style={styles.background}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInputName(text)}
          value={inputName}
          placeholder="Your Name"
          placeholderTextColor="#ccc"
        />
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.button}
        >
          <Button title="Next" color="#fff" onPress={handleSubmit} />
        </LinearGradient>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  content: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000'
  },
  button: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5
  }
})

export default NameScreen
