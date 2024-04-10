import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NameScreen from './src/screens/NameScreen'
import CategoryScreen from './src/screens/CategoryScreen'
import DifficultyScreen from './src/screens/DifficultyScreen'
import QuizScreen from './src/screens/QuizScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Name">
          {(props) => <NameScreen {...props} setName={setName} />}
        </Tab.Screen>
        <Tab.Screen name="Category">
          {(props) => (
            <CategoryScreen
              {...props}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Difficulty" options={{ tabBarVisible: false }}>
          {(props) => (
            <DifficultyScreen
              {...props}
              setSelectedDifficulty={setSelectedDifficulty}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Quiz"
          component={QuizScreen}
          initialParams={{
            name: name,
            selectedCategory: selectedCategory,
            selectedDifficulty: selectedDifficulty
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
