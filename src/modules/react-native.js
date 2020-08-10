import {Alert} from 'react-native';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.AccessibilityInfo.isScreenReaderEnabled = () => new Promise(() => false);

  RN.NativeModules.RNDeviceInfo = {};
  RN.NativeModules.RNGestureHandlerModule = {};
  RN.NativeModules.StatusBarManager.getHeight = jest.fn();
  return RN;
});

const uilibLog = [];

export default class ReactNativeModule {
  effectsKey = '[react-native]';

  beforeEach = () => {
    Alert.alert = jest.fn();
  };

  afterEach = () => {};

  actionsGenerator = () => {
    return {
      confirmAlert: () => {
        Alert.alert.mock.calls[0][2][1].onPress();
        return this;
      },
    };
  };

  collectEffects = () => {
    return {[this.effectsKey]: [...uilibLog]};
  };
}
