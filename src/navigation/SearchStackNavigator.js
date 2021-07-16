import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from '../screens/SearchScreen';
import DiscoverScreen from '../screens/DiscoverScreen';

const Stack = createStackNavigator();

const SearchStackNavigator = props => {
  const {bkgStyle, isDarkMode} = props;

  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        options={{
          headerShown: false,
        }}
        children={({navigation, route}) => (
          <SearchScreen
            bkgStyle={bkgStyle}
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Stack.Screen
        name="Discover"
        options={{
          title: 'Discover',
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
        children={({navigation, route}) => (
          <DiscoverScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            navigation={navigation}
          />
        )}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default SearchStackNavigator;
