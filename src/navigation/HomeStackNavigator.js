import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ViewMoreScreen from '../screens/ViewMoreScreen';
import MovieScreen from '../screens/MovieScreen';
import MovieHeaderIcons from '../components/MovieHeaderIcons';
import CastScreen from '../screens/CastScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = props => {
  const {bkgStyle, isDarkMode, setIsDarkMode, moviesState} = props;

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        children={({navigation}) => (
          <HomeScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            moviesState={moviesState}
            navigation={navigation}
          />
        )}
      />
      <Stack.Screen
        name="About"
        options={{
          title: 'About App',
          headerTintColor: bkgStyle.secTxtColor,
          headerStyle: {
            backgroundColor: bkgStyle.bkgColor,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 18,
            color: bkgStyle.secTxtColor,
          },
        }}
        children={() => (
          <AboutScreen bkgStyle={bkgStyle} isDarkMode={isDarkMode} />
        )}
      />
      <Stack.Screen
        name="ViewMore"
        options={({route}) => {
          return {
            title: route.params.screenTitle,
            headerTintColor: bkgStyle.secTxtColor,
            headerStyle: {
              backgroundColor: bkgStyle.bkgColor,
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
            },
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 18,
              color: bkgStyle.secTxtColor,
            },
          };
        }}
        children={({navigation, route}) => (
          <ViewMoreScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Stack.Screen
        name="Movie"
        options={{
          headerTitle: false,
          headerTintColor: bkgStyle.secTxtColor,
          headerStyle: {
            backgroundColor: bkgStyle.bkgColor,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          },
          headerRightContainerStyle: {
            marginRight: 20,
          },
          headerRight: () => <MovieHeaderIcons />,
        }}
        children={({navigation, route}) => (
          <MovieScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            navigation={navigation}
            movieId={route.params.movieId}
          />
        )}
      />
      <Stack.Screen
        name="Cast"
        options={{
          headerTitle: false,
          headerTintColor: bkgStyle.secTxtColor,
          headerStyle: {
            backgroundColor: bkgStyle.bkgColor,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          },
          headerRightContainerStyle: {
            marginRight: 20,
          },
        }}
        children={({navigation, route}) => (
          <CastScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            navigation={navigation}
            castId={route.params.castId}
            profilePic={route.params.profilePic}
          />
        )}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeStackNavigator;
