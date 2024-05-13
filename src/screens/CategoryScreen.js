import { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useQuiz } from '../context/quizContext'
import Icon from 'react-native-vector-icons/FontAwesome'
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
        setError(
          'Failed to fetch categories. Please check your internet connection and try again.'
        )
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const handleRetry = () => {
    setError(null)
    setLoading(true)
    fetchCategories()
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedDifficulty('easy')
    navigation.navigate('DifficultyScreen')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Retry" onPress={handleRetry} />
        </View>
      ) : (
        <>
          <Text style={styles.title}>
            <Icon name="list" size={20} color="black" /> Select a Category:
          </Text>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => handleCategorySelect(category.id.toString())}
              >
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'red'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  categoryContainer: {
    marginTop: 10
  },
  categoryItem: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  }
})

export default CategoryScreen
