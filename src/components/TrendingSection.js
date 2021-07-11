import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import MovieCard from './MovieCard';

const TrendingSection = props => {
  const {bkgStyle, movies} = props;
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={{...styles.title, color: bkgStyle.txtColor}}>
          Trending
        </Text>
        <Text style={styles.viewMore}>View More</Text>
      </View>
      {movies.map(item => (
        <MovieCard
          key={item.id}
          movieId={item.id}
          title={item.title}
          rating={item.vote_average}
          backdrop={item.backdrop_path}
          poster={item.poster_path}
          bkgStyle={bkgStyle}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // marginBottom: 20,
    paddingLeft: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewMore: {
    color: '#777',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default TrendingSection;
