import axios from 'axios'

export const fetchQuestions = async (category, difficulty) => {
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    )
    return response.data.results
  } catch (error) {
    console.error('Error fetching questions:', error)
    throw error
  }
}
