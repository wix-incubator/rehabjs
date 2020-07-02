import 'wix-one-app-engine';

const networkLog = [];

export default class WixNetworkModule {

  effectsKey = '[network]';

  getNetworkOutcome(input, init) {
    return {};
  }

  beforeEach = () => {
    engine.fetch = async (input, init) => {
      const outcome = this.getNetworkOutcome(input, init);
      const defaultResult = {
        url: input,
        ...init,
        body: init.body ? JSON.parse(init.body) : undefined
      }

      networkLog.push(outcome.info || defaultResult);
      const {json} = outcome;
      return {ok: true, json: () => Promise.resolve(json)};
    };
  };

  actionsGenerator = () => {
    return {};
  }

  afterEach = () => {

  }

  collectEffects = () => {
    if (networkLog.length > 0) {
      return {[this.effectsKey]: [...networkLog]};
    } else {
      return {};
    }
  };
}
