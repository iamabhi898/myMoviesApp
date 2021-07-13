import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutScreen = props => {
  const {bkgStyle} = props;
  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      <Text style={{color: bkgStyle.txtColor}}>About Screen</Text>
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

export default AboutScreen;
