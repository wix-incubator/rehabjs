import React from 'react';
import {act} from '@testing-library/react-hooks';
import _ from 'lodash';
import {componentDriver} from 'react-component-driver';
import {findComponents} from './component-locator';
import {combine, printable, appendEffects} from './utils/helpers';
import createDriver from './driver';

const inAct = (cb) => async (...params) => {
  let result;
  await act(async () => {
    result = await cb(...params);
  });
  return result;
};

const flushPromises = () => new Promise(setImmediate);

const getPublicLocatorApi = (driver) => ({
  findComponent: (suffix) => {
    const components = findComponents(driver, suffix).components;
    if (components.length === 0) {
      throw new Error(`Component ${suffix} not found`);
    }
    if (components.length > 1) {
      throw new Error(`More then one component ${suffix} found`);
    }
    return components[0];
  },
  findActionSheetItem: (suffix) => {
    // TODO: implement findActionSheetItem
    throw new Error('Not implemented');
  }
})

function createScreenDriver(componentGenerator, props, modules, mockedData, mocksSetup) {
  jest.useFakeTimers();
  const moduleDriver = createDriver();
  if (mocksSetup) mocksSetup.forEach((setup) => setup());
  moduleDriver.registerModules(modules, props, mockedData);
  moduleDriver.setup();

  class TestScreen extends React.Component {
    state = {renderScreen: true};
    Component = componentGenerator();
    componentDidCatch(e) {
      console.error(e);
      this.setState({renderScreen: false});
    }
    render() {
      return this.state.renderScreen ? React.createElement(this.Component, this.props) : null;
    }
  }

  const driver = componentDriver(TestScreen, {
    logVisibleTestIDs() {
      const component = this.getComponent();

      const discoverIDs = (child) => {
        if (!child) return;
        if (child.testID) console.log('TESTID: ', child.testID);
        if (!child.children) return;
        for (const item of child.children) discoverIDs(item);
      };

      discoverIDs(component.children[0]);
      return this;
    },
    begin() {
      const operations = [];
      const end = () => {
        expect.hasAssertions();
        return {
          validate: inAct((expectedResults) => buildResult(expectedResults, operations)),
        };
      };
      const recorder = new Proxy(
        {},
        {
          get(target, name) {
            if (name === 'end') {
              return end;
            }
            const call = {name};
            operations.push(call);
            return (...args) => {
              Object.assign(call, {args});
              return recorder;
            };
          },
        },
      );
      return recorder;
    },
    run() {
      return this.begin().end();
    },
    ...moduleDriver.registerMethods((func, args) => func(getPublicLocatorApi(driver))(args))
  });

  async function buildResult(expectedResults, operations) {
    const result = {};
    const firstStep = {name: 'getComponent', args: []};
    const lastStep = {name: 'split', args: ['/']};

    for (const {name, args} of [firstStep, ...operations, lastStep]) {
      const action = driver[name];
      if (name === 'split') {
        if (args[0] !== '/') {
          throw new Error(`split() must be called with argument '/'`);
        }
        appendEffects(result, collectEffects(driver, expectedResults));
        continue;
      }
      if (action === undefined) {
        throw new Error(`Undefined action ${name}(${args.map(printable).join(', ')})`);
      }
      action(...args);
      jest.runOnlyPendingTimers();
      await flushPromises();
    }

    driver.unmount();
    moduleDriver.validateResult(expectedResults)
    moduleDriver.tearDown();
  }

  function collectEffects(driver, expectedResults) {
    return combine(moduleDriver.collectLogs(driver, expectedResults));
  }

  driver.setProps({...props});
  driver.setProps = undefined;
  return driver;
}

export function createTestDriver(defaults) {
  return ({
    componentGenerator = defaults.componentGenerator,
    passProps = {},
    mockedData = defaults.mockedData ? defaults.mockedData : {},
    modules = defaults.modules,
    mocksSetup = defaults.mocksSetup,
  } = {}) => {
    return createScreenDriver(componentGenerator, passProps, modules, mockedData, mocksSetup);
  };
}
