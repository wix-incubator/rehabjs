import 'wix-one-app-engine';

const uilibLog = [];

export default class WixNetworkModule {

  effectsKey = '[interop]';

  invokeLog = [];

  beforeEach = () => {
    const internalMethods = module.methods();

    engine.moduleRegistry.invoke = async function (name, ...args) {
      if (!IGNORE_INVOKE_LOGS.includes(name)) {
        this.invokeLog.push([name, ...args]);
      }

      const method = internalMethods.find((entry) => entry.id === name);
      if (method && !mockedResults[name]) {
        return method.generator()(...args);
      }
      const result = mockedResults[name];
      if (result === undefined) {
        console.warn(`No mock for ${name}`);
      }
      return result;
    };
  };

  afterEach = () => {

  }

  collectEffects = () => {
    return {[this.effectsKey]: [...this.invokeLog]};
  };
}
