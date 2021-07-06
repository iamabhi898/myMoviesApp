import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const HomeScreen = props => {
  const {bkgStyle, isDarkMode, setIsDarkMode} = props;
  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      <Text style={{color: bkgStyle.txtColor}}>Home Screen</Text>
      <Button
        title={isDarkMode ? 'Light Theme' : 'Dark Theme'}
        onPress={() => setIsDarkMode(!isDarkMode)}
        color={'gray'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
