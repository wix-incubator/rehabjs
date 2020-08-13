import Actions from './Actions';
import Home from './Home';
import Navigation from './Navigation';
import TodoList from './TodoList';

export const HOME = {
  id: 'com.myApp.home',
  generator: () => Home,
};

export const TODO = {
  ...TodoList.meta,
  id: 'com.myApp.todolist',
  generator: () => TodoList,
};

export const ACTIONS = {
  ...Actions.meta,
  id: 'com.myApp.actions',
  generator: () => Actions,
};

export const NAVIGATION = {
  ...Navigation.meta,
  id: 'com.myApp.navigation',
  generator: () => Navigation,
};
