import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import WaveSeparator from '../../components/WaveSeparator';
import {Colors, Fonts} from '../../style';

export default function MenuItem(props) {
  const {onPress, title, description} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityRole={'button'}
        testID={`link_${title}`}
        onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Image
          style={styles.icon}
          source={require('../../assets/images/menu-item-icon.png')}
        />
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
}

function MenuItemSeparator({leadingItem}) {
  const isEven = leadingItem.index % 2 === 0;
  return (
    <WaveSeparator align={isEven ? 'left' : 'right'} style={styles.separator} />
  );
}

MenuItem.getId = (props) => props.id;
MenuItem.Separator = MenuItemSeparator;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 92,
    paddingRight: 27,
  },
  title: {
    ...Fonts.H2,
    color: Colors.primary,
    paddingBottom: 10,
  },
  icon: {
    marginBottom: -30,
    marginLeft: -53,
  },
  description: {
    ...Fonts.Regular,
    color: Colors.gray,
  },
  separator: {
    paddingVertical: 32,
    opacity: 0.5,
  },
});
