import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'intl'; // USD conversion
import 'intl/locale-data/jsonp/en';

import config from '../../config';
import CastSection from '../components/CastSection';
import SimilarMoviesSection from '../components/SimilarMoviesSection';

const MovieScreen = props => {
  const {bkgStyle, isDarkMode, navigation, movieId} = props;
  const [movieState, setMovieState] = React.useState(null);
  const [moviePoster, setMoviePoster] = React.useState(null);
  const [movieBackdrop, setMovieBackdrop] = React.useState(null);
  const [showMoreTxt, setShowMoreTxt] = React.useState(false);

  const fetchMovie = async movieId => {
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.API_KEY}&language=en-US`;
    try {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setMovieState(data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchMovie(movieId);
  }, []);

  React.useEffect(() => {
    if (movieState !== null) {
      setMoviePoster(
        `http://image.tmdb.org/t/p/w200/${movieState.poster_path}`,
      );
      setMovieBackdrop(
        `http://image.tmdb.org/t/p/w500/${movieState.backdrop_path}`,
      );
    }
  }, [movieState]);

  const getRatingTxtColor = rating => {
    if (rating >= 6.5) {
      return '#03fc3d';
    } else if (rating >= 4 && rating < 6.5) {
      return 'yellow';
    } else if (rating === 0) {
      return '#999';
    } else if (0 < rating < 4) {
      return '#fc3d03';
    }
  };

  const getReleaseDate = releaseDate => {
    return (
      releaseDate.slice(8) +
      '/' +
      releaseDate.slice(5, 7) +
      '/' +
      releaseDate.slice(0, 4)
    );
  };

  const getRuntime = runtime => {
    return Math.floor(runtime / 60) + 'h ' + (runtime % 60) + 'm';
  };

  const getGenres = genres => {
    let result = '';
    genres.map(item => {
      result += item.name + ', ';
    });
    return result.slice(0, -2);
  };

  const getOriginalLanguage = (lanCode, spokenLan) => {
    let lan = '';
    spokenLan.forEach(item => {
      if (item.iso_639_1 === lanCode) {
        lan += item.english_name;
      }
    });
    if (lan.length !== 0) {
      return lan;
    } else {
      return '      -';
    }
  };

  const toggleShowMoreTxt = () => {
    setShowMoreTxt(!showMoreTxt);
  };

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      {movieState ? (
        <ScrollView
          contentContainerStyle={{paddingBottom: 90}}
          style={styles.container}>
          {/* Movie Poster */}
          <View
            style={{
              ...styles.imageWrapper,
            }}>
            <Image source={{uri: moviePoster}} style={styles.posterImage} />
            <Image
              source={{uri: movieBackdrop}}
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                width: '90%',
                height: '100%',
              }}
            />
            <LinearGradient
              style={{...styles.linearGradientVertical}}
              colors={bkgStyle.backdropGradient}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
            />
            <LinearGradient
              style={{...styles.linearGradientHorizontal}}
              colors={bkgStyle.backdropGradient}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
            />
          </View>
          {/* Movie Title */}
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: '5%',
            }}>
            <Text
              style={{...styles.titleTxt, color: bkgStyle.txtColor}}
              numberOfLines={2}>
              {movieState.title}
              <Text style={{fontFamily: 'Roboto-Light', fontSize: 16}}>
                {' '}
                ({movieState.release_date.slice(0, 4)})
              </Text>
            </Text>
          </View>
          {/* Rating & Trailer */}
          <View style={styles.ratingTrailerContainer}>
            <View style={styles.ratingContainer}>
              <View
                style={{
                  ...styles.ratingWrapper,
                  borderColor: getRatingTxtColor(movieState.vote_average),
                  backgroundColor: '#000354',
                }}>
                {movieState.vote_average !== 0 ? (
                  <Text
                    style={{
                      ...styles.ratingTxt,
                      color: 'white',
                    }}>
                    {movieState.vote_average * 10}
                    <Text style={{fontSize: 10}}>%</Text>
                  </Text>
                ) : (
                  <Text
                    style={{
                      ...styles.ratingTxt,
                      color: 'white',
                    }}>
                    NR
                  </Text>
                )}
              </View>
              <Text
                style={{
                  ...styles.ratingTxt,
                  color: bkgStyle.txtColor,
                  fontSize: 14,
                }}>
                User Score
              </Text>
            </View>
            <View style={styles.verticalBorder}></View>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{paddingVertical: 5}}
              onPress={() => {}}>
              <View style={styles.trailerContainer}>
                <Ionicons name="play" color={bkgStyle.txtColor} size={20} />
                <Text
                  style={{
                    color: bkgStyle.txtColor,
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 14,
                  }}>
                  {' '}
                  Play Trailer
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Release Date, Runtime & Genres */}
          <View
            style={{
              ...styles.detailsContainer,
              backgroundColor: bkgStyle.secBkgColor,
            }}>
            <View style={styles.releaseAndRuntime}>
              <Text style={{...styles.detailsTxt, color: bkgStyle.txtColor}}>
                {getReleaseDate(movieState.release_date)}{' '}
                <Text style={{fontSize: 16}}> | </Text>{' '}
                {getRuntime(movieState.runtime)}
              </Text>
            </View>
            <Text style={{...styles.detailsTxt, color: bkgStyle.txtColor}}>
              {getGenres(movieState.genres)}
            </Text>
          </View>
          {/* TagLine */}
          {movieState.tagline ? (
            <View
              style={{width: '90%', alignSelf: 'center', paddingVertical: 10}}>
              <Text
                numberOfLines={2}
                style={{
                  color: '#777',
                  fontFamily: 'OpenSans-SemiBoldItalic',
                  fontSize: 14,
                }}>
                {movieState.tagline}
              </Text>
            </View>
          ) : null}
          {/* Overview */}
          <View style={{width: '90%', alignSelf: 'center', marginTop: 8}}>
            <Text
              style={{
                color: bkgStyle.txtColor,
                fontFamily: 'OpenSans-Bold',
                fontSize: 18,
                marginBottom: 10,
              }}>
              Overview
            </Text>
            <Text
              numberOfLines={showMoreTxt ? undefined : 6}
              style={{
                color: bkgStyle.txtColor,
                fontFamily: 'OpenSans-Regular',
                fontSize: 13,
              }}>
              {movieState.overview}
            </Text>
            <Text
              onPress={toggleShowMoreTxt}
              style={{
                lineHeight: 24,
                color: '#777',
                fontFamily: 'OpenSans-SemiBold',
              }}>
              {showMoreTxt ? 'Read less' : 'Read more...'}
            </Text>
          </View>
          {/* Cast Section */}
          <CastSection
            movieId={movieId}
            bkgStyle={bkgStyle}
            navigation={navigation}
          />
          {/* Similar Movies */}
          <SimilarMoviesSection
            movieId={movieId}
            bkgStyle={bkgStyle}
            navigation={navigation}
          />
          {/* details - footer */}
          <View style={styles.footerDetails}>
            <View style={styles.footerChildren}>
              <Text
                style={{
                  color: bkgStyle.txtColor,
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                Original Title
              </Text>
              <Text
                style={{
                  color: bkgStyle.txtColor,
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 13,
                }}>
                {movieState.original_title
                  ? movieState.original_title
                  : '      -'}
              </Text>
            </View>
            <View style={styles.footerChildren}>
              <Text
                style={{
                  color: bkgStyle.txtColor,
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                Status
              </Text>
              <Text
                style={{
                  color: bkgStyle.txtColor,
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 13,
                }}>
                {movieState.status ? movieState.status : '      -'}
              </Text>
            </View>
            <View style={styles.footerChildren}>
              <Text
                style={{
                  color: bkgStyle.txtColor,
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                Original Language
              </Text>
              <Text
                style={{
                  color: bkgStyle.txtColor,
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 13,
                }}>
                {getOriginalLanguage(
                  movieState.original_language,
                  movieState.spoken_languages,
                )}
              </Text>
            </View>
            <View style={styles.footerChildren}>
              <Text
                style={{
                  color: bkgStyle.txtColor,
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                Budget
              </Text>
              <Text
                style={{
                  color: bkgStyle.txtColor,
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 13,
                }}>
                {movieState.status === 'Released' && movieState.budget !== 0
                  ? formatter.format(movieState.budget)
                  : '      -'}
              </Text>
            </View>
            <View style={styles.footerChildren}>
              <Text
                style={{
                  color: bkgStyle.txtColor,
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                Revenue
              </Text>
              <Text
                style={{
                  color: bkgStyle.txtColor,
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 13,
                }}>
                {movieState.status === 'Released' && movieState.revenue !== 0
                  ? formatter.format(movieState.revenue)
                  : '      -'}
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text
          style={{
            color: bkgStyle.txtColor,
            fontFamily: 'Roboto-Regular',
            fontSize: 16,
          }}>
          Loading...
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
  container: {
    width: '100%',
  },
  imageWrapper: {
    width: '100%',
    height: 220,
  },
  posterImage: {
    zIndex: 1,
    position: 'absolute',
    width: '26%',
    height: '80%',
    borderRadius: 8,
    top: '10%',
    left: 10,
  },
  linearGradientVertical: {
    position: 'absolute',
    alignSelf: 'flex-start',
    width: '25%',
    height: 240,
    bottom: 0,
    left: '10%',
  },
  linearGradientHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 50,
    bottom: 0,
  },
  titleTxt: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  ratingTrailerContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'pink',
    width: '100%',
    height: 100,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'lightgreen',
  },
  ratingWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 3,
    marginRight: 10,
  },
  ratingTxt: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'OpenSans-Bold',
  },
  trailerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalBorder: {
    width: 1,
    height: '30%',
    backgroundColor: '#888',
  },
  detailsContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsTxt: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
  },
  footerDetails: {
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  footerChildren: {
    marginVertical: 5,
  },
});

export default MovieScreen;

/*

TMDb api call for finding movie by id: 

`https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.API_KEY}&language=en-US`

*/
