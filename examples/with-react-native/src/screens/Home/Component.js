import React, {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {useNavigation} from '../../hooks/navigation';
import HeaderSeparator from './HeaderSeparator';
import MenuItem from './MenuItem';
import * as screens from '../index';

function ListHeader() {
  return (
    <Header>
      <Header.Title>RehabJS</Header.Title>
      <Header.Subtitle style={styles.subtitle}>DEMO APP</Header.Subtitle>
      <HeaderSeparator />
    </Header>
  );
}

const stickyZero = [0];

export const Component = ({componentId}) => {
  const renderItem = useCallback(({item}) => MenuItem(item), []);
  const {pushScreen} = useNavigation({componentId});
  const items = useMemo(
    () =>
      Object.entries(screens)
        .filter(([_key, value]) => value.title)
        .map(([key, props], index) => ({
          index,
          id: key,
          title: props.title,
          description: props.description,
          onPress: () => pushScreen(key, props),
        })),
    [pushScreen],
  );

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      contentInsetAdjustmentBehavior="automatic"
      data={items}
      renderItem={renderItem}
      keyExtractor={MenuItem.getId}
      ListHeaderComponent={ListHeader}
      ItemSeparatorComponent={MenuItem.Separator}
      stickyHeaderIndices={stickyZero}
    />
  );
};

Component.options = {
  topBar: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 66,
  },
  subtitle: {
    paddingTop: 0,
  },
});
