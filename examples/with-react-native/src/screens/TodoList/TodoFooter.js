import {StyleSheet, View} from 'react-native';
import SolidButton from '../../components/SolidButton';
import React from 'react';
import {Buttons} from '../../style';

export default function TodoFooter({completeAll, reload}) {
  return (
    <View style={styles.actionsBar}>
      <SolidButton
        onPress={completeAll}
        style={styles.markAll}
        textStyle={styles.markAllText}
        title="Complete all"
      />
      <SolidButton
        onPress={reload}
        title="Reload"
        testID="todoReload"
        style={styles.reload}
        textStyle={styles.reloadText}
      />
    </View>
  );
}

const styleMixins = {
  button: {
    marginHorizontal: 8,
    paddingVertical: 6,
    paddingHorizontal: 33,
    flexBasis: '50%',
  },
};

const styles = StyleSheet.create({
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 33,
  },
  markAll: {
    ...Buttons.primary.bg,
    ...styleMixins.button,
  },
  reload: {
    ...styleMixins.button,
    ...Buttons.outline.bg,
  },
  markAllText: Buttons.primary.text,
  reloadText: Buttons.outline.text,
});
