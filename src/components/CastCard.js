import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const CastCard = props => {
  const {castId, name, profilePic, character, bkgStyle, navigation} = props;
  const [profileImage, setProfileImage] = React.useState(null);

  React.useEffect(() => {
    setProfileImage(`https://image.tmdb.org/t/p/w200/${profilePic}`);
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        navigation.push('Cast', {castId, profilePic});
      }}>
      <View
        style={{...styles.cardWrapper, backgroundColor: bkgStyle.secBkgColor}}>
        <View style={styles.image}>
          <Image
            source={{uri: profileImage}}
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
            {name}
          </Text>
          <Text style={{...styles.detailTxt}} numberOfLines={2}>
            {character}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    width: 160,
    height: 200,
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingTop: 0,
    width: '100%',
    bottom: 0,
  },
  titleTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
  detailTxt: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Roboto-Light',
  },
});

export default CastCard;
