export default class FetchModule {

  constructor({getFetchResult = (input, init) => undefined} = {}) {
    this.getFetchResult = getFetchResult;
  }

  effectsKey = '[fetch]';

  networkLog = [];

  beforeEach = () => {
    this.networkLog = [];

    if (!global.fetch) {
      global.fetch = () => undefined;
    }
    this.spy = jest.spyOn(global, 'fetch');
    this.spy.mockImplementation(async (input, init = {}) => {
      const result = this.getFetchResult(input, init);

      this.networkLog.push({
        url: input,
        ...init,
        body: init.body ? JSON.parse(init.body) : undefined
      });
      return {ok: true, json: () => Promise.resolve(result)};
    })
  };

  afterEach = () => {
    this.spy.mockRestore();
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
