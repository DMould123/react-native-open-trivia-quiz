import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useQuiz } from '../context/quizContext'
import axios from 'axios' // Import axios for API requests

const CategoryScreen = ({ navigation }) => {
  const { setSelectedCategory, setSelectedDifficulty } = useQuiz() // Using useQuiz hook to access context values
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php')
        setCategories(response.data.trivia_categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedDifficulty('easy') // Set a default difficulty when selecting a category
    // Check if selectedCategory is not undefined
    if (category !== undefined) {
      navigation.navigate('DifficultyScreen')
    } else {
      console.error('Selected category is undefined')
    }
  }

  return (
    <View>
      <Text>Select Category:</Text>
      {categories.map((category) => (
        <Button
          key={category.id}
          title={category.name}
          onPress={() => handleCategorySelect(category.id.toString())}
        />
      ))}
    </View>
  )
}

export default CategoryScreen
