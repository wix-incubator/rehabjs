import 'react-native';
import React from 'react';
import {createTestDriver, modules} from 'rehabjs';
import * as screens from '..';

const rnnModule = new modules.ReactNativeNavigation();
const fetchModule = new modules.Fetch({
  getFetchResult: (url, options) => ({data: {email: 'mock@test.com'}}),
});
const screenDriver = createTestDriver({
  componentGenerator: () => require('./').default,
  modules: [rnnModule, fetchModule],
});

describe('Home', () => {
  it('renders', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    const scenario = driver.run();

    expect(await scenario.execute()).toEqual({
      '[navigation]': [],
      '[fetch]': [
        {
          body: undefined,
          url: 'https://reqres.in/api/users/2',
        },
      ],
    });
  });

  it('pushes Hello screen', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    const scenario = driver.begin().click('pushScreen').end();

    expect(await scenario.execute()).toEqual({
      '[navigation]': [
        {
          name: screens.HELLO.id,
          operation: 'push',
        },
      ],
      '[fetch]': [
        {
          body: undefined,
          url: 'https://reqres.in/api/users/2',
        },
      ],
    });
  });
});
