import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const MovieCard = props => {
  const {movieId, title, rating, poster, bkgStyle} = props;
  const [moviePoster, setMoviePoster] = React.useState(null);

  React.useEffect(() => {
    setMoviePoster(`http://image.tmdb.org/t/p/w300/${poster}`);
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.9}>
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
          <Text style={{...styles.txt}} numberOfLines={2}>
            {title}
          </Text>
          <Text style={{...styles.txt}}>{rating} ⭐</Text>
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
  txt: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MovieCard;
