import React from 'react';
import {View, Text, ScrollView, StyleSheet, Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutScreen = props => {
  const {bkgStyle} = props;
  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 150}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.description}>
          <Text style={{...styles.descriptionTxt, color: bkgStyle.txtColor}}>
            This app is developed with the intend of learning, "My Movies" is a
            personal project for portfolio of the developer. {'\n\n'}This app
            uses TMDb API for the sole purpose of learning app development and
            developer do not intend to use this app for any kind of revenue.{' '}
            {'\n\n'}
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software, including without limitation the
            rights to use, copy, modify, merge, publish, and distribute.{'\n\n'}
            <Text style={{fontFamily: 'OpenSans-Italic'}}>July 2021</Text>
          </Text>
        </View>
        <View style={styles.developerTitle}>
          <Text style={{...styles.devName, color: bkgStyle.txtColor}}>
            Abhishek Tripathi
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name={'logo-linkedin'}
              color={bkgStyle.txtColor}
              size={28}
              style={{marginRight: 20}}
              onPress={async () => {
                await Linking.openURL(
                  'https://www.linkedin.com/in/iamabhi898/',
                );
              }}
            />
            <Ionicons
              name={'logo-github'}
              color={bkgStyle.txtColor}
              size={28}
              onPress={async () => {
                await Linking.openURL('https://github.com/iamabhi898');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginVertical: 20,
  },
  descriptionTxt: {
    paddingHorizontal: 20,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
  },
  developerTitle: {
    alignItems: 'center',
  },
  devName: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AboutScreen;
