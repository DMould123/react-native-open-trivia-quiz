import { useState, useRef, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  ScrollView,
  Animated
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ContactScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const titleAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }, [])

  const handleSubmit = () => {
    Keyboard.dismiss()

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields')
    } else {
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Message:', message)
      setName('')
      setEmail('')
      setMessage('')
      Alert.alert('Success', 'Message submitted successfully!')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleAnim,
            transform: [
              {
                translateY: titleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
                })
              }
            ]
          }
        ]}
      >
        Contact Us
      </Animated.Text>
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
      <View style={[styles.inputContainer, { marginBottom: 0 }]}>
        <Ionicons name="chatbox" size={24} color="black" style={styles.icon} />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30
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
    paddingHorizontal: 10,
    borderRadius: 5
  },
  icon: {
    marginRight: 10
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  messageInput: {
    height: 100
  }
})

export default ContactScreen
