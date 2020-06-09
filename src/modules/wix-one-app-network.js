import 'wix-one-app-engine';

const networkLog = [];

export default class WixNetworkModule {

  effectsKey = '[network]';

  constructor(getNetworkOutcome) {
    this.getNetworkOutcome = getNetworkOutcome;
  }

  beforeEach = () => {
    engine.fetch = async (input, init) => {
      const outcome = this.getNetworkOutcome(input, init);
      networkLog.push(outcome.info || {[input]: init});
      const {json} = outcome;
      return {ok: true, json: () => Promise.resolve(json)};
    };
  };

  afterEach = () => {

  }

  collectEffects = () => {
    return {[this.effectsKey]: [...networkLog]};
  };
}
