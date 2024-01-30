import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import Svg, { ClipPath, Ellipse, Image } from 'react-native-svg';
import styles from './styles';
export default function App() {
  const { width, height } = Dimensions.get('window');
  const imagePosition = useSharedValue(1);
  const [isRegister, setIsRegister] = useState(false)

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpaletion = interpolate(imagePosition.value, [0, 1], [-height / 1.9, 0])
    return {
      transform: [{ translateY: withTiming(interpaletion, { durantion: 1000 }) }]
    }
  })

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const interpaletion = interpolate(imagePosition.value, [0, 1], [250, 0])
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [{ translateY: withTiming(interpaletion, { durantion: 1000 }) }]
    }
  })

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpaletion = interpolate(imagePosition.value, [0, 1], [180, 360])
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [{ rotate: withTiming(interpaletion + "deg", { duration: 1000 }) }]
    }
  })

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, { duration: 800 })) : withTiming(0, { duration: 300 })
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0
    if (isRegister) {
      setIsRegister(false)
    }
  }
  const registerHanlder = () => {
    imagePosition.value = 0
    if (!isRegister) {
      setIsRegister(true)
    }
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id='clipPathId'>
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image href={require('./assets/login-background.jpg')}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio='xMidYMid slice'
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
          <Text onPress={() => imagePosition.value = 1}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHanlder}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput placeholder='E-mail'
            placeholderTextColor='black'
            style={styles.textInput}
          />
          {isRegister && (
            <TextInput placeholder='Full Name'
              placeholderTextColor='black'
              style={styles.textInput}
            />
          )}
          <TextInput placeholder='Password'
            placeholderTextColor='black'
            style={styles.textInput}
          />

          <View style={styles.formButton}>
            <Text style={styles.buttonText}>
              {isRegister ? 'REGISTER ' : 'LOG IN'}
            </Text>
          </View>

        </Animated.View>
      </View>
    </View >
  );
}


