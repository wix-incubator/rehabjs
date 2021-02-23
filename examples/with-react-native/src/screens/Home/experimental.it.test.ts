import 'react-native';
import {TypedTestDriverFactory, Validator} from 'rehabjs';
import {ReactNativeNavigationModule} from 'rehabjs';
import {ReactNativeModule} from 'rehabjs';
import * as screens from '../index';

const driverFactory = new TypedTestDriverFactory(
  () => require('./index').default,
  [new ReactNativeNavigationModule(), new ReactNativeModule()],
);

describe('Home', () => {
  it('pushes Navigation screen', async () => {
    const driver = driverFactory.create({passProps: {componentId: 'test'}});

    driver
      .begin()
      .do(TypedReactNativeNavigationModule.tap)
      .do(TypedReactNativeModule.click('link_Navigation'))
      .end();

    let rnnValidator = TypedReactNativeNavigationModule.validate;
    await driver
      .expect(
        rnnValidator({
          name: screens.NAVIGATION.id,
          operation: 'push',
          passProps: expect.objectContaining({
            title: 'Navigation',
            description: 'Test cases for React Native Navigation',
            id: screens.NAVIGATION.id,
          }),
        }),
      )
      .validate();
  });
});

class TypedReactNativeNavigationModule {
  private static moduleName = 'navigation';

  static tap = (scenario: any) => scenario.tap();

  static validate = (...expected: ScreenTransitionExpectation[]): Validator => {
    return {
      moduleName: TypedReactNativeNavigationModule.moduleName,
      validationData: expected,
    };
  };
}

interface ScreenTransitionExpectation {
  name: string;
  operation: string;
  passProps: any;
}

class TypedReactNativeModule {
  static click = (buttonId: string) => {
    return (scenario: any) => scenario.click(buttonId);
  };
}
