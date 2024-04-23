import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Linking, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const AboutScreen = ({ navigation }) => {
  const portfolioUrl = 'https://david-mould-portfolio-page.netlify.app'
  const titleAnim = useRef(new Animated.Value(0)).current
  const imageAnim = useRef(new Animated.Value(0)).current
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!hasAnimated) {
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start()
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start(() => setHasAnimated(true))
    }
  }, [hasAnimated])

  const handleVisitWebsite = () => {
    Linking.openURL(portfolioUrl)
  }

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          {
            transform: [
              {
                translateY: titleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0]
                })
              }
            ]
          }
        ]}
      >
        About Me
      </Animated.Text>
      <Animated.Image
        source={{
          uri: 'https://res.cloudinary.com/dele4dvi9/image/upload/v1680781966/memory-game-pictures/1679569823407_u98yg8.jpg'
        }}
        style={[
          styles.image,
          {
            transform: [
              {
                scale: imageAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.5, 1.2, 1]
                })
              }
            ]
          }
        ]}
      />
      <Text style={styles.description}>
        I'm David Mould, a junior developer passionate about building mobile
        applications. This app is one of my projects, aimed at providing users
        with fun and challenging quizzes to enhance their knowledge and
        enjoyment.
      </Text>
      <View style={styles.socialLinks}>
        <Icon
          name="linkedin"
          size={30}
          color="#000"
          onPress={() => {
            Linking.openURL(
              'https://www.linkedin.com/in/david-mould-b6731a21a/'
            )
          }}
          style={styles.icon}
        />
        <Icon
          name="github"
          size={30}
          color="#000"
          onPress={() => {
            Linking.openURL('https://github.com/DMould123')
          }}
          style={styles.icon}
        />
        <Icon
          name="twitter"
          size={30}
          color="#000"
          onPress={() => {
            Linking.openURL('https://twitter.com/DM12_51')
          }}
          style={styles.icon}
        />
      </View>
      <Button
        title="Visit My Website"
        onPress={handleVisitWebsite}
        style={styles.button}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
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
  icon: {
    marginHorizontal: 10
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '100%'
  }
})

export default AboutScreen
