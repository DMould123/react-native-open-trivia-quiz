import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import AboutScreen from './src/screens/AboutScreen'
import ContactScreen from './src/screens/ContactScreen'
import NameScreen from './src/screens/NameScreen'
import CategoryScreen from './src/screens/CategoryScreen'
import DifficultyScreen from './src/screens/DifficultyScreen'
import QuizScreen from './src/screens/QuizScreen'
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// Define QuizStack component outside of App component
const QuizStack = ({ name, selectedCategory, selectedDifficulty }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NameScreen"
        component={NameScreen}
        initialParams={{ name: name }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        initialParams={{ selectedCategory: selectedCategory }}
      />
      <Stack.Screen
        name="DifficultyScreen"
        component={DifficultyScreen}
        initialParams={{ selectedDifficulty: selectedDifficulty }}
      />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
    </Stack.Navigator>
  )
}

// App component
export default function App() {
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Contact" component={ContactScreen} />
        <Tab.Screen
          name="Quiz"
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="question" color={color} size={size} />
            )
          }}
          component={QuizStack} // Pass QuizStack directly to component prop
          initialParams={{
            // Pass initial params if needed
            name: name,
            selectedCategory: selectedCategory,
            selectedDifficulty: selectedDifficulty
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
