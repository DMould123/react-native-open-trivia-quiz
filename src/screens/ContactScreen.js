import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons' // Assuming you're using Expo for icons

const ContactScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields')
    } else {
      // Here you can implement the logic to submit the form
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Message:', message)
      // Reset fields after submission
      setName('')
      setEmail('')
      setMessage('')
      // Optionally, you can navigate to another screen after submission
      navigation.navigate('About')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="chatbox" size={24} color="black" style={styles.icon} />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10
  },
  icon: {
    marginRight: 10
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default ContactScreen
