import React from 'react';
import _ from 'lodash';
import {componentDriver} from 'react-component-driver';
import {componentLocator, findFeedComponents, filterByLastSegement} from './component-locator';
import {combine, printable, appendEffects, flushPromises} from './helpers';
import './jest-extension';

export function createScreenDriver(componentGenerator, props, {app, driverCacheStorage, biEventLog, dispatch, getNetworkOutcome} = {}) {
  jest.useFakeTimers();

  const driverModules = [];

  // const host = prepareHost({module, driverCacheStorage, biEventLog, getNetworkOutcome});

  class TestScreen extends React.Component {
    state = {renderScreen: true}
    Component = componentGenerator();
    componentDidCatch(e) {
      console.error(e);
      this.setState({renderScreen: false});
    }
    render() {
      return this.state.renderScreen ? React.createElement(this.Component, this.props) : null;
    }
  }

  const actions = _.flatMap(driverModules, (result, value) => ({...result, ...value.actionsGenerator()}), {});
  const componentId = 'under-test';
  const driver = componentDriver(TestScreen, {
    dispatch(action) {
      dispatch(action);
      return this;
    },
    execute(...callbacks) {
      callbacks.forEach((fn) => fn());
      return this;
    },
    logVisibleTestIDs() {
      const component = this.getComponent()

      const discoverIDs = child => {
        if (!child) return
        if (child.testID) console.log('TESTID: ', child.testID)
        if (!child.children) return
        for (const item of child.children) discoverIDs(item)
      }

      discoverIDs(component.children[0])
      return this
    },
    begin() {
      const operations = [];
      const end = () => {
        expect.hasAssertions();
        return {
          execute: (inspections) => buildResult(inspections, operations)
        };
      };
      const recorder = new Proxy({}, {
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
        }
      });
      return recorder;
    },
    run() {
      return this.begin().end();
    },
    async flushPromises() {
      jest.runOnlyPendingTimers();
      await flushPromises();
      jest.runOnlyPendingTimers();
      await flushPromises();
      return this;
    },
    async flushPromisesOnce() {
      jest.runOnlyPendingTimers();
      await flushPromises();
      return this;
    },
    async collectAllEffects() {
      jest.runOnlyPendingTimers();
      await flushPromises();
      return readHostLogs({});
    },
    ...actions.map((a) => ((...args) => {
      a(...args);
      return this;
    }))
  });

  async function buildResult(inspections, operations) {
    let stage = 0;
    const result = {};
    const locator = componentLocator(driver, findFeedComponents);
    const firstStep = {name: 'getComponent', args: []};
    const lastStep = {name: 'split', args: ['/']};

    for (const {name, args} of [firstStep, ...operations, lastStep]) {
      if (name === 'split') {
        if (args[0] !== '/') {
          throw new Error(`split() must be called with argument '/'`);
        }
        appendEffects(result, collectEffects(driver, inspections, stage), stage);
        stage += 1;
        continue;
      }
      const action = locator[name];
      if (action === undefined) {
        throw new Error(`Undefined action ${name}(${args.map(printable).join(', ')})`);
      }
      action(...args);
      jest.runOnlyPendingTimers();
      await flushPromises();
    }

    driver.unmount();

    return result;
  }

  function collectModuleEffects() {
    const effects = _.flatMap(driverModules, (result, value) => ({...result, ...value.collectEffects()}), {});
    return effects;
  }

  function collectEffects(driver, inspections, stage) {
    return combine(collectModuleEffects(inspections));
  }

  function runAnalysis(driver, digest, targets) {
    const result = {};
    Object.keys(targets).forEach((suffix) => {
      result[suffix] = digest(filterByLastSegement(driver, suffix));
    });
    return result;
  }

  driver.setProps({...props, componentId});
  driver.setProps = undefined;
  return driver;
}

export function createTestDriver(defaults) {
  const initMocks = defaults.initMocks;
  const enhanceMocks = defaults.mocksEnhancer || ((mocks) => mocks);
  return ({componentGenerator = defaults.componentGenerator, passProps = {}, stateSeed, mocks = {}} = {}) => {
    // const state = feedState(_.merge(defaults.stateSeed, stateSeed));
    // const world = enhanceMocks(initMocks(_.merge(defaults.mocks, mocks)));
    return componentLocator(createScreenDriver(componentGenerator, passProps), findFeedComponents);
  };
}
