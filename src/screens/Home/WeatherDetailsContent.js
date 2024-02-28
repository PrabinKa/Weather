import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default function WeatherDetailsContent({title, value}) {
  return (
    <View style={styles.contentWrapper}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    width: '50%',
    justifyContent: 'flex',
    alignItems: 'flex-start',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  title: {
    color: '#767981',
    marginTop: 5,
  },
});
