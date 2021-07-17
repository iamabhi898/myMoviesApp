import React from 'react';
import {View, Text, TextInput, FlatList, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MovieCard from '../components/MovieCard';
import config from '../../config';

const SearchScreen = props => {
  const {bkgStyle, navigation, route} = props;
  const [inputValue, setInputValue] = React.useState(null);
  const [searchFlag, setSearchFlag] = React.useState(false);
  const [pgNum, setPgNum] = React.useState(1);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [isFoundResults, setIsFoundResults] = React.useState(true);
  const [isDiscover, setIsDiscover] = React.useState(false);
  const [genreIds, setGenreIds] = React.useState('');

  const fetchMovies = async (setSearchedMovies, inputText, pgNum) => {
    let url = !isDiscover
      ? `https://api.themoviedb.org/3/search/movie?api_key=${config.API_KEY}&language=en-US&query=${inputText}&page=${pgNum}&include_adult=false`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${
          config.API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pgNum}&with_genres=${
          genreIds !== '' ? genreIds : null
        }`;
    try {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setSearchedMovies(state => {
            let movies = data.results;
            return [...state, ...movies];
          });
          if (data.results.length === 0) {
            setIsFoundResults(false);
          } else if (data.results.length !== 0) {
            setIsFoundResults(true);
          }
          setSearchFlag(false);
          if (pgNum < 100) {
            setPgNum(state => state + 1);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchedMovies = () => {
    setIsDiscover(false);
    setSearchFlag(false);
    setPgNum(1);
    setSearchedMovies([]);
  };

  const handlefetch = () => {
    setIsDiscover(false);
    setSearchFlag(true);
    setPgNum(1);
    setSearchedMovies([]);
  };

  React.useEffect(() => {
    if (searchFlag && pgNum === 1 && searchedMovies.length === 0) {
      fetchMovies(setSearchedMovies, inputValue, pgNum);
    }
  }, [pgNum, searchedMovies]);

  React.useEffect(() => {
    if (route.params !== undefined) {
      if (route.params.genreIds.length !== 0) {
        setIsDiscover(true);
        setGenreIds(route.params.genreIds);
        setSearchFlag(true);
        setPgNum(1);
        setSearchedMovies([]);
        setInputValue(null);
        setIsFoundResults(true); // just to disappear the sorry text
      }
    }
  }, [route]);

  const renderMovieItem = ({item}) => {
    return (
      <MovieCard
        key={item.id}
        movieId={item.id}
        title={item.title}
        rating={item.vote_average}
        poster={item.poster_path}
        bkgStyle={bkgStyle}
      />
    );
  };

  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      <View
        style={{
          ...styles.textInputWrapper,
          backgroundColor: bkgStyle.secBkgColor,
        }}>
        <Ionicons name={'search-outline'} color={'#888'} size={26} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={bkgStyle.placeholderColor}
          selectionColor={'#888'}
          returnKeyType={'search'}
          value={inputValue}
          onChangeText={value => {
            setInputValue(value);
          }}
          onSubmitEditing={() => {
            setIsFoundResults(true); // just to disappear the sorry text
            if (inputValue !== null) {
              inputValue.length === 0 ? handleSearchedMovies() : handlefetch();
            }
          }}
          style={{...styles.textInput, color: bkgStyle.secTxtColor}}
        />
        <Ionicons
          name={'color-filter-outline'}
          color={'#888'}
          size={26}
          onPress={() => {
            navigation.navigate('Discover');
          }}
        />
      </View>
      {!isFoundResults && searchedMovies.length === 0 ? (
        <View style={{position: 'absolute', top: 150}}>
          <Text
            style={{
              color: bkgStyle.placeholderColor,
              fontSize: 28,
              fontWeight: 'bold',
            }}>
            <Ionicons name={'search'} color={'#888'} size={24} /> Sorry,
          </Text>
          <Text
            style={{
              color: bkgStyle.placeholderColor,
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 30,
            }}>
            no results found.
          </Text>
        </View>
      ) : null}
      <View style={styles.flatlistWrapper}>
        <FlatList
          data={searchedMovies}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderMovieItem}
          contentContainerStyle={styles.flatlistContainer}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            fetchMovies(setSearchedMovies, inputValue, pgNum);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  textInputWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    height: 50,
    width: '90%',
    marginVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    //shadow
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginHorizontal: '3%',
    width: '80%',
  },
  flatlistWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    paddingTop: 90,
    paddingBottom: 200,
    justifyContent: 'space-between',
  },
});

export default SearchScreen;
