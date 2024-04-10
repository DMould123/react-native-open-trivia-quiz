// CategoryScreen.js
import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'

const CategoryScreen = ({ navigation, setSelectedCategory }) => {
  const [selectedCategoryLocal, setSelectedCategoryLocal] = useState('')

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedCategoryLocal(category)
  }

  return (
    <View>
      <Text>Select Category:</Text>
      <Button
        title="General Knowledge"
        onPress={() => handleCategorySelect('9')}
      />
      <Button
        title="Science & Nature"
        onPress={() => handleCategorySelect('17')}
      />
      {/* Add more categories as needed */}
      <Button
        title="Next"
        onPress={() => navigation.navigate('Difficulty')}
        disabled={!selectedCategoryLocal}
      />
    </View>
  )
}

export default CategoryScreen
