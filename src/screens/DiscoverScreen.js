import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import config from '../../config';
import GenreView from '../components/GenreView';

const DiscoverScreen = props => {
  const {bkgStyle, isDarkMode, navigation} = props;
  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      <ScrollView
        style={{width: '90%', paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleWrapper}>
          <Ionicons name="search-circle" size={35} color={bkgStyle.txtColor} />
          <Text style={{...styles.title, color: bkgStyle.txtColor}}>
            Discover movies by genre
          </Text>
        </View>
        <View style={styles.genreListWrapper}>
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Action"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Adventure"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Animation"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Comedy"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Crime"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Documentary"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Drama"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Family"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Fantasy"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="History"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Horror"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Music"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Mystery"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Romance"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Science Fiction"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Thriller"
          />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="TV Movie"
          />
          <GenreView bkgStyle={bkgStyle} isDarkMode={isDarkMode} genre="War" />
          <GenreView
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            genre="Western"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.goBack();
          }}>
          <View
            style={{
              ...styles.searchButton,
              backgroundColor: bkgStyle.secBkgColor,
            }}>
            <Ionicons name="search" color={bkgStyle.searchIcon} size={40} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    width: '90%',
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  genreListWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  searchButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    height: 80,
    width: 80,
    borderRadius: 40,
    // shadow
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
  },
});

export default DiscoverScreen;

/*
TMDb API call be genre ids: 

`https://api.themoviedb.org/3/discover/movie?api_key=${config.API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${pgNum}&with_genres=&{genreIds}`

Genre id's:

Action = 28, Adventure = 12, Animation = 16, Comedy = 35, Crime = 80,
Documentary = 99, Drama = 18, Family = 10751, Fantasy = 14, History = 36,
Horror = 27, Music = 10402, Mystery = 9648, Romance = 10749, 
Science Fiction = 878, Thriller = 53, TV Movie = 10770, War = 10752, 
Western = 37

*/
