import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

const NameScreen = ({ navigation, setName }) => {
  const [inputName, setInputName] = useState('')

  const handleSubmit = () => {
    setName(inputName)
    navigation.navigate('Category')
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
