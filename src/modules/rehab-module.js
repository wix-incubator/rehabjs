export default class RehabModule {
    
    constructor(resultsKey, mockKey) {
        this.resultsKey = resultsKey;
        this.mockKey = mockKey;
        this.mocks = {};
        this.resultsStore = [];
    }

    setupMockedData(mocks) {
        this.mocks = mocks;
    }

    actionsGenerator = (props) => {
        return {};
    };

    addResult(result) {
        this.resultsStore = [...this.resultsStore, result];
    }

    getMocks() {
        return this.mocks;
    }

    getMockKey() {
        return this.mockKey;
    }

    getResultsKey() {
        return this.resultsKey;
    }

    beforeEach = () => {}

    afterEach = () => {
        this.clearEffects();
    };

    collectEffects = (driver, expectedResults) => {
        if (this.resultsStore.length > 0) {
            return {[this.getResultsKey()]: [...this.resultsStore]}
        }
        return {};
    }

    clearEffects = () => {
        this.resultsStore = [];
    }

    validateResults = (results) => {
        if (results && this.resultsStore) {
            expect(results).toEqual(this.resultsStore);
        }
    }

}