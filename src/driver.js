import _ from 'lodash';

class Driver {
  modules = [];
  actions = [];
  mockedData = {};

  //TODO we need to come up with some module API validation
  registerModules = (modules, props, mockedData) => {
    this.modules = [...modules];
    this.mockedData = {...mockedData};
    this.actions = this.modules.map((value) => value.actionsGenerator(props));
  };

  setup = () => {
    // setupRehab();
    this.modules.forEach((module) => module.beforeEach(this.mockedData));
  };

  collectLogs = () => {
    const effects = this.modules.reduce((result, value) => {
      return {...result, ...value.collectEffects()};
    }, {});
    return effects;
  };

  registerMethods = (currentObject) => ({
    ...this.actions.reduce(function (result, action) {
      const wrappedActions = _.mapValues(action, (func) => async (args) => {
        func(args);
        return currentObject;
      });
      return {...result, ...wrappedActions};
    }, {}),
  });
}

export default function createDriver() {
  return new Driver();
}
