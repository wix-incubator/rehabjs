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

const simulateComponentEvent = (component, {event, args = []}) => {
  if (component.props.enabled === false || component.props.disabled === true) {
    throw new Error(`Cannot call ${event} on disabled component`);
  }
  component.props[event](...args);
  jest.runOnlyPendingTimers();
};

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
<<<<<<< HEAD
        return this;
=======
      },
      find: ({findComponent}) => (selector = 0) => {
        return findComponent(selector);
      },
      press: ({components, testID}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(select(components, selector), {event: 'onPress'})
      },
      click: ({findComponent}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(component, {event: 'onClick'})
      },
      play: ({components, testID}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(select(components, selector), {event: 'onPlayPress'})
      },
      longPress: ({components, testID}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(select(components, selector), {event: 'onLongPress'})
      },
      enter: ({components, testID}) => (text) => {
        const component = findComponent(selector);
        enterInputText(components[0], text)
      },
      enterRC:({components, testID}) => (isEmpty) => {
        const component = findComponent(selector);
        enterRCContent(components[0], isEmpty)
      },
      focus: ({components, testID}) => () => {
        const component = findComponent(selector);
        focus(components[0])
      },
      scroll: ({components, testID}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(select(components, selector), scrollEvent(selector))
      },
      lay: ({components, testID}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(select(components, selector), layoutEvent(selector))
      },
      choose: ({findActionSheetItem}) => (selector) => {
        const action = findActionSheetItem(selector);
        action.onPress();
>>>>>>> Move actions to modules
      },
    };
  };

  collectEffects = () => {
    return uilibLog.length > 0 ? {[this.effectsKey]: [...uilibLog]} : {};
  };
}
