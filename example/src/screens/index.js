import Home from './Home';
import Hello from './Hello';

export const HOME = {
  id: 'com.myApp.home',
  generator: () => Home,
};

export const HELLO = {
  id: 'com.myApp.hello',
  generator: () => Hello,
};
