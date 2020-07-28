import 'react-native';
import React from 'react';
import {createTestDriver, modules} from 'rehabjs';
import RNNModule from 'rehabjs/modules/react-native-navigation';
import FetchModule from 'rehabjs/modules/fetch';
import * as screens from '../src/screens';

const rnnModule = new RNNModule();
const fetchModule = new FetchModule({
  getFetchResult: (url, options) => ({data: {email: 'mock@test.com'}}),
});
const screenDriver = createTestDriver({
  componentGenerator: () => require('../src/screens/Home').default,
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
