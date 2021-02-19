import 'react-native';
import {createTestDriver} from 'rehabjs';
import {ReactNativeNavigationModule} from 'rehabjs';
import {ReactNativeModule} from 'rehabjs';
import * as screens from '../index';

const screenDriver = createTestDriver({
  componentGenerator: () => require('./index').default,
  modules: [new ReactNativeNavigationModule(), new ReactNativeModule()],
});

describe('Home', () => {
  it('pushes Navigation screen', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    const scenario = driver.begin().tap().click('link_Navigation').end();

    await scenario.validate({
      '[navigation]': [
        {
          name: screens.NAVIGATION.id,
          operation: 'push',
          passProps: expect.objectContaining({
            title: 'Navigation',
            description: 'Test cases for React Native Navigation',
            id: screens.NAVIGATION.id,
          }),
        },
      ],
    });
  });
});
