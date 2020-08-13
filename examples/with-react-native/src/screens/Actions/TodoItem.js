import React, {useCallback, useMemo, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../style';

export default function TodoItem({index, title, children, style}) {
  const [completed, setCompletedValue] = useState(false);
  const setCompleted = useCallback(() => {
    if (!completed) {
      setCompletedValue(true);
      Alert.alert('Success', `Item ${index} is now completed.`);
    }
  }, [completed, index]);

  const rootStyle = useMemo(() => {
    return [styles.root, style].concat(completed ? styles.rootCompleted : []);
  }, [completed, style]);

  const textStyle = useMemo(() => {
    return [styles.title].concat(completed ? styles.textCompleted : []);
  }, [completed]);

  return (
    <View style={rootStyle}>
      <View style={styles.head}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{index}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={textStyle}>{title}</Text>
        </View>
      </View>
      <View style={styles.body}>{children({completed, setCompleted})}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 17,
  },
  rootCompleted: {
    opacity: 0.4,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  numberContainer: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderWidth: 2,
    borderRadius: 24,
    borderColor: Colors.primary,
  },
  number: {
    ...Fonts.H2,
    color: Colors.primary,
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 13,
  },
  title: {
    color: Colors.primary,
    fontSize: 18,
    lineHeight: 25,
  },
  body: {},
  textCompleted: {
    textDecorationLine: 'line-through',
  },
});
