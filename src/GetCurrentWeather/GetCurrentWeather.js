import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

const openWeatherKey = "012ec2c115e1e269eea0c935bcd04d79";
const googleApiKey = "AIzaSyCgQGp-G9aXq4y5QKxz4yXccatCCFqrsMY";

export const GetCurrentWeather = createContext();

export const CurrentWeatherProvider = ({ children }) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [cityDetails, setCityDetails] = useState(null)

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
      setCityDetails(regionName);

      //set current location
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  });

  const currentWeather = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        let descript = data.weather[0]["description"];
        setDescription(descript);
        let tempInFern = data.main.temp;
        let tempInCel = parseInt(tempInFern - 273.15);
        setTemperature(tempInCel);
      });
  };

  useEffect(() => {
    currentWeather();
  },[longitude, latitude]);


  return (
    <GetCurrentWeather.Provider value={{ temperature, description, cityDetails }}>
      {children}
    </GetCurrentWeather.Provider>
  );
};
