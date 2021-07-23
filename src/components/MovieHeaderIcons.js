import React from 'react';
import {View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MovieHeaderIcons = props => {
  const {
    movieId,
    handleAddWatchList,
    handleAddFavourites,
    handleRemoveWatchList,
    handleRemoveFavourites,
    watchListState,
    favouritesState,
  } = props;

  const [isWatchListed, setIsWatchListed] = React.useState(false);
  const [isFavourited, setIsFavourited] = React.useState(false);

  const handleWatchListMovie = () => {
    let findFlag = false;
    watchListState.forEach(item => {
      if (item === movieId) {
        handleRemoveWatchList(movieId);
        findFlag = true;
        return;
      }
    });
    if (!findFlag) {
      handleAddWatchList(movieId);
    }
  };

  const handleFavouritesMovie = () => {
    let findFlag = false;
    favouritesState.forEach(item => {
      if (item === movieId) {
        handleRemoveFavourites(movieId);
        findFlag = true;
        return;
      }
    });
    if (!findFlag) {
      handleAddFavourites(movieId);
    }
  };

  React.useState(() => {
    watchListState.forEach(item => {
      if (item === movieId) {
        setIsWatchListed(true);
      }
    });
    favouritesState.forEach(item => {
      if (item === movieId) {
        setIsFavourited(true);
      }
    });
  }, []);

  return (
    <View style={styles.iconsWrapper}>
      <Ionicons
        name={isWatchListed ? 'bookmark' : 'bookmark-outline'}
        style={{...styles.icon}}
        color={isWatchListed ? '#9470ff' : 'gray'}
        size={26}
        onPress={() => {
          setIsWatchListed(!isWatchListed);
          handleWatchListMovie();
        }}
      />
      <Ionicons
        name={isFavourited ? 'heart' : 'heart-outline'}
        style={{...styles.icon}}
        color={isFavourited ? '#ff7070' : 'gray'}
        size={28}
        onPress={() => {
          setIsFavourited(!isFavourited);
          handleFavouritesMovie();
        }}
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
