import 'react-native';
import React from 'react';
import {createTestDriver, modules} from 'rehabjs';
import FetchModule from 'rehabjs/modules/fetch';
import * as screens from '../src/screens';

const fetchModule = new FetchModule({
  getFetchResult: (url, options) => ({data: {email: 'mock@test.com'}}),
});
const screenDriver = createTestDriver({
  componentGenerator: () => require('../src/screens/Colors').default,
  modules: [fetchModule],
});

describe('Colors', () => {
  it('renders', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    const scenario = driver.run();

    expect(await scenario.execute()).toEqual({
      '[fetch]': [
        {
          body: undefined,
          url: 'https://reqres.in/api/unknown?page=1',
        },
      ],
    });
  });

  it('loads more', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    const scenario = driver.begin().scroll('Color_5').end();
    // const scenario = driver.run();

    expect(await scenario.execute()).toEqual({
      '[fetch]': [
        {
          body: undefined,
          url: 'https://reqres.in/api/unknown?page=1',
        },
        {
          body: undefined,
          url: 'https://reqres.in/api/unknown?page=2',
        },
      ],
    });
  });
});
