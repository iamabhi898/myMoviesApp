import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import FavouritesScreen from '../screens/FavouritesScreen';
import MovieScreen from '../screens/MovieScreen';
import MovieHeaderIcons from '../components/MovieHeaderIcons';
import CastScreen from '../screens/CastScreen';
import CastMoviesScreen from '../screens/CastMoviesScreen';

const Stack = createStackNavigator();

const FavouritesStackNavigator = props => {
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
    <Stack.Navigator initialRouteName="Favourites">
      <Stack.Screen
        name="Favourites"
        options={{
          title: 'My Favourites',
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
            marginLeft: 10,
          },
        }}
        children={({navigation, route}) => (
          <FavouritesScreen
            bkgStyle={bkgStyle}
            navigation={navigation}
            route={route}
            favouritesState={favouritesState}
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

export default FavouritesStackNavigator;
