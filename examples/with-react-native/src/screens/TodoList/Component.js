import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import TodoItemLight from './TodoItemLight';
import {useHooks} from './useHooks';

const meta = {
  title: 'To-do',
  description: 'An example screen with to-do items and network requests',
};

const getId = (p) => String(p.id);
const stickyZero = [0];

function TogglableTodo({item, toggleTodo}) {
  const onPress = useCallback(() => toggleTodo(item), [item, toggleTodo]);

  return (
    <TodoItemLight
      text={item.title}
      completed={item.completed}
      style={styles.todoItem}
      onPress={onPress}
    />
  );
}

export const Component = ({}) => {
  const {completeAll, reload, todos, toggleTodo} = useHooks();

  const renderItem = useCallback(
    ({item}) => {
      return <TogglableTodo item={item} toggleTodo={toggleTodo} />;
    },
    [toggleTodo],
  );

  const renderFooter = useCallback(() => {
    return <TodoFooter completeAll={completeAll} reload={reload} />;
  }, [completeAll, reload]);

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      contentInsetAdjustmentBehavior="automatic"
      data={todos}
      renderItem={renderItem}
      keyExtractor={getId}
      ListHeaderComponent={TodoHeader}
      ListFooterComponent={renderFooter}
      ListFooterComponentStyle={styles.footer}
      stickyHeaderIndices={stickyZero}
    />
  );
};

Component.meta = meta;

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
  },
  todoItem: {
    marginHorizontal: 33,
    marginBottom: 17,
  },
  footer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
});
