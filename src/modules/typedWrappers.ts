import {Validator} from '../typedTestDriver';
import RehabModule from './rehab-module';
import {ReactNativeNavigationModule} from './react-native-navigation';
import {ReactNativeModule} from './react-native';

export class TypedReactNativeNavigationModule {
  public static jsModule: RehabModule = new ReactNativeNavigationModule();

  private static moduleName = 'navigation';

  static tap = (scenario: any) => scenario.tap();

  static validate = (...expected: ScreenTransitionExpectation[]): Validator => {
    return {
      moduleName: TypedReactNativeNavigationModule.moduleName,
      validationData: expected,
    };
  };
}

export interface ScreenTransitionExpectation {
  name: string;
  operation: string;
  passProps: any;
}

export class TypedReactNativeModule {
  public static jsModule: RehabModule = new ReactNativeModule();

  static click = (buttonId: string) => {
    return (scenario: any) => scenario.click(buttonId);
  };
}
