import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const NameScreen = ({ navigation }) => {
  const [inputName, setInputName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = () => {
    if (inputName.trim() !== '') {
      setIsLoading(true)
      // Simulate an asynchronous operation, like fetching data from a server
      setTimeout(() => {
        setIsLoading(false)
        setIsError(false)
        navigation.navigate('CategoryScreen', { name: inputName })
      }, 1000)
    } else {
      setIsError(true)
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
          style={[styles.input, isError && styles.inputError]}
          onChangeText={(text) => setInputName(text)}
          value={inputName}
          placeholder="Your Name"
          placeholderTextColor="#ccc"
        />
        {isError && (
          <Text style={styles.errorText}>Please enter a valid name</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Next</Text>
          )}
        </TouchableOpacity>
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
    height: '100%',
    zIndex: -1
  },
  content: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3b5998'
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
  inputError: {
    borderColor: '#FF0000'
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#4c669f',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  }
})

export default NameScreen
