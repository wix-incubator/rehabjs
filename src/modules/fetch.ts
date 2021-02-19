import {mockGlobal} from '../utils/mockGlobal';
import RehabModule, { ModuleActions } from './rehab-module';

mockGlobal('fetch', jest.fn());

export class FetchModule extends RehabModule {
  constructor() {
    super('[fetch]', '[fetch]');
  }

  beforeEach = () => {
    jest.spyOn(global, "fetch")
      .mockImplementation((input: RequestInfo, init?: RequestInit): Promise<Response> => {
        this.addResult({
          url: input,
          ...init,
          body: init?.body,
        });

        // TODO: decide what we should do when `input` is not a string
        const result = this.getMocks()[input as string];
        if (!result) throw new Error(`${input} was not properly mocked`);
        return Promise.resolve(new Response(init?.body));
      });
  };

}
