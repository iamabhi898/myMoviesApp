import React from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import config from '../../config';
import CastKnownForMovies from '../components/CastKnownForMovies';

const CastScreen = props => {
  const {castId, profilePic, bkgStyle, isDarkMode, navigation} = props;
  const [profileImage, setProfileImage] = React.useState(null);
  const [castDetails, setCastDetails] = React.useState(null);
  const [castExternalId, setExternalId] = React.useState(null);
  const [showMoreTxt, setShowMoreTxt] = React.useState(false);
  const [lengthMore, setLengthMore] = React.useState(false);

  const fetchDetails = async castId => {
    let url = `https://api.themoviedb.org/3/person/${castId}?api_key=${config.API_KEY}&language=en-US`;
    try {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setCastDetails(data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExternalId = async castId => {
    let url = `https://api.themoviedb.org/3/person/${castId}/external_ids?api_key=${config.API_KEY}&language=en-US`;
    try {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setExternalId(data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setProfileImage(`https://image.tmdb.org/t/p/w300/${profilePic}`);
    fetchDetails(castId);
    fetchExternalId(castId);
  }, []);

  const toggleShowMoreTxt = () => {
    setShowMoreTxt(!showMoreTxt);
  };

  const onTextLayout = React.useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 6);
  }, []);

  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      {castDetails ? (
        <ScrollView
          contentContainerStyle={{paddingBottom: 90}}
          style={styles.container}>
          {/* Profile Picture */}
          <View style={styles.imageWrapper}>
            <Image source={{uri: profileImage}} style={styles.profileImage} />
          </View>
          {/* Name & Social Media */}
          <View style={styles.nameWrapper}>
            <Text style={{...styles.nameTxt, color: bkgStyle.txtColor}}>
              {castDetails.name}
            </Text>
            {castExternalId !== null ? (
              <View style={styles.socialMediaWrapper}>
                {castExternalId.facebook_id !== null &&
                castExternalId.facebook_id !== '' ? (
                  <Ionicons
                    name="logo-facebook"
                    color={bkgStyle.txtColor}
                    size={28}
                    style={{marginRight: 20}}
                    onPress={async () => {
                      await Linking.openURL(
                        `https://www.facebook.com/${castExternalId.facebook_id}`,
                      );
                    }}
                  />
                ) : null}
                {castExternalId.twitter_id !== null &&
                castExternalId.twitter_id !== '' ? (
                  <Ionicons
                    name="logo-twitter"
                    color={bkgStyle.txtColor}
                    size={28}
                    style={{marginRight: 20}}
                    onPress={async () => {
                      await Linking.openURL(
                        `https://www.twitter.com/${castExternalId.twitter_id}`,
                      );
                    }}
                  />
                ) : null}
                {castExternalId.instagram_id !== null &&
                castExternalId.instagram_id !== '' ? (
                  <Ionicons
                    name="logo-instagram"
                    color={bkgStyle.txtColor}
                    size={28}
                    onPress={async () => {
                      await Linking.openURL(
                        `https://www.instagram.com/${castExternalId.instagram_id}`,
                      );
                    }}
                  />
                ) : null}
              </View>
            ) : null}
          </View>
          {/* Personal Info & Biography */}
          <View style={styles.detailsWrapper}>
            <View style={styles.peronalInfo}>
              <Text style={{...styles.titleTxt, color: bkgStyle.txtColor}}>
                Personal Info
              </Text>
              <Text style={{...styles.subTitleTxt, color: bkgStyle.txtColor}}>
                Known For
              </Text>
              <Text style={{...styles.detailTxt, color: bkgStyle.txtColor}}>
                {castDetails.known_for_department
                  ? castDetails.known_for_department
                  : '      -'}
              </Text>
              <Text style={{...styles.subTitleTxt, color: bkgStyle.txtColor}}>
                Birthdate
              </Text>
              <Text style={{...styles.detailTxt, color: bkgStyle.txtColor}}>
                {castDetails.birthday ? castDetails.birthday : '      -'}
              </Text>
              <Text style={{...styles.subTitleTxt, color: bkgStyle.txtColor}}>
                Place of Birth
              </Text>
              <Text style={{...styles.detailTxt, color: bkgStyle.txtColor}}>
                {castDetails.place_of_birth
                  ? castDetails.place_of_birth
                  : '      -'}
              </Text>
            </View>
            <View style={{...styles.Biography, color: bkgStyle.txtColor}}>
              <Text style={{...styles.titleTxt, color: bkgStyle.txtColor}}>
                Biography
              </Text>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={showMoreTxt ? undefined : 9}
                style={{
                  ...styles.detailTxt,
                  color: bkgStyle.txtColor,
                  marginBottom: 0,
                }}>
                {castDetails.biography ? castDetails.biography : '      -'}
              </Text>
              {lengthMore ? (
                <Text
                  onPress={toggleShowMoreTxt}
                  style={{
                    lineHeight: 24,
                    color: '#777',
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  {showMoreTxt ? 'Read less' : 'Read more...'}
                </Text>
              ) : null}
            </View>
          </View>
          {/* Known For */}
          <CastKnownForMovies
            castId={castId}
            bkgStyle={bkgStyle}
            navigation={navigation}
          />
          {/* Show All Movies */}
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            activeOpacity={0.7}
            onPress={() => {
              navigation.push('CastMovies', {
                castId,
                castName: castDetails.name ? castDetails.name : null,
              });
            }}>
            <Text
              style={{
                lineHeight: 24,
                color: '#777',
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 15,
              }}>
              Show All Movies
            </Text>
          </TouchableOpacity>
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
    width: 180,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  nameWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameTxt: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 26,
    marginBottom: 10,
  },
  socialMediaWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  detailsWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  peronalInfo: {
    marginBottom: 10,
  },
  titleTxt: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 19,
    marginBottom: 10,
  },
  subTitleTxt: {
    fontFamily: 'OpenSans-SemiBold',
  },
  detailTxt: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 8,
  },
});

export default CastScreen;

/*

TMDb API calls => 

for details: 
`https://api.themoviedb.org/3/person/${castId}?api_key=${config.API_KEY}&language=en-US`

for external id: 
`https://api.themoviedb.org/3/person/${castId}/external_ids?api_key=${config.API_KEY}&language=en-US`

*/
