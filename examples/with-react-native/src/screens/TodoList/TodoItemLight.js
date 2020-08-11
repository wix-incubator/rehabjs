import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../style';

export default function TodoItemLight({text, completed, onPress, style}) {
  const containerStyle = useMemo(() => [styles.container, style], [style]);

  const markStyle = useMemo(() => {
    return [styles.mark].concat(completed ? styles.markCompleted : []);
  }, [completed]);

  const textStyle = useMemo(() => {
    return [styles.text].concat(completed ? styles.textCompleted : []);
  }, [completed]);

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <View style={styles.box}>
        <Text style={markStyle}>✓</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderColor: Colors.primary,
    borderWidth: 1,
    width: 19,
    height: 19,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: {
    opacity: 0,
  },
  markCompleted: {
    opacity: 1,
  },
  textContainer: {
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 15,
    paddingBottom: 5,
    borderColor: Colors.light,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
    lineHeight: 25,
    color: Colors.gray,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
  },
});
