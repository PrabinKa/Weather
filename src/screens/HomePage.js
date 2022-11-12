import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import * as Location from "expo-location";

const openWeatherKey = "012ec2c115e1e269eea0c935bcd04d79";

function HomePage() {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [sunSetTime, setSunSetTime] = useState(null);
  const [sunRiseTime, setSunRiseTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false)

  //get today date javascript
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  const weekday = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  var dayOfWeek = weekday[today.getDay()];
  const todayDate = dayOfWeek + ", " + mm + "/" + dd + "/" + yyyy;

  useEffect(() => {
    currentWeather();
  }, []);

  //get user's current location and fetch todays weather forecast
  const currentWeather = async () => {
    setRefreshPage(true)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    //set current location
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);

    setLoading(true);
    if (longitude && latitude) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`
      );
      const data = await response.json();
      if (!response.ok) {
        Alert.alert("Error", "Something went wrong", [
          { text: "OK", onPress: () => console.warn("OK Pressed") },
        ]);
      } else {
        setCurrentWeatherData(data);
        setWeatherCondition(data.weather[0]["description"]);
        const sunRise = new Date(data.sys.sunrise * 1000);
        const sunSet = new Date(data.sys.sunset * 1000);
        setSunRiseTime(sunRise);
        setSunSetTime(sunSet);
      }
    }
    setLoading(false);
    setRefreshPage(false)
  };

  if (errorMsg) {
    Alert.alert("Permission", errorMsg, [
      { text: "OK", onPress: () => console.warn("OK Pressed") },
    ]);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshPage} onRefresh={()=> currentWeather()} />
        
      }>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.location}>
            {currentWeatherData ? currentWeatherData.name : (<ActivityIndicator size="small" />)}
          </Text>
          <Ionicons name="location-outline" size={18} color="black" />
        </View>
        <View style={styles.tempContainer}>
          {currentWeatherData ? (
            <Image
              source={{
                uri: `http://openweathermap.org/img/w/${currentWeatherData.weather[0]["icon"]}.png`,
              }}
              style={{ height: 200, width: 200 }}
            />
          ) : (
            <ActivityIndicator size="small" />
          )}
          <Text style={{ color: "black", fontSize: 30, fontWeight: "bold" }}>
            {currentWeatherData
              ? parseInt(currentWeatherData.main.temp - 273.15)
              : (<ActivityIndicator size="small" />)}
            °C
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "black", fontSize: 24, fontWeight: "bold" }}>
            {weatherCondition
              ? weatherCondition
                  .toLowerCase()
                  .replace(/\b(\w)/g, (s) => s.toUpperCase())
              : (<ActivityIndicator size="small" />)}
          </Text>
        </View>

        <View style={{ marginTop: 40, paddingLeft: 20 }}>
          <Text style={{ fontWeight: "700", fontSize: 17 }}>{todayDate}</Text>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={styles.info}>
            <Feather name="sunrise" size={25} color="#E67451" />
            <Text style={styles.infoText}>
              {currentWeatherData
                ? sunRiseTime.toLocaleTimeString().replace(/:\+ /, "")
                : (<ActivityIndicator size="small" />)}
            </Text>
            <Text style={styles.infoText}>Sun Rise</Text>
          </View>
          <View style={styles.info}>
            <Feather name="sunset" size={25} color="#ffc922" />
            <Text style={styles.infoText}>
              {currentWeatherData
                ? sunSetTime.toLocaleTimeString().replace(/:\+ /, "")
                : (<ActivityIndicator size="small" />)}
            </Text>
            <Text style={styles.infoText}>Sun Set</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={styles.info}>
            <Ionicons name="thermometer" size={25} color="black" />
            <Text style={styles.infoText}>
              {currentWeatherData
                ? parseInt(currentWeatherData.main.feels_like - 273.15)
                : (<ActivityIndicator size="small" />)}
              °C
            </Text>
            <Text style={styles.infoText}>Feels Like</Text>
          </View>
          <View style={styles.info}>
            <Ionicons name="water-sharp" size={25} color="#87CEEB" />
            <Text style={styles.infoText}>
              {currentWeatherData
                ? currentWeatherData.main.humidity
                : (<ActivityIndicator size="small" />)}
              %
            </Text>
            <Text style={styles.infoText}>Humidity</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: StatusBar.currentHeight + 10,
  },
  tempContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 40,
    marginVertical: 20,
  },
  info: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: Dimensions.get("screen").width / 2.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  infoText: { color: "white", fontSize: 18 },
});
