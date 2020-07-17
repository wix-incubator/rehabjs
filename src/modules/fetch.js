import {mockGlobal} from '../utils/mockGlobal';

mockGlobal('fetch', jest.fn());

export default class FetchModule {

  constructor({getFetchResult = (input, init) => undefined} = {}) {
    this.getFetchResult = getFetchResult;
  }

  effectsKey = '[fetch]';

  networkLog = [];

  beforeEach = () => {
    this.networkLog = [];

    global.fetch.mockImplementation(async (input, init = {}) => {
      this.networkLog.push({
        url: input,
        ...init,
        body: init.body ? JSON.parse(init.body) : undefined
      });

      const result = this.getFetchResult(input, init);
      return {ok: true, json: () => Promise.resolve(result)};
    })
  };

  afterEach = () => {
  }

  collectEffects = () => {
    if (this.networkLog.length > 0) {
      return {[this.effectsKey]: [...this.networkLog]};
    }
    return {};
  };

  actionsGenerator = () => {
    return {};
  }
}
