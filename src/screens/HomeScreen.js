import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const HomeScreen = props => {
  const {bkgStyle, isDarkMode, setIsDarkMode, moviesTitle} = props;
  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      <View style={{marginBottom: 60}}>
        <Text
          style={{
            color: bkgStyle.txtColor,
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 30,
          }}>
          Trending Movies and Shows
        </Text>
        {moviesTitle.map(item => (
          <Text style={{color: bkgStyle.txtColor, fontWeight: 'bold'}}>
            {item}
          </Text>
        ))}
      </View>
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
