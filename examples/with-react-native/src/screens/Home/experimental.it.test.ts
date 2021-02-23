import {
  TypedReactNativeModule,
  TypedReactNativeNavigationModule,
  TypedTestDriverFactory,
} from 'rehabjs';
import * as screens from '../index';

const driverFactory = new TypedTestDriverFactory(
  () => require('./index').default,
  [TypedReactNativeNavigationModule.jsModule, TypedReactNativeModule.jsModule],
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
