import {Navigation} from 'react-native-navigation';
import {combine, asArray} from '../helpers';
import './react-native';

jest.mock('react-native-navigation');

function append(container, prop, value) {
  const target = container[prop] || [];
  container[prop] = target;
  target.push(value);
}

export default class ReactNativeNavigationModule {

  effectsKey = '[navigation]';
  screen = {};

  beforeEach = () => {
    const screen = this.screen;
    Navigation.showModal.mockImplementation(async (layout) => {
      screen.name = layout.stack.children[0].component.name;
      screen.passProps = layout.stack.children[0].component.passProps;
      screen.layout = layout;
      screen.operation = 'showModal'
    });
    Navigation.push.mockImplementation(async (componentId, layout) => {
      screen.name = layout.component.name;
      screen.passProps = layout.component.passProps;
      screen.layout = layout;
      screen.operation = 'push'
    });
    Navigation.pop.mockImplementation(async (componentId) => {
      screen.name = `caller:${componentId}`;
      screen.passProps = undefined;
      screen.layout = undefined;
      screen.operation = 'pop'
    });
    Navigation.popToRoot.mockImplementation(async (componentId) => {
      screen.name = `caller:${componentId}`;
      screen.passProps = undefined;
      screen.layout = undefined;
      screen.operation = 'popToRoot'
    });
    Navigation.dismissModal.mockImplementation(async (componentId) => {
      screen.name = `caller:${componentId}`;
      screen.passProps = undefined;
      screen.layout = undefined;
      screen.operation = 'dismissModal'
    });
    Navigation.showOverlay.mockImplementation(async (layout) => {
      const {name, passProps} = layout.component;
      append(screen, 'overlays', {name, passProps});
    });
  };

  afterEach = () => {

  };

  getScreenInfo = (attributes = ['name', 'passProps']) => {
    return attributes.reduce((res, key) => Object.assign(res, {[key]: this.screen[key]}), {});
  };

  actionsGenerator = (parameters) => ({
    // TODO: trigger navigation event only if button with buttonId is present in navigation bar
    tap: (buttonId) => {
     Navigation.events().componentEventsObserver.notifyNavigationButtonPressed({componentId: parameters.componentId, buttonId});
    },
    inspectScreen: (callback) => {
      callback(this.getScreenInfo());
    },
    closeScreen: () => {
      Navigation.events().componentEventsObserver.notifyComponentDidDisappear({componentId: parameters.componentId});
    }
  });

  collectEffects = () => {
    // TODO: report all screen changes, not just the last one
    return {
      [this.effectsKey]: asArray(
        ['name', 'passProps', 'overlays', 'operation'].reduce((res, key) => combine(res, {[key]: this.screen[key]}), {})
      )
    };
  };
}
