import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

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
    <View>
      <Text>Enter your name:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10
        }}
        onChangeText={(text) => setInputName(text)}
        value={inputName}
      />
      <Button title="Next" onPress={handleSubmit} />
    </View>
  )
}

export default NameScreen
