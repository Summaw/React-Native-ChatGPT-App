
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, Dimensions, Image, StatusBar, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const window = Dimensions.get('window');
const numStars = 100;


export default function StarBackground({ navigation }) {
    const [stars, setStars] = useState(
      [...Array(numStars)].map(() => ({
        animation: new Animated.Value(0),
        left: Math.random() * window.width,
        top: Math.random() * window.height,
      }))
    );
  
    useEffect(() => {
      stars.forEach((star) => {
        animateStar(star.animation);
      });
    }, [stars]);
  
    const animateStar = (animation) => {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: Math.random() * 1000 + 500,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: Math.random() * 1000 + 500,
          useNativeDriver: false,
        }),
      ]).start(() => animateStar(animation));
    };
  
    const scrollA = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(scrollA, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start();
    }, [scrollA]);
  
    const textSize = scrollA.interpolate({
      inputRange: [0, 1],
      outputRange: [35, 24],
    });
  
    const imageTop = scrollA.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50],
    });
  
    return (
      <View style={styles.backgroundImage}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <LinearGradient colors={['#000', '#000']} style={styles.background}/>
        { <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://thumbs.dreamstime.com/b/vector-graphic-initials-letter-fs-logo-design-template-vector-graphic-emblem-hexagon-initials-letter-fs-logo-design-template-204622525.jpg'
            }}
            resizeMode="contain"
          />
        </View>}
        {stars.map((star, i) => (
          <Animated.View
            key={i}
            style={[
              styles.star,
              {
                left: star.left,
                top: star.top,
                opacity: star.animation,
              },
            ]}
          />
        ))}
        
      </View> 
    );
  }
  
  const styles = StyleSheet.create({
    backgroundImage: {
      position: 'absolute',
      width: window.width,
      height: window.height + StatusBar.currentHeight,
      justifyContent: 'center',
      alignItems: 'center',

    },
    logoContainer: {
      alignItems: 'center',
      marginTop: -400,
    },
    logo: {
      width: 200,
      height: 200,
    },
    welcomeText: {
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginTop: 20,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    button: {
      width: '80%',
      backgroundColor: '#ADD8E6',
      padding: 15,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    background: {
      position: 'absolute',
      width: window.width,
      height: window.height + StatusBar.currentHeight,
    },
    star: {
      position: 'absolute',
      backgroundColor: '#FFF',
      width: 5,
      height: 5,
      borderRadius: 2.5,
    },
  });