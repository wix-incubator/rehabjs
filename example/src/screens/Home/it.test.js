import 'react-native';
import React from 'react';
import {createTestDriver, modules} from 'rehabjs';
import * as screens from '..';

jest.mock('../../services/user');

const screenDriver = createTestDriver({
  componentGenerator: () => require('./').default,
  modules: [new modules.ReactNativeNavigation()],
  mocksSetup: [
    /*setupUILibMocks*/
  ],
});

describe('Home', () => {
  it('renders', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});
    const scenario = driver.run();
    expect(await scenario.execute()).toEqual({});
  });

  it('pushes Hello screen', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    const scenario = driver.begin().press('pushScreen').end();

    expect(await scenario.execute()).toEqual({
      '[navigation]': [
        {
          name: screens.HELLO.id,
          operation: 'push',
        },
      ],
    });
  });
});
