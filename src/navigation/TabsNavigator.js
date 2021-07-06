import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import WatchListScreen from '../screens/WatchListScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

const Tab = createBottomTabNavigator();

const TabsNavigator = props => {
  const {bkgStyle, isDarkMode, setIsDarkMode} = props;
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: 'purple',
        activeBackgroundColor: 'pink',
        labelStyle: {
          fontSize: 14,
          marginBottom: 28,
          fontWeight: 'bold',
        },
        style: {
          ...styles.tabsNavigator,
        },
      }}>
      <Tab.Screen
        name="Home"
        children={() => (
          <HomeScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}
      />
      <Tab.Screen
        name="Search"
        children={() => <SearchScreen bkgStyle={bkgStyle} />}
      />
      <Tab.Screen
        name="WatchList"
        children={() => <WatchListScreen bkgStyle={bkgStyle} />}
      />
      <Tab.Screen
        name="Favourites"
        children={() => <FavouritesScreen bkgStyle={bkgStyle} />}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabsNavigator: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 80,
    //shadow
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
    overflow: 'hidden',
  },
});

export default TabsNavigator;