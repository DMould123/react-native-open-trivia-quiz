import React, { useState, useEffect } from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'
import { useQuiz } from '../context/quizContext'
import axios from 'axios'

const CategoryScreen = ({ navigation }) => {
  const { setSelectedCategory, setSelectedDifficulty } = useQuiz()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php')
        setCategories(response.data.trivia_categories)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setError('Error fetching categories. Please try again later.')
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedDifficulty('easy')
    if (category !== undefined) {
      navigation.navigate('DifficultyScreen')
    } else {
      console.error('Selected category is undefined')
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
        <Button
          title="Retry"
          onPress={() => {
            setError(null)
            setLoading(true)
          }}
        />
      </View>
    )
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
