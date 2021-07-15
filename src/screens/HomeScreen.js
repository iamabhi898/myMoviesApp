import React from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MovieCarousel from '../components/MovieCarousel';
import TrendingSection from '../components/TrendingSection';
import UpcomingSection from '../components/UpcomingSection';
import PopularSection from '../components/PopularSection';
import TopRatedSection from '../components/TopRatedSection';

const HomeScreen = props => {
  const {navigation, bkgStyle, isDarkMode, setIsDarkMode, moviesState} = props;

  const DropDownMenu = () => {
    return (
      <Menu>
        <MenuTrigger>
          <Ionicons
            name="ellipsis-vertical-outline"
            color="gray"
            size={25}
            style={{padding: 10}}
          />
        </MenuTrigger>
        <MenuOptions style={{backgroundColor: bkgStyle.secBkgColor}}>
          <MenuOption
            onSelect={() => {
              setIsDarkMode(!isDarkMode);
            }}>
            <View style={styles.menuPopupLine}>
              <Ionicons
                name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
                color={bkgStyle.secTxtColor}
                size={20}
              />
              <Text style={{...styles.menuTxt, color: bkgStyle.secTxtColor}}>
                {isDarkMode ? 'Light Theme' : 'Dark Theme'}
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            onSelect={() => {
              navigation.navigate('About');
            }}>
            <View style={styles.menuPopupLine}>
              <Ionicons
                name="alert-circle-outline"
                color={bkgStyle.secTxtColor}
                size={20}
              />
              <Text style={{...styles.menuTxt, color: bkgStyle.secTxtColor}}>
                About App
              </Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

  return (
    <MenuProvider>
      <ScrollView
        style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
        <View style={styles.header}>
          <Text style={{...styles.title, color: bkgStyle.titleColor}}>
            My Movies
          </Text>
          <DropDownMenu />
        </View>
        <MovieCarousel
          bkgStyle={bkgStyle}
          isDarkMode={isDarkMode}
          movies={moviesState.trending}
          navigation={navigation}
        />
        <TrendingSection
          bkgStyle={bkgStyle}
          movies={moviesState.trending}
          navigation={navigation}
        />
        <UpcomingSection
          bkgStyle={bkgStyle}
          movies={moviesState.upcoming}
          navigation={navigation}
        />
        <PopularSection
          bkgStyle={bkgStyle}
          movies={moviesState.popular}
          navigation={navigation}
        />
        <TopRatedSection
          bkgStyle={bkgStyle}
          movies={moviesState.topRated}
          navigation={navigation}
        />
        <View style={styles.paddingView}></View>
      </ScrollView>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  paddingView: {
    paddingBottom: 90,
  },
  menuPopupLine: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTxt: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;
