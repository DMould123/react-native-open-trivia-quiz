import { useRef, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Animated,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const AboutScreen = ({ navigation }) => {
  const portfolioUrl = 'https://david-mould-portfolio-page.netlify.app'
  const titleAnim = useRef(new Animated.Value(0)).current
  const imageAnim = useRef(new Animated.Value(0)).current
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!hasAnimated) {
      Animated.parallel([
        Animated.timing(titleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(imageAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        })
      ]).start(() => setHasAnimated(true))
    }
  }, [hasAnimated])

  const handleVisitWebsite = () => {
    Linking.openURL(portfolioUrl)
  }

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: titleAnim }]}>
        About Me
      </Animated.Text>
      <Animated.Image
        source={{
          uri: 'https://res.cloudinary.com/dele4dvi9/image/upload/v1680781966/memory-game-pictures/1679569823407_u98yg8.jpg'
        }}
        style={[styles.image, { transform: [{ scale: imageAnim }] }]}
      />
      <Text style={styles.description}>
        I'm David Mould, a junior developer passionate about building mobile
        applications. This app is one of my projects, aimed at providing users
        with fun and challenging quizzes to enhance their knowledge and
        enjoyment.
      </Text>
      <View style={styles.socialLinks}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.linkedin.com/in/david-mould-b6731a21a/'
            )
          }
          style={[styles.iconContainer, styles.linkedin]}
        >
          <Icon name="linkedin" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://github.com/DMould123')}
          style={[styles.iconContainer, styles.github]}
        >
          <Icon name="github" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://twitter.com/DM12_51')}
          style={[styles.iconContainer, styles.twitter]}
        >
          <Icon name="twitter" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleVisitWebsite} style={styles.button}>
        <Text style={styles.buttonText}>Visit My Website</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  iconContainer: {
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#007bff',
    elevation: 5
  },
  linkedin: {
    backgroundColor: '#0077b5'
  },
  github: {
    backgroundColor: '#333'
  },
  twitter: {
    backgroundColor: '#1da1f2'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default AboutScreen
