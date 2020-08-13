import React from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../components/Header';
import {useNavigation} from '../../hooks/navigation';
import WaveSeparator from '../../components/WaveSeparator';
import {Fonts} from '../../style';

const meta = {
  title: 'Navigation',
  description: 'Test cases for React Native Navigation',
};

export const Component = ({componentId}) => {
  const {pop} = useNavigation({componentId});

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Header>
        <Header.Title>{meta.title}</Header.Title>
        <Header.Subtitle>{meta.description}</Header.Subtitle>
        <WaveSeparator />
      </Header>
      <View style={styles.container}>
        <Button title="Take me back" onPress={pop} />
      </View>
    </ScrollView>
  );
};

Component.meta = meta;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 48,
  },
  text: {
    ...Fonts.Regular,
  },
});
