import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const MovieCarousel = props => {
  const {movies, bkgStyle, isDarkMode, navigation} = props;
  let topMovies = movies.slice(0, 5);

  const getPosterPath = poster => `http://image.tmdb.org/t/p/w500/${poster}`;

  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, vw);

  return (
    <View>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        style={{...styles.wrapper, width: vw, height: vh * 0.25}}>
        {topMovies.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            onPress={() => {}}>
            <View style={{...styles.imageWrapper, width: vw}}>
              <Image
                source={{uri: getPosterPath(item.backdrop_path)}}
                style={{...styles.image, height: '100%', width: vw * 0.9}}
              />
              <View
                style={{
                  ...styles.details,
                  backgroundColor: bkgStyle.cardBlurBkg,
                }}>
                <Text style={{...styles.txt}} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.dotView}>
        {topMovies.map((item, i) => {
          let opacity = position.interpolate({
            inputRange: [i - 2, i - 1, i, i + 1, i + 2],
            outputRange: [0.4, 0.4, 1, 0.4, 0.4],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={{
                opacity,
                height: 6,
                width: 6,
                backgroundColor: '#888',
                margin: 5,
                borderRadius: 5,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  details: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: vw * 0.9,
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  txt: {
    fontSize: 13,
    color: 'white',
    fontFamily: 'Roboto-Regular',
  },
});

export default MovieCarousel;
