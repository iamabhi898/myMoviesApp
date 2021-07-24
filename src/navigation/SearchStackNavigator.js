import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from '../screens/SearchScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import MovieScreen from '../screens/MovieScreen';
import MovieHeaderIcons from '../components/MovieHeaderIcons';
import CastScreen from '../screens/CastScreen';
import CastMoviesScreen from '../screens/CastMoviesScreen';

const Stack = createStackNavigator();

const SearchStackNavigator = props => {
  const {
    bkgStyle,
    isDarkMode,
    handleAddWatchList,
    handleAddFavourites,
    handleRemoveWatchList,
    handleRemoveFavourites,
    watchListState,
    favouritesState,
  } = props;

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
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 18,
            color: bkgStyle.secTxtColor,
          },
        }}
        children={({navigation, route}) => (
          <DiscoverScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            navigation={navigation}
          />
        )}
      />
      <Stack.Screen
        name="Movie"
        options={({route}) => ({
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
          headerRight: () => (
            <MovieHeaderIcons
              movieId={route.params.movieId}
              movieTitle={route.params.title}
              handleAddWatchList={handleAddWatchList}
              handleAddFavourites={handleAddFavourites}
              handleRemoveWatchList={handleRemoveWatchList}
              handleRemoveFavourites={handleRemoveFavourites}
              watchListState={watchListState}
              favouritesState={favouritesState}
            />
          ),
        })}
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
      <Stack.Screen
        name="CastMovies"
        options={{
          headerTitle: false,
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
        children={({navigation, route}) => (
          <CastMoviesScreen
            castId={route.params.castId}
            castName={route.params.castName}
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
