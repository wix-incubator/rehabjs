import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import Header from '../../components/Header';
import TodoItem from './TodoItem';
import WaveSeparator from '../../components/WaveSeparator';
import TodoClick from './TodoClick';
import TodoEnter from './TodoEnter';
import TodoFocus from './TodoFocus';

const meta = {
  title: 'Actions',
  description:
    'Playground for matching and interacting with the elements via RehabJS.',
};

function ActionsHeader() {
  return (
    <Header>
      <Header.Title>{Component.meta.title}</Header.Title>
      <Header.Subtitle>{Component.meta.description}</Header.Subtitle>
      <WaveSeparator align="center" />
    </Header>
  );
}

const stickyZero = [0];

const cases = [
  {
    id: 'todoEnter',
    title: 'This input should raise an alert when you type in “Done”.',
    Component: TodoEnter,
  },
  {
    id: 'todoFocus',
    title: 'Below is a text input that raises an alert upon the focus.',
    Component: TodoFocus,
  },
  {
    id: 'todoClick',
    title: 'Upon click, this button will raise an alert.',
    Component: TodoClick,
  },
];

export const Component = () => {
  const renderItem = useCallback(({item, index}) => {
    return (
      <TodoItem
        key={String(index)}
        index={1 + index}
        title={item.title}
        style={styles.todo}>
        {item.Component}
      </TodoItem>
    );
  }, []);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      data={cases}
      renderItem={renderItem}
      ListHeaderComponent={ActionsHeader}
      stickyHeaderIndices={stickyZero}
    />
  );
};

Component.meta = meta;

const styles = StyleSheet.create({
  todo: {
    paddingHorizontal: 33,
  },
});
