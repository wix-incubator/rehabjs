import React from 'react';
import RehabModule from './modules/rehab-module';
import {createTestDriver} from './screen-driver';
import {ReactNativeNavigationModule} from './modules/react-native-navigation';
import {ReactNativeModule} from './modules/react-native';

export class TestDriverOptions {
  passProps: any;
}

export interface Validator {
  moduleName: string;
  validationData: any;
}

export class TypedTestDriver {
  private scenario: any;
  private expectedData: any = {};

  constructor(private jsDriver: any) { }

  public begin() : this {
    this.scenario = this.jsDriver.begin();
    return this;
  };

  public end() : this {
    this.scenario = this.scenario.end();
    return this;
  };

  public do(action: (scenario: any) => any): this {
    this.scenario = action(this.scenario);
    return this;
  }

  public expect(validator: Validator): this {
    this.expectedData[`[${validator.moduleName}]`] = validator.validationData;
    return this;
  }

  public async validate() {
    await this.scenario.validate(this.expectedData);
  }
}

export class TypedTestDriverFactory {
  private readonly testDriverCreator: any;

  constructor(
    componentGenerator: () => React.Component,
    modules: RehabModule[],
  ) {
    this.testDriverCreator = createTestDriver({
      componentGenerator: componentGenerator,
      modules: modules,
    });
  }

  public create(options: TestDriverOptions): TypedTestDriver {
    let jsDriver = this.testDriverCreator(options);
    return new TypedTestDriver(jsDriver);
  }

}
