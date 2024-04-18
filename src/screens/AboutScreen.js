import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Linking, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const AboutScreen = ({ navigation }) => {
  const portfolioUrl = 'https://david-mould-portfolio-page.netlify.app'
  const [hoveredIcon, setHoveredIcon] = useState(null)

  const handleVisitWebsite = () => {
    Linking.openURL(portfolioUrl)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Me</Text>
      <Image
        source={{
          uri: 'https://res.cloudinary.com/dele4dvi9/image/upload/v1680781966/memory-game-pictures/1679569823407_u98yg8.jpg'
        }}
        style={styles.image}
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
          size={36} // Increased icon size
          color={hoveredIcon === 'linkedin' ? '#2867B2' : '#000'}
          onPress={() => {
            Linking.openURL(
              'https://www.linkedin.com/in/david-mould-b6731a21a/'
            )
          }}
          style={styles.icon}
          onMouseEnter={() => setHoveredIcon('linkedin')}
          onMouseLeave={() => setHoveredIcon(null)}
        />
        <Icon
          name="github"
          size={36}
          color={hoveredIcon === 'github' ? '#211F1F' : '#000'}
          onPress={() => {
            Linking.openURL('https://github.com/DMould123')
          }}
          style={styles.icon}
          onMouseEnter={() => setHoveredIcon('github')}
          onMouseLeave={() => setHoveredIcon(null)}
        />
        <Icon
          name="twitter"
          size={36}
          color={hoveredIcon === 'twitter' ? '#1DA1F2' : '#000'}
          onPress={() => {
            Linking.openURL('https://twitter.com/DM12_51')
          }}
          style={styles.icon}
          onMouseEnter={() => setHoveredIcon('twitter')}
          onMouseLeave={() => setHoveredIcon(null)}
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
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  description: {
    fontSize: 18,
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
    justifyContent: 'space-evenly'
  },
  icon: {
    marginHorizontal: 10
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: '80%'
  }
})

export default AboutScreen
