import React from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';

import MovieCarousel from '../components/MovieCarousel';
import TrendingSection from '../components/TrendingSection';
import UpcomingSection from '../components/UpcomingSection';
import PopularSection from '../components/PopularSection';
import TopRatedSection from '../components/TopRatedSection';

const HomeScreen = props => {
  const {bkgStyle, isDarkMode, setIsDarkMode, moviesState} = props;
  return (
    <ScrollView style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      <View style={styles.header}>
        <Text style={styles.title}>My Movies</Text>
      </View>
      <MovieCarousel
        bkgStyle={bkgStyle}
        isDarkMode={isDarkMode}
        movies={moviesState.trending}
      />
      <TrendingSection bkgStyle={bkgStyle} movies={moviesState.trending} />
      <UpcomingSection bkgStyle={bkgStyle} movies={moviesState.upcoming} />
      <PopularSection bkgStyle={bkgStyle} movies={moviesState.popular} />
      <TopRatedSection bkgStyle={bkgStyle} movies={moviesState.topRated} />
      <View style={styles.button}>
        <Button
          title={isDarkMode ? 'Light' : 'Dark'}
          onPress={() => setIsDarkMode(!isDarkMode)}
          color={'gray'}
        />
      </View>
      <View style={styles.padding}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: '#6F4A8E',
  },
  button: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  padding: {
    paddingBottom: 90,
  },
});

export default HomeScreen;
