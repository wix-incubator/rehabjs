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

const Analyzers = {
  '|views|': (found) => found.length,
  '(text)': (found) => found.map(collectText).map(asDelimitedText).join(' '),
  '(images)': (found) => nullify(found.map(_.get(['props', 'source', 'uri'])).join('|')),
  '(inspect:selectionState)': (found) => found.map((e) => (e.props.selected === true ? 'selected' : 'unselected')),
};

function analyseViewHierarchy(driver, inspections, stage) {
  let hasFailed = false;
  const result = Object.entries(Analyzers).map(([name, digest]) => {
    const targets = inspections[name];
    if (!targets) {
      return {};
    }
    const result = runAnalysis(driver, digest, targets);
    const stageResultComparer = (target, result) => {
      if (typeof result !== 'object') {
        const expected = Array.isArray(target) ? target[stage * 2] : target;
        return _.isEqual(expected, result);
      }
    };
    hasFailed = hasFailed || !_.isEqualWith(stageResultComparer, targets, result);
    return {[name]: result};
  });
  if (hasFailed) {
    printComponentTree(driver, stage);
  }
  return result;
}

function runAnalysis(driver, digest, targets) {
  const result = {};
  Object.keys(targets).forEach((suffix) => {
    result[suffix] = digest(filterByLastSegement(driver, suffix));
  });
  return result;
}

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
