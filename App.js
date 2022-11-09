import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomePage from "./src/screens/HomePage";
import { CurrentWeatherProvider } from "./src/GetCurrentWeather/GetCurrentWeather";

export default function App() {
  return (
    <View style={styles.container}>
      <CurrentWeatherProvider>
        <HomePage />
      </CurrentWeatherProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
