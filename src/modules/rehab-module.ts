export default abstract class RehabModule {

  private readonly resultsKey: string;
  private readonly mockKey: string;

  // TODO Use type
  private mocks: any;

  // TODO Use type
  private resultsStore: any;

  protected constructor(resultsKey: string, mockKey: string) {
    this.resultsKey = resultsKey;
    this.mockKey = mockKey;
    this.mocks = {};
    this.resultsStore = [];
  }

  // TODO Use type for mocks
  setupMockedData(mocks: any) {
    this.mocks = mocks;
  }

  // TODO Use type for props
  actionsGenerator = (props: any) => {
    return {};
  };

  // TODO Use type for result
  addResult(result: any) {
    this.resultsStore = [...this.resultsStore, result];
  }

  getMocks() {
    return this.mocks;
  }

  getMockKey(): string {
    return this.mockKey;
  }

  getResultsKey(): string {
    return this.resultsKey;
  }

  beforeEach = () => {
  }

  afterEach = () => {
    this.clearEffects();
  };

  // TODO Use types for driver and expectedResults
  collectEffects = (driver: any, expectedResults: any) => {
    if (this.resultsStore.length > 0) {
      return {[this.getResultsKey()]: [...this.resultsStore]}
    }
    return {};
  }

  clearEffects = () => {
    this.resultsStore = [];
  }

  // TODO Use type for results
  validateResults = (results: any) => {
    if (results && this.resultsStore) {
      expect(results).toEqual(this.resultsStore);
    }
  }
}

export abstract class ModuleActions<T extends RehabModule> {
  private module: RehabModule;

  protected constructor(module: RehabModule) {
    this.module = module;
  }
}
