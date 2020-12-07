import {mockGlobal} from '../utils/mockGlobal';
import RehabModule from './rehab-module';

mockGlobal('fetch', jest.fn());

export default class FetchModule extends RehabModule {
  constructor() {
    super('[fetch]', '[fetch]');
  }

  beforeEach = () => {

    global.fetch.mockImplementation(async (input, init = {}) => {
      this.addResult({
        url: input,
        ...init,
        body: init.body ? JSON.parse(init.body) : undefined,
      });

      const result = this.getMocks()[input];
      if (!result) throw new Error(`${input} was not properly mocked`);
      return {ok: true, json: () => Promise.resolve(result)};
    });
  };

}
