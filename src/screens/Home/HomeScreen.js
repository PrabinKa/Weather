import React, {useRef} from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {todayForeCast, sevenDayWeather} from '../../constant/forecastdata';
import WeatherDetailsRow from './WeatherDetailsRow';
import WeatherDetailsContent from './WeatherDetailsContent';
import {
  responsiveFont,
  verticalSpace,
  horizontalSpace,
} from '../../utils/Responsive';

const HeaderComponent = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../assets/building.png')}
        style={styles.headerIcons}
      />
      <View style={{alignItems: 'center', marginTop: verticalSpace(0.015)}}>
        <Text style={styles.headerCityName}>Kirtipur</Text>
        <Image
          source={require('../../assets/placeholder.png')}
          style={{
            height: verticalSpace(0.01),
            width: verticalSpace(0.01),
            tintColor: '#1575e0',
          }}
        />
      </View>
      <Image
        source={require('../../assets/menu.png')}
        style={styles.headerIcons}
      />
    </View>
  );
};

const renderHourlyForecastItem = ({item}) => (
  <View style={styles.hourlyForecastItem}>
    <Text numberOfLines={1} style={styles.forecastItemText}>
      {item.time}
    </Text>
    <Image
      source={item.icon}
      style={[styles.forecastItemIcon, {tintColor: '#767981'}]}
    />
    <Text numberOfLines={1} style={styles.forecastItemText}>
      {item.weather}
    </Text>
    <Text style={styles.forecastItemText}>{item.temp}</Text>
  </View>
);

const RenderSevendayWeatherItem = ({data, index}) => (
  <View key={index} style={styles.row}>
    <Text style={styles.cell}>{data.date}</Text>
    <Text style={styles.cell}>{data.week}</Text>
    <Image source={data.icon} style={{height: 25, width: 25}} />
    <Text style={[styles.cell, {marginLeft: 15}]}>{data.weather}</Text>
    <Text style={[styles.cell, {textAlign: 'right'}]}>{data.temp}</Text>
  </View>
);

export default function HomeScreen() {
  const scrollViewRef = useRef(null);
  const textOpacity = useSharedValue(1);

  const handleScroll = event => {
    const scrollY = event.nativeEvent.contentOffset.y;

    textOpacity.value = withTiming(
      interpolate(
        scrollY,
        [0, 20, 40, 60, 80, 100],
        [1, 0.8, 0.6, 0.4, 0.2, 0],
      ),
      {duration: 0},
    );
  };

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.backgroundImage}>
      <HeaderComponent />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          height: '100%',
          width: '100%',
          marginTop: StatusBar.currentHeight,
        }}>
        <View style={styles.todayForecastWrapper}>
          <View style={{flexDirection: 'row'}}>
            <Animated.Text
              style={[
                styles.todayForecastText,
                {fontSize: responsiveFont(80)},
                animatedStyles,
              ]}>
              18
            </Animated.Text>
            <Animated.Text
              style={[
                styles.todayForecastText,
                {fontSize: responsiveFont(28)},
                animatedStyles,
              ]}>
              °C
            </Animated.Text>
          </View>
          <Animated.Text
            style={[
              styles.todayForecastText,
              {
                fontSize: responsiveFont(20),
                marginTop: -25,
              },
              animatedStyles,
            ]}>
            Partly Cloudy
          </Animated.Text>
        </View>
        <View style={styles.forecastContainerSheet}>
          <View style={styles.customDragIcon} />
          <FlatList
            horizontal
            data={todayForeCast}
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={styles.hourlyForecastList}
            renderItem={renderHourlyForecastItem}
          />
          <View syle={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: responsiveFont(20),
                fontWeight: '500',
                color: '#fff',
                marginVertical: 10,
              }}>
              7-Day weather report
            </Text>
            <View style={{marginVertical: 20}}>
              {sevenDayWeather.map((data, index) => {
                return <RenderSevendayWeatherItem data={data} index={index} />;
              })}
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: responsiveFont(20),
                fontWeight: '500',
                color: '#fff',
                marginTop: 20,
              }}>
              Weather details
            </Text>
            <View style={{marginVertical: 20}}>
            <WeatherDetailsRow>
              <WeatherDetailsContent
                title={'Apparent temperature'}
                value={'22°C'}
              />
              <WeatherDetailsContent title={'Visibility'} value={'8 KM'} />
            </WeatherDetailsRow>
            <WeatherDetailsRow>
              <WeatherDetailsContent
                title={'Air Pressure'}
                value={'1014 hpa'}
              />
              <WeatherDetailsContent title={'UV'} value={'weak'} />
            </WeatherDetailsRow>
            <WeatherDetailsRow>
              <WeatherDetailsContent title={'Humidity'} value={'35%'} />
              <WeatherDetailsContent title={'wwv nh'} value={'8 Km/h'} />
            </WeatherDetailsRow>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: horizontalSpace(0.05),
  },
  headerCityName: {
    fontSize: responsiveFont(22),
    fontWeight: '500',
    color: '#fff',
  },
  headerIcons: {
    height: verticalSpace(0.03),
    width: verticalSpace(0.03),
    tintColor: '#fff',
  },
  todayForecastWrapper: {
    height: verticalSpace(0.55),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  todayForecastText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  hourlyForecastList: {
    marginVertical: verticalSpace(0.05),
  },
  hourlyForecastItem: {
    height: 120,
    width: 80,
    justifyContent: 'space-around',
  },
  forecastItemText: {
    color: '#767981',
  },
  forecastItemIcon: {
    height: 25,
    width: 25,
  },
  forecastContainerSheet: {
    width: '100%',
    Height: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 30,
    paddingHorizontal: horizontalSpace(0.05),
    marginBottom: StatusBar.currentHeight,
  },
  customDragIcon: {
    height: 8,
    width: 50,
    backgroundColor: '#6c5dc4',
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 5,
  },
  cell: {
    flex: 1,
  },
});
