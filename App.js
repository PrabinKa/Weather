import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/Home/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <>
    <StatusBar translucent={true} backgroundColor={'transparent'} />
          <HomeScreen/>
    </>
  )
}

const styles = StyleSheet.create({})