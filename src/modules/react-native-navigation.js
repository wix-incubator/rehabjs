import {Navigation} from 'react-native-navigation';
import RehabModule from './rehab-module'
import './react-native';

jest.mock('react-native-navigation');

function append(container, prop, value) {
  const target = container[prop] || [];
  container[prop] = target;
  target.push(value);
}

export class ReactNativeNavigationModule extends RehabModule {
  effectsKey = '[navigation]';
  screen = {};

  constructor() {
    super('[navigation]','[navigation]')
  }


  beforeEach = () => {
    Navigation.showModal.mockImplementation(async (layout) => {
      const screen = {
        name: layout.stack.children[0].component.name,
        passProps: layout.stack.children[0].component.passProps,
        operation: 'showModal'
      }
      this.addResult(screen)
    });
    Navigation.push.mockImplementation(async (componentId, layout) => {
      const screen = {
        name: layout.component.name,
        passProps: layout.component.passProps,
        operation: 'push'
      };
      this.addResult(screen)
    });
    Navigation.pop.mockImplementation(async (componentId) => {
      const screen = {
        name: `caller:${componentId}`,
        operation: 'pop'
      };
      this.addResult(screen)
    });
    Navigation.popToRoot.mockImplementation(async (componentId) => {
      const screen = {
        name: `caller:${componentId}`,
        operation: 'popToRoot'
      };
      this.addResult(screen)
    });
    Navigation.dismissModal.mockImplementation(async (componentId) => {
      const screen = {
        name: `caller:${componentId}`,
        operation: 'dismissModal'
      };
      this.addResult(screen)
    });
    Navigation.showOverlay.mockImplementation(async (layout) => {
      const screen = {
        name: layout.component.name,
        passProps: layout.component.passProps,
        operation: 'overlays'
      };
      this.addResult(screen)
    });
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
    },
  });

}
