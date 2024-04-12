import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useQuiz } from '../context/quizContext'

const CategoryScreen = () => {
  const [categories, setCategories] = useState([])
  const { setSelectedCategory } = useQuiz()
  const navigation = useNavigation()

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
    navigation.navigate('DifficultyScreen')
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
