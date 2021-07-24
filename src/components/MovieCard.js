import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const MovieCard = props => {
  const {movieId, title, rating, poster, bkgStyle, navigation} = props;
  const [moviePoster, setMoviePoster] = React.useState(null);

  React.useEffect(() => {
    setMoviePoster(`https://image.tmdb.org/t/p/w300/${poster}`);
  }, []);

  const getRatingTxtColor = rating => {
    if (rating >= 6.5) {
      return '#03fc3d';
    } else if (rating >= 4 && rating < 6.5) {
      return 'yellow';
    } else if (rating < 4) {
      return '#fc3d03';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        navigation.push('Movie', {movieId, title});
      }}>
      <View
        style={{...styles.cardWrapper, backgroundColor: bkgStyle.secBkgColor}}>
        <View style={styles.image}>
          <Image
            source={{uri: moviePoster}}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View
          style={{...styles.details, backgroundColor: bkgStyle.cardBlurBkg}}>
          <Text style={{...styles.titleTxt}} numberOfLines={2}>
            {title}
          </Text>
          {rating === 0 ? null : (
            <View
              style={{
                ...styles.ratingWrapper,
                borderColor: getRatingTxtColor(rating),
                backgroundColor: bkgStyle.cardBlurBkg,
              }}>
              <Text style={{...styles.titleTxt, color: 'white'}}>
                {Math.floor(rating * 10)}
                <Text style={{fontSize: 8}}>%</Text>
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    width: 160,
    height: 260,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    //shadow
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
  },
  image: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  details: {
    position: 'absolute',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
    bottom: 0,
  },
  ratingWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 6,
    top: -25,
    height: 34,
    width: 34,
    borderRadius: 17,
    borderWidth: 1.4,
  },
  titleTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
});

export default MovieCard;
