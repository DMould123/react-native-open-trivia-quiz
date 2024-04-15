import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

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
      <Text style={styles.title}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setInputName(text)}
        value={inputName}
      />
      <Button title="Next" onPress={handleSubmit} />
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
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10
  }
})

export default NameScreen
