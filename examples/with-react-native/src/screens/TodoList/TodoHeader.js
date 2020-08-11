import Header from '../../components/Header';
import {Image, StyleSheet, View} from 'react-native';
import WaveSeparator from '../../components/WaveSeparator';
import React from 'react';
import {Component} from './Component';
import {Colors, Fonts} from '../../style';

export default function TodoHeader() {
  return (
    <Header style={styles.header}>
      <Header.Title>{Component.meta.title}</Header.Title>
      <Header.Subtitle style={styles.subtitle}>
        This screen fetches to-do items from the network and renders them below.
        Upon click, every item sends PATCH request to toggle its “completed”
        status.
      </Header.Subtitle>
      <View style={styles.separator}>
        <WaveSeparator.Images count={3} />
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/images/todo-list-icon.png')} />
        </View>
        <WaveSeparator.Images count={3} />
      </View>
    </Header>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 33,
  },
  subtitle: {
    ...Fonts.Regular,
    paddingBottom: 20,
    paddingHorizontal: 0,
    textAlign: 'left',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
    paddingBottom: 9,
  },
  iconContainer: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 35,
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 9,
    marginRight: 0,
  },
});
