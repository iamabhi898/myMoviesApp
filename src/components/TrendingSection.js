import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

import MovieCard from './MovieCard';

const TrendingSection = props => {
  const {bkgStyle, movies, navigation} = props;
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={{...styles.title, color: bkgStyle.txtColor}}>
          Trending
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.horizontalScroll}
        showsHorizontalScrollIndicator={false}>
        {movies.map(item => (
          <MovieCard
            key={item.id}
            movieId={item.id}
            title={item.title}
            rating={item.vote_average}
            poster={item.poster_path}
            bkgStyle={bkgStyle}
            navigation={navigation}
          />
        ))}
        <View style={styles.paddingRightEnd}></View>
      </ScrollView>
    </View>
  );
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
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
  },
  horizontalScroll: {
    paddingLeft: 10,
    height: 280,
  },
  paddingRightEnd: {
    width: 50,
  },
});

export default TrendingSection;
