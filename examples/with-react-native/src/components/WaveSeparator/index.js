import {Image, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';

function WaveImages({count}) {
  const createImage = (_value, index) => (
    <Image
      key={index}
      source={require('../../assets/images/narrow-wave.png')}
      style={styles.separator}
    />
  );

  const images = Array.from({length: count}, createImage);
  return <>{images}</>;
}

export default function WaveSeparator({align = 'center', style}) {
  const computedStyle = useMemo(
    () => [styles.container, styles[align], style],
    [align, style],
  );

  return (
    <View style={computedStyle}>
      <WaveImages count={5} />
    </View>
  );
}

WaveSeparator.Images = WaveImages;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  left: {
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'flex-end',
  },
});
