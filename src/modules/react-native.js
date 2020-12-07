import {filterByLastSegement} from '../utils/helpers';
import RehabModule from './rehab-module';
import {Alert} from 'react-native';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.AccessibilityInfo.isScreenReaderEnabled = () => new Promise(() => false);

  RN.NativeModules.RNDeviceInfo = {};
  RN.NativeModules.RNGestureHandlerModule = {};
  RN.NativeModules.StatusBarManager.getHeight = jest.fn();
  return RN;
});

export function printComponentTree(driver, stage) {
  const componentLines = driver.filterBy(({props = {}} = {}) => props.testID).map((e) => `${e.type.padEnd(16)} : "${e.props.testID}"`);
  const stageInfo = stage !== undefined ? ` at stage ${stage}` : '';
  // eslint-disable-next-line no-console
  console.log(`Components with testIDs${stageInfo}\n${componentLines.join('\n')}`);
}

const enterInputText = (input, text) => {
  const handler = Enter[input.type];
  handler(text, input);
};

const enterRCContent = (input, content) => {
  const handler = (content) => input.props.onTestContentChange(content);
  handler(content, input);
};

const focus = (component) => component.props.onFocus();


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

const scrollEvent = ({to}) => {
  if (to === 'end') {
    return {event: 'onEndReached'};
  }
  return {
    event: 'onScroll',
    args: [{nativeEvent: {contentOffset: {y: to}, contentSize: {}, layoutMeasurement: {}, contentInset: {}}}]
  };
};

const layoutEvent = ({x = 0, y = 0, width = 375, height, pageX = x, pageY = y} = {}) => {
  if (height === undefined) {
    throw new Error('Should define at least height to simulate component layout');
  }
  return {
    event: 'onLayout',
    args: [{nativeEvent: {layout: {x, y, width, height}}, mockEvent: {pageX, pageY}}]
  };
};

export default class ReactNativeModule extends RehabModule {
  effectsKey = '[react-native]';

  constructor() {
    super('[react-native]', '[react-native]')
  }

  beforeEach = () => {
    Alert.alert = jest.fn();
  };

  afterEach = () => {};

  actionsGenerator = () => {
    return {
      confirmAlert: () => {
        Alert.alert.mock.calls[0][2][1].onPress();
      },
      find: ({findComponent}) => (selector = 0) => {
        return findComponent(selector);
      },
      press: ({findComponent}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(component, {event: 'onPress'})
      },
      click: ({findComponent}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(component, {event: 'onClick'})
      },
      play: ({findComponent}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(component, {event: 'onPlayPress'})
      },
      longPress: ({findComponent}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(component, {event: 'onLongPress'})
      },
      enter: ({findComponent}) => (text) => {
        const component = findComponent(selector);
        enterInputText(components[0], text)
      },
      enterRC:({findComponent}) => (isEmpty) => {
        const component = findComponent(selector);
        enterRCContent(components[0], isEmpty)
      },
      focus: ({findComponent}) => () => {
        const component = findComponent(selector);
        focus(components[0])
      },
      scroll: ({findComponent}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(component, scrollEvent(selector))
      },
      lay: ({findComponent}) => (selector = 0) => {
        const component = findComponent(selector);
        simulateComponentEvent(component, layoutEvent(selector))
      },
      choose: ({findActionSheetItem}) => (selector) => {
        const action = findActionSheetItem(selector);
        action.onPress();
      },
    };
  };
}
