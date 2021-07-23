import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import MovieCard from '../components/MovieCard';
import config from '../../config';

const FavouritesScreen = props => {
  const {bkgStyle, navigation, favouritesState} = props;

  const [favouritesMovies, setFavouritesMovies] = React.useState([]);

  const fetchMovies = async movieId => {
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.API_KEY}&language=en-US`;
    try {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setFavouritesMovies(state => [data, ...state]);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (
      favouritesMovies.length === 0 ||
      favouritesMovies.length !== favouritesState.length
    ) {
      setFavouritesMovies([]);
      favouritesState.forEach(item => {
        fetchMovies(item);
      });
    }
  }, [favouritesState]);

  const renderMovieItem = ({item}) => {
    return (
      <MovieCard
        key={item.id}
        movieId={item.id}
        title={item.title}
        rating={item.vote_average}
        poster={item.poster_path}
        bkgStyle={bkgStyle}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      {favouritesMovies.length !== 0 ? (
        <View style={styles.flatlistWrapper}>
          <FlatList
            data={favouritesMovies}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={renderMovieItem}
            contentContainerStyle={styles.flatlistContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <Text
          style={{
            color: bkgStyle.txtColor,
            fontFamily: 'OpenSans-Regular',
            fontSize: 13,
          }}>
          Your Favourites will be shown here.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    paddingTop: 20,
    paddingBottom: 150,
    justifyContent: 'space-between',
  },
});

export default FavouritesScreen;
