import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

import config from '../../config';
import MovieCard from './MovieCard';

const SimilarMoviesSection = props => {
  const {movieId, bkgStyle, navigation} = props;
  const [similarMovies, setSimilarMovies] = React.useState(null);

  const fetchMovies = async () => {
    let url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${config.API_KEY}&language=en-US&page=1`;
    try {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setSimilarMovies(data.results);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchMovies();
  }, []);

  return similarMovies !== null && similarMovies.length !== 0 ? (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={{...styles.title, color: bkgStyle.txtColor}}>
          Similar Movies
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.horizontalScroll}
        showsHorizontalScrollIndicator={false}>
        {similarMovies ? (
          similarMovies.map(item => (
            <MovieCard
              key={item.id}
              movieId={item.id}
              title={item.title}
              rating={item.vote_average}
              poster={item.poster_path}
              bkgStyle={bkgStyle}
              navigation={navigation}
            />
          ))
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                color: bkgStyle.txtColor,
                fontFamily: 'OpenSans-SemiBold',
              }}>
              Loading...
            </Text>
          </View>
        )}
        <View style={styles.paddingRightEnd}></View>
      </ScrollView>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  horizontalScroll: {
    paddingLeft: 10,
    height: 280,
  },
  paddingRightEnd: {
    width: 50,
  },
});

export default SimilarMoviesSection;

/*
TMDb API call for similar movies: 

`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${config.API_KEY}&language=en-US&page=1`
*/
