import {Navigation} from 'react-native-navigation';
import {combine, asArray} from '../helpers';

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
    Navigation.mergeOptions = jest.fn();
    Navigation.showModal = async (layout) => {
      screen.name = layout.stack.children[0].component.name;
      screen.passProps = layout.stack.children[0].component.passProps;
      screen.layout = layout;
      screen.operation = 'showModal'
    };
    Navigation.push = async (componentId, layout) => {
      screen.name = layout.component.name;
      screen.passProps = layout.component.passProps;
      screen.layout = layout;
      screen.operation = 'push'
    };
    Navigation.pop = async (componentId) => {
      screen.name = `caller:${componentId}`;
      screen.passProps = undefined;
      screen.layout = undefined;
      screen.operation = 'pop'
    };
    Navigation.popToRoot = async (componentId) => {
      screen.name = `caller:${componentId}`;
      screen.passProps = undefined;
      screen.layout = undefined;
      screen.operation = 'popToRoot'
    };
    Navigation.dismissModal = async (componentId) => {
      screen.name = `caller:${componentId}`;
      screen.passProps = undefined;
      screen.layout = undefined;
      screen.operation = 'dismissModal'
    };
    Navigation.showOverlay = async (layout) => {
      const {name, passProps} = layout.component;
      append(screen, 'overlays', {name, passProps});
    };
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
