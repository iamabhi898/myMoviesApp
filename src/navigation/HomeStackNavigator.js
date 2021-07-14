import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ViewMoreScreen from '../screens/ViewMoreScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = props => {
  const {bkgStyle, isDarkMode, setIsDarkMode, moviesState} = props;

  return (
    <Stack.Navigator>
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
            fontWeight: 'bold',
            color: bkgStyle.secTxtColor,
          },
        }}
        headerShown={false}
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
              fontWeight: 'bold',
              color: bkgStyle.secTxtColor,
            },
          };
        }}
        headerShown={false}
        children={({navigation, route}) => (
          <ViewMoreScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            navigation={navigation}
            route={route}
          />
        )}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeStackNavigator;
