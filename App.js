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
import { QuizProvider } from './src/context/quizContext'
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// Define QuizStack component outside of App component
const QuizStack = ({ route }) => {
  const { name, selectedCategory, selectedDifficulty } = route.params

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NameScreen"
        component={NameScreen}
        initialParams={{ name: name }}
      />
      <Stack.Screen
        name="CategoryScreen"
        options={{
          headerShown: false
        }}
      >
        {(props) => (
          <CategoryScreen
            {...props}
            // Pass setSelectedCategory as a prop to CategoryScreen
            setSelectedCategory={route.params.setSelectedCategory}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="DifficultyScreen"
        component={DifficultyScreen}
        initialParams={{ selectedDifficulty: selectedDifficulty }}
      />
      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        initialParams={{ name, selectedCategory, selectedDifficulty }}
      />
    </Stack.Navigator>
  )
}

// App component
export default function App() {
  return (
    <QuizProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="info-circle" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="Contact"
            component={ContactScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="envelope" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="Quiz"
            options={{
              tabBarVisible: false,
              tabBarIcon: ({ color, size }) => (
                <Icon name="question" color={color} size={size} />
              )
            }}
            component={QuizStack}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QuizProvider>
  )
}
