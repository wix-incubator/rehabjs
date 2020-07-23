import _ from 'lodash/fp';

export function filterByLastSegement(driver, suffix) {
  return driver.filterBy((element) => {
    const testID = _.getOr('', ['props', 'testID'], element);
    return testID.endsWith(suffix) && !/\w/.test(testID.charAt(testID.length - suffix.length - 1));
  });
}

export function matchByLastSegmentOfUniqueId(driver, suffix) {
  const foundComponents = filterByLastSegement(driver, suffix);
  const matchedIDs = _.uniq(foundComponents.map((c) => c.props.testID));
  switch (matchedIDs.length) {
    case 0:
      return {components: [], testID: `"...${suffix}"`};
    case 1:
      return {components: foundComponents, testID: matchedIDs[0]};
    default:
      throw new Error(`Cannot select component, multiple testID options available ${matchedIDs.join('/')}`);
  }
}

const getOptions = (sheet) => sheet.props.options;
const flatten = (flat, item) => flat.concat(item);
const Enter = {
  Input10: (text, input) => input.props.onChange({nativeEvent: {text}}),
  TextInput: (text, input) => {
    if (input.props.onChange) {
      input.props.onChange({nativeEvent: {text}});
    }
    if (input.props.onChangeText) {
      input.props.onChangeText(text);
    }
  },
  AutoGrowingTextInput: (text, input) => {
    input.props.onChangeText(text);
  },
};

function scrollEvent({to}) {
  if (to === 'end') {
    return {event: 'onEndReached'};
  }
  return {
    event: 'onScroll',
    args: [{nativeEvent: {contentOffset: {y: to}, contentSize: {}, layoutMeasurement: {}, contentInset: {}}}],
  };
}

function layoutEvent({x = 0, y = 0, width = 375, height, pageX = x, pageY = y} = {}) {
  if (height === undefined) {
    throw new Error('Should define at least height to simulate component layout');
  }
  return {
    event: 'onLayout',
    args: [{nativeEvent: {layout: {x, y, width, height}}, mockEvent: {pageX, pageY}}],
  };
}

const simulateComponentEvent = (component, {event, args = []}) => {
  if (component.props.enabled === false || component.props.disabled === true) {
    throw new Error(`Cannot call ${event} on disabled component`);
  }
  component.props[event](...args);
  jest.runOnlyPendingTimers();
};
const enterInputText = (input, text) => {
  const handler = Enter[input.type];
  handler(text, input);
};
const enterRCContent = (input, content) => {
  const handler = (content) => input.props.onTestContentChange(content);
  handler(content, input);
};

const focus = (component) => component.props.onFocus();
const pressAction = (action) => action.onPress();

function findActionSheetOptions(driver, searchTerm) {
  const sheets = driver.filterByType('ActionSheet');
  const actions = sheets
    .map(getOptions)
    .reduce(flatten, [])
    .filter((action) => {
      return action && action.testID && action.testID.includes(searchTerm);
    });
  return {actions, testID: searchTerm};
}

function select(components, selector) {
  if (typeof selector === 'number') {
    return components[selector];
  }
  const {index = 0} = selector;
  return components[index];
}

export function printComponentTree(driver, stage) {
  const componentLines = driver.filterBy(({props = {}} = {}) => props.testID).map((e) => `${e.type.padEnd(16)} : "${e.props.testID}"`);
  const stageInfo = stage !== undefined ? ` at stage ${stage}` : '';
  // eslint-disable-next-line no-console
  console.log(`Components with testIDs${stageInfo}\n${componentLines.join('\n')}`);
}

export function componentLocator(driver, findComponents) {
  const final = (x) => x;
  const fluent = () => provider;
  const assertFound = (components, testID) => {
    if (components.length === 0) {
      printComponentTree(driver);
      throw new Error(`Cannot find component for ${testID}`);
    }
  };
  const assertActionFound = (components, testID) => {
    if (components.length === 0) {
      throw new Error(`Cannot find ActionSheet option for ${testID}`);
    }
  };
  const methods = {
    find: ({components}) => (selector = 0) => final(select(components, selector)),
    press: ({components, testID}) => (selector = 0) =>
      fluent(assertFound(components, testID), simulateComponentEvent(select(components, selector), {event: 'onPress'})),
    click: ({components, testID}) => (selector = 0) =>
      fluent(assertFound(components, testID), simulateComponentEvent(select(components, selector), {event: 'onClick'})),
    play: ({components, testID}) => (selector = 0) =>
      fluent(assertFound(components, testID), simulateComponentEvent(select(components, selector), {event: 'onPlayPress'})),
    longPress: ({components, testID}) => (selector = 0) =>
      fluent(assertFound(components, testID), simulateComponentEvent(select(components, selector), {event: 'onLongPress'})),
    enter: ({components, testID}) => (text) => fluent(assertFound(components, testID), enterInputText(components[0], text)),
    enterRC: ({components, testID}) => (isEmpty) => fluent(assertFound(components, testID), enterRCContent(components[0], isEmpty)),
    focus: ({components, testID}) => () => fluent(assertFound(components, testID), focus(components[0])),
    scroll: ({components, testID}) => (selector = 0) =>
      fluent(assertFound(components, testID), simulateComponentEvent(select(components, selector), scrollEvent(selector))),
    lay: ({components, testID}) => (selector = 0) =>
      fluent(assertFound(components, testID), simulateComponentEvent(select(components, selector), layoutEvent(selector))),
    choose: ({actions, testID}) => () => fluent(assertActionFound(actions, testID), pressAction(actions[0])),
  };
  const selectFinder = (method) => (method === 'choose' ? findActionSheetOptions : findComponents);
  const methodNames = Object.keys(methods);
  const findMethodForName = (name) => (result, methodName) => {
    if (name === methodName) {
      return (suffix, ...args) => methods[methodName](matchByLastSegmentOfUniqueId(driver, suffix))(...args);
    }
    if (name.startsWith(methodName)) {
      const finder = selectFinder(methodName);
      const components = finder(driver, name.substring(methodName.length));
      return methods[methodName](components);
    }
    return result;
  };
  const provider = new Proxy(driver, {
    get(driver, name) {
      return methodNames.reduce(findMethodForName(name), driver[name]);
    },
  });
  return provider;
}

export function findable(ids) {
  return Object.values(ids).filter((value) => typeof value === 'string');
}

export const findComponents = matchByLastSegmentOfUniqueId;
