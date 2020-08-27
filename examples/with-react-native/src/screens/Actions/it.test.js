import 'react-native';
import {createTestDriver} from 'rehabjs';
import ReactNativeModule from 'rehabjs/modules/react-native';

const screenDriver = createTestDriver({
  componentGenerator: () => require('./index').default,
  modules: [new ReactNativeModule()],
});

describe('Actions', () => {
  let driver;

  beforeEach(() => {
    driver = screenDriver({
      passProps: {
        componentId: 'test',
      },
    });
  });

  test('.click(<button testID>)', async () => {
    const scenario = driver.begin().click('todoClick').end();

    expect(await scenario.execute()).toEqual({
      // '[react-native]': [
      //   {method: 'Alert.alert', args: ['Item 1 is now completed.']},
      // ],
    });
  });

  test.only('.click(<non-existent testID>)', async () => {
    const scenario = driver.begin().click('nonExistent').end();

    expect(await scenario.execute()).toEqual({})
  });

  test('.enter(<input testID>, "Done")', async () => {
    const scenario = driver.begin().enter('todoEnter', 'Done').end();

    expect(await scenario.execute()).toEqual({
      // '[react-native]': [
      //   {method: 'Alert.alert', args: ['Item 2 is now completed.']},
      // ],
    });
  });

  test('.enter(<non-existent testID>, "Done")', async () => {
    const scenario = driver.begin().enter('nonExistent', 'Done').end();

    await expect(scenario.execute()).rejects.toThrow();
  });
});
