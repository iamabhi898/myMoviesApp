import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

import config from '../../config';
import CastCard from './CastCard';

const CastSection = props => {
  const {movieId, bkgStyle, navigation} = props;
  const [casts, setCasts] = React.useState(null);

  const fetchCast = async () => {
    let url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${config.API_KEY}&language=en-US`;
    try {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setCasts(data.cast.slice(0, 20));
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchCast();
  }, []);

  return casts !== null && casts.length !== 0 ? (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={{...styles.title, color: bkgStyle.txtColor}}>Cast</Text>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.horizontalScroll}
        showsHorizontalScrollIndicator={false}>
        {casts ? (
          casts.map(item => (
            <CastCard
              key={item.id}
              castId={item.id}
              name={item.name}
              profilePic={item.profile_path}
              character={item.character}
              bkgStyle={bkgStyle}
              navigation={navigation}
            />
          ))
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                color: bkgStyle.txtColor,
                fontFamily: 'OpenSans-SemiBold',
              }}>
              Loading...
            </Text>
          </View>
        )}
        <View style={styles.paddingRightEnd}></View>
      </ScrollView>
    </View>
  ) : null;
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
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  horizontalScroll: {
    paddingLeft: 10,
    height: 250,
  },
  paddingRightEnd: {
    width: 50,
  },
});

export default CastSection;

/*
TMDb API call for Cast: 

`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${config.API_KEY}&language=en-US`
*/
