import React from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';

import TrendingSection from '../components/TrendingSection';
import UpcomingSection from '../components/UpcomingSection';
import PopularSection from '../components/PopularSection';
import TopRatedSection from '../components/TopRatedSection';

const HomeScreen = props => {
  const {bkgStyle, isDarkMode, setIsDarkMode, moviesState} = props;
  return (
    <ScrollView style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      <TrendingSection bkgStyle={bkgStyle} movies={moviesState.trending} />
      <UpcomingSection bkgStyle={bkgStyle} movies={moviesState.upcoming} />
      <PopularSection bkgStyle={bkgStyle} movies={moviesState.popular} />
      <TopRatedSection bkgStyle={bkgStyle} movies={moviesState.topRated} />
      {/* <View style={styles.button}>
        <Button
          title={isDarkMode ? 'Light' : 'Dark'}
          onPress={() => setIsDarkMode(!isDarkMode)}
          color={'gray'}
        />
      </View> */}
      <View style={styles.padding}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    right: 180,
    top: 0,
  },
  padding: {
    paddingBottom: 100,
  },
});

export default HomeScreen;
