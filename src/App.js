/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const bkgStyle = {
    bkgColor: isDarkMode ? 'black' : 'white',
    txtColor: isDarkMode ? 'white' : 'black',
  };

  return (
    <SafeAreaView
      style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={bkgStyle.bkgColor}
      />
      <Text style={{color: bkgStyle.txtColor}}>Home Screen</Text>
      <Button
        title={isDarkMode ? 'Light Theme' : 'Dark Theme'}
        onPress={() => setIsDarkMode(!isDarkMode)}
        color={'gray'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
