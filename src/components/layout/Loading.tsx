import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'

const Loading = () => {
  // const animation = useRef<LottieView | null>(null);
  setTimeout(() => {
    // animation.current?.play();
  }, 100)

  return (
    <View style={styles.container}>
      <Text style={styles.lottie}>Loading</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    height: 250,
    width: 250,
  }
})