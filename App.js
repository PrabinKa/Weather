import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CurrentWeather from './src/screens/CurrentWeather';

export default function App() {
  return (
    <View style={styles.container}>
      <CurrentWeather/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
