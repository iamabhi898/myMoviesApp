import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

import config from '../../config';
import MovieCard from '../components/MovieCard';

const ViewMoreScreen = props => {
  const {bkgStyle, isDarkMode, navigation, route} = props;
  const [allMovies, setAllMovies] = React.useState([]);
  const [pgNum, setPgNum] = React.useState(2);

  // TMDB API
  const fetchMovies = async (setAllMovies, category, pgNum) => {
    let url;

    switch (category) {
      case 'Upcoming':
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${config.API_KEY}&language=en-US&page=${pgNum}`;
        break;
      case 'Popular':
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${config.API_KEY}&language=en-US&page=${pgNum}`;
        break;
      case 'Top Rated':
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${config.API_KEY}&language=en-US&page=${pgNum}`;
        break;
      default:
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${config.API_KEY}&language=en-US&page=${pgNum}`;
    }

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setAllMovies(state => {
          let movies = data.results;
          switch (category) {
            case 'Upcoming':
              return [...state, ...movies];
            case 'Popular':
              return [...state, ...movies];
            case 'Top Rated':
              return [...state, ...movies];
            default:
              return [...state];
          }
        });
      })
      .catch(error => {
        console.log(error);
      });

    if (pgNum < 100) {
      setPgNum(state => state + 1);
    }
  };

  React.useEffect(() => {
    setAllMovies(state => [...state, ...route.params.movies]);
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
        <FlatList
          data={allMovies}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderMovieItem}
          contentContainerStyle={styles.flatlistContainer}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            fetchMovies(setAllMovies, route.params.screenTitle, pgNum);
          }}
        />
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
});

export default ViewMoreScreen;
