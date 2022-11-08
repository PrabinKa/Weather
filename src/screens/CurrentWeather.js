import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";

const data = [
  {
    time: "08:00pm",
    icon: "sunny",
    title: "clear",
    temp: "25°C",
  },
  {
    time: "08:00pm",
    icon: "sunny",
    title: "clear",
    temp: "25°C",
  },
  {
    time: "08:00pm",
    icon: "sunny",
    title: "clear",
    temp: "25°C",
  },
  {
    time: "08:00pm",
    icon: "sunny",
    title: "clear",
    temp: "25°C",
  },
  {
    time: "08:00pm",
    icon: "sunny",
    title: "clear",
    temp: "25°C",
  },
  {
    time: "08:00pm",
    icon: "sunny",
    title: "clear",
    temp: "25°C",
  },
];

const googleApiKey = "AIzaSyCgQGp-G9aXq4y5QKxz4yXccatCCFqrsMY"

function CurrentWeather() {
  const animation = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [cityDetails, setCityDetails] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);

  if (errorMsg) {
    Alert.alert("Permission", errorMsg, [
      { text: "OK", onPress: () => console.warn("OK Pressed") },
    ]);
  }


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      //setting google api key
      Location.setGoogleApiKey(googleApiKey);

      //get Region details
      let regionName = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      //set region details
      setCityDetails(regionName)

      //set current location
      setCurrentLocation({
        ...currentLocation,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.location}>{!cityDetails ? "Loading" : JSON.stringify(cityDetails[0]["city"])}</Text>
        <Ionicons name="location-outline" size={18} color="white" />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: 40,
          marginVertical: 20,
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 150,
            height: 200,
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../../assets/rainy.json")}
        />
        <Text style={{ color: "white", fontSize: 30 }}>25°C</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 24 }}>Mostly Cloudy</Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text style={{ color: "white", fontSize: 16, marginLeft: 10 }}>
          Tuesday 11/8/2022
        </Text>
        <ScrollView horizontal={true}>
          {data.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginTop: 20,
                }}
              >
                <Text>{data.time}</Text>
                <Ionicons name={data.icon} size={25} color="white" />
                <Text>{data.title}</Text>
                <Text>{data.temp}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity style={{ marginVertical: 50 }} onPress={() => {}}>
        <Text
          style={{
            borderBottomColor: "white",
            borderBottomWidth: 2,
            color: "blue",
            fontSize: 20,
            alignSelf: "center",
          }}
        >
          7 Days Weather Forecast
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default CurrentWeather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: StatusBar.currentHeight + 10,
  },
});
