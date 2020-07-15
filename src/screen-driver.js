import React from 'react';
import {act} from '@testing-library/react-hooks';
import _ from 'lodash';
import {componentDriver} from 'react-component-driver';
import {componentLocator, findComponents, filterByLastSegement} from './component-locator';
import {combine, printable, appendEffects} from './helpers';
import createDriver from './driver';

const inAct = cb => async (...params) => {
  let result: any;
  await act(async () => {
    result = await cb(...params);
  });
  return result;
};

const flushPromises = () => new Promise(setImmediate);

function createScreenDriver(componentGenerator, props, modules, mockedData, mocksSetup) {
  jest.useFakeTimers();
  const moduleDriver = createDriver();
  if(mocksSetup) mocksSetup.forEach((setup) => setup());
  moduleDriver.registerModules(modules, props);
  moduleDriver.setup();

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

  const driver = componentDriver(TestScreen, {
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
          execute: inAct((inspections) => buildResult(inspections, operations))
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
    ...moduleDriver.registerMethods(this)
  });

  async function buildResult(inspections, operations) {
    let stage = 0;
    const result = {};
    const locator = componentLocator(driver, findComponents);
    const firstStep = {name: 'getComponent', args: []};
    const lastStep = {name: 'split', args: ['/']};

    for (const {name, args} of [firstStep, ...operations, lastStep]) {
      const action = locator[name];
      if (name === 'split') {
        console.log('split')
        if (args[0] !== '/') {
          throw new Error(`split() must be called with argument '/'`);
        }
        appendEffects(result, collectEffects(driver, inspections, stage), stage);
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
    return result;
  }

  function collectModuleEffects() {
    // const effects = driverModules.reduce((result, value) => {
    //  return {...result, ...value.collectEffects()}
    // }, {});
    // return effects;
    return moduleDriver.collectLogs();
  }

  function collectEffects() {
    return combine(collectModuleEffects());
  }

  function runAnalysis(driver, digest, targets) {
    const result = {};
    Object.keys(targets).forEach((suffix) => {
      result[suffix] = digest(filterByLastSegement(driver, suffix));
    });
    return result;
  }

  driver.setProps({...props});
  driver.setProps = undefined;
  return driver;
}

export function createTestDriver(defaults) {
  return ({componentGenerator = defaults.componentGenerator, passProps = {}, mockedData = {}, modules = defaults.modules, mocksSetup = defaults.mocksSetup} = {}) => {
    return componentLocator(createScreenDriver(componentGenerator, passProps, modules, mockedData, mocksSetup));
  };
}
