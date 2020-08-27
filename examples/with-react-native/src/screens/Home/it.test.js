import 'react-native';
import {createTestDriver} from 'rehabjs';
import RNNModule from 'rehabjs/modules/react-native-navigation';
import ReactNativeModule from 'rehabjs/modules/react-native';
import * as screens from '../index';

const screenDriver = createTestDriver({
  componentGenerator: () => require('./index').default,
  modules: [new RNNModule(), new ReactNativeModule()],
});

describe('Home', () => {
  it('pushes Navigation screen', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    const scenario = driver.begin().click('link_Navigation').end();

    expect(await scenario.execute()).toEqual({
      '[navigation]': [
        {
          name: screens.NAVIGATION.id,
          operation: 'push',
          passProps: expect.objectContaining({
            title: 'Navigation',
          }),
        },
      ],
    });
  });
});
