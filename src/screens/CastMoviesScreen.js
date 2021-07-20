import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

import config from '../../config';
import MovieCard from '../components/MovieCard';

const CastMoviesScreen = props => {
  const {castId, castName, bkgStyle, isDarkMode, navigation} = props;
  const [allMovies, setAllMovies] = React.useState(null);

  // TMDB API
  const fetchMovies = async () => {
    let url = `https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${config.API_KEY}&language=en-US`;
    try {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          data.cast ? setAllMovies(data.cast) : setAllMovies(undefined);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchMovies();
  }, []);

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
      <View style={styles.flatlistWrapper}>
        {allMovies !== undefined ? (
          <View>
            <Text style={styles.title}>Movies starring {castName}</Text>
            <FlatList
              data={allMovies}
              numColumns={2}
              keyExtractor={item => item.id}
              renderItem={renderMovieItem}
              contentContainerStyle={styles.flatlistContainer}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <Text style={styles.txt}>No Results Found</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    maxWidth: '80%',
    marginHorizontal: 15,
    paddingVertical: 10,
    color: '#888',
  },
  flatlistWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    paddingTop: 20,
    paddingBottom: 200,
    justifyContent: 'space-between',
  },
  txt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#888',
  },
});

export default CastMoviesScreen;

/*
TMDb API call for cast's all movies: 

`https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${config.API_KEY}language=en-US`
*/
