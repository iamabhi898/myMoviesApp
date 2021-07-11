import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const PopularSection = props => {
  const {bkgStyle, movies} = props;
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={{...styles.title, color: bkgStyle.txtColor}}>Popular</Text>
        <Text style={styles.viewMore}>View More</Text>
      </View>
      {movies
        ? movies.map(item => (
            <Text
              style={{color: bkgStyle.txtColor, fontWeight: 'bold'}}
              key={item.title}>
              {item.title}
            </Text>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // marginBottom: 20,
    paddingLeft: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewMore: {
    color: '#777',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default PopularSection;
