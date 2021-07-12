import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import WatchListScreen from '../screens/WatchListScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

const Tab = createBottomTabNavigator();

const TabsNavigator = props => {
  const {bkgStyle, isDarkMode, setIsDarkMode, moviesState} = props;
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        inactiveTintColor: isDarkMode ? '#555' : '#999',
        activeTintColor: isDarkMode ? 'white' : '#6930C3',
        keyboardHidesTabBar: true,
        style: {
          ...styles.tabsNavigator,
          backgroundColor: bkgStyle.secBkgColor,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({color, focused}) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} color={color} size={26} />;
          },
        }}
        children={() => (
          <HomeScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            moviesState={moviesState}
          />
        )}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({color, focused}) => {
            let iconName = focused ? 'search' : 'search-outline';
            return <Ionicons name={iconName} color={color} size={28} />;
          },
        }}
        children={() => <SearchScreen bkgStyle={bkgStyle} />}
      />
      <Tab.Screen
        name="WatchList"
        options={{
          tabBarIcon: ({color, focused}) => {
            let iconName = focused ? 'bookmarks' : 'bookmarks-outline';
            return <Ionicons name={iconName} color={color} size={26} />;
          },
        }}
        children={() => <WatchListScreen bkgStyle={bkgStyle} />}
      />
      <Tab.Screen
        name="Favourites"
        options={{
          tabBarIcon: ({color, focused}) => {
            let iconName = focused ? 'heart' : 'heart-outline';
            return <Ionicons name={iconName} color={color} size={26} />;
          },
        }}
        children={() => <FavouritesScreen bkgStyle={bkgStyle} />}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabsNavigator: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    borderRadius: 30,
    borderTopWidth: 0,
    height: 55,
    //shadow
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
