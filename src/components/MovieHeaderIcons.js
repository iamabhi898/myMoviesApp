import React from 'react';
import {View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MovieHeaderIcons = props => {
  const [isWatchListed, setIsWatchListed] = React.useState(false);
  const [isFavourited, setIsFavourited] = React.useState(false);

  return (
    <View style={styles.iconsWrapper}>
      <Ionicons
        name={isWatchListed ? 'bookmark' : 'bookmark-outline'}
        style={{...styles.icon}}
        color={isWatchListed ? '#9470ff' : 'gray'}
        size={26}
        onPress={() => setIsWatchListed(!isWatchListed)}
      />
      <Ionicons
        name={isFavourited ? 'heart' : 'heart-outline'}
        style={{...styles.icon}}
        color={isFavourited ? '#ff7070' : 'gray'}
        size={28}
        onPress={() => setIsFavourited(!isFavourited)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
    marginHorizontal: 5,
  },
});

export default MovieHeaderIcons;
