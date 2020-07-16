export {createTestDriver} from './screen-driver';

export const modules = {
  // Using getters should prevent those files from being executed in non-RN environment
  get Fetch() {
    return require('./modules/fetch').default;
  },
  get ReactNativeNavigation() {
    return require('./modules/react-native-navigation').default;
  },
  get ReactNative() {
    return require('./modules/react-native').default;
  },
}
