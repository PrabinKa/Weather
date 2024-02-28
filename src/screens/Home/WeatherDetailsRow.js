import React from 'react';
import {View} from 'react-native';

export default function WeatherDetailsRow({children}) {
  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>{children}</View>
  );
}
