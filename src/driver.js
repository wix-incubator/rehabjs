import _ from 'lodash';

class Driver {
  modules = [];
  actions = [];
  mockedData = {};

  registerModules = (modules, props, mockedData) => {
    this.modules = [...modules];
    if (mockedData) {
      this.modules.forEach((module) => module.setupMockedData(mockedData[module.getMockKey()]))
    }
    this.actions = this.modules.map((value) => value.actionsGenerator(props));
  };

  setup = () => {
    this.modules.forEach((module) => module.beforeEach(this.mockedData));
  };

  tearDown = () => {
    this.modules.forEach((module) => module.afterEach());
  }

  collectLogs = (driver, expectedResults) => {
    const effects = this.modules.reduce((result, module) => {
      return {...result, ...module.collectEffects(driver, expectedResults[module.getResultsKey()])};
    }, {});
    return effects;
  };

  registerMethods = (bindApi) => (
    {
      ...this.actions.reduce((result, action) => {
        const wrappedActions = _.mapValues(action, (func, name) => async (args) => {
          return bindApi(func, args);
        })
        return {...result, ...wrappedActions};
      }, {})
    }
  );

  validateResult = (results) => {
    this.modules.forEach((module) => {
      module.validateResults(results[module.getResultsKey()])
    });
  } 

}

export default function createDriver() {
  return new Driver();
}
