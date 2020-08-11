import React from 'react';
import {Image, ImageBackground, StyleSheet} from 'react-native';

export default function HeaderSeparator() {
  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.background}
      source={require('../../assets/images/wide-wave.png')}>
      <Image
        style={styles.image}
        source={require('../../assets/images/flask-home.png')}
      />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  background: {
    resizeMode: 'repeat',
    height: 34,
    top: undefined,
    bottom: undefined,
    opacity: 0.4,
  },
  image: {},
});
