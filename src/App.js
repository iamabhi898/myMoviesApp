import React from 'react';
// import type {Node} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import config from '../config';

import TabsNavigator from './navigation/TabsNavigator';
// import API_KEY from '../.env';

const App = () => {
  // Theme - Coloring
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const bkgStyle = {
    bkgColor: isDarkMode ? '#050505' : '#EBEBEB',
    secBkgColor: isDarkMode ? '#221F3B' : 'white',
    txtColor: isDarkMode ? '#EBEBEB' : '#050505',
  };

  const [moviesTitle, setMoviesTitle] = React.useState([]);

  // Movies API
  const fetchMoviesTitles = () => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${config.API_KEY}`,
    )
      .then(response => response.json())
      .then(data => {
        data.results.map(item =>
          setMoviesTitle(state => [
            ...state,
            item.original_title || item.original_name,
          ]),
        );
      });
  };

  React.useEffect(() => {
    fetchMoviesTitles();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={bkgStyle.bkgColor}
      />
      <TabsNavigator
        bkgStyle={bkgStyle}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        moviesTitle={moviesTitle}
      />
    </NavigationContainer>
  );
};

// Color Palette
// purple : #6F4A8E
// gray : #221F3B
// black : #050505
// white : #EBEBEB

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
