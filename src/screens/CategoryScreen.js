import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native'
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
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
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Select Category:</Text>
      {categories.map((category) => (
        <View key={category.id} style={styles.categoryItem}>
          <Button
            title={category.name}
            onPress={() => handleCategorySelect(category.id.toString())}
          />
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  categoryItem: {
    marginBottom: 10
  }
})

export default CategoryScreen
