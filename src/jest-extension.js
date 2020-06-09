
function simulateJestMatcherPromise(fn) {
  // HACK: This function "smuggles" a value out of matcher into a test case.
  // This allows to make sure that toReplicate matcher is awaited.
  // If toReplicate would return a normal Promise and test case would not await it, then the test case would
  // succeed by not running anything. So some hacking is justified.
  // This version works because it is coupled to this implementation:
  // https://github.com/facebook/jest/blob/ee2bea16a9f401581a884d9faa0951b552a86fe4/packages/expect/src/index.ts#L326
  return {then: (resolve) => ({catch: (reject) => fn(resolve, reject)})};
}

function executeWhenAwaited(fn) {
  // Creates a lazy Promise-like object
  return {
    then: (resolve, reject) => {
      let result;
      try {
        result = fn();
      } catch (error) {
        reject(error);
        return;
      }
      resolve(result);
    }
  };
}

function withRealTimers(callback) {
  if (setImmediate._isMockFunction) {
    jest.useRealTimers();
    const value = callback();
    jest.useFakeTimers();
    return value;
  } else {
    return callback();
  }
}

import diff from 'jest-diff';

expect.extend({
  toReplicate(scenario, inspections) {
    return simulateJestMatcherPromise((setMatcherResult, handleMatcherError) => {
      const abortMatcher = () => {
        try {
          setMatcherResult({pass: this.isNot, message: () => 'toReplicate must be awaited'});
        } catch (error) {
          try {
            // Jest rethrows the error with a callstack that points to testcase
            handleMatcherError(error);
          } catch (jestError) {
            // Don't throw exceptions in abortMatcher - because of setImmediate it runs outside
            // normal Jest test runner process and disrupts further test execution.
            console.log(jestError.stack); // eslint-disable-line no-console
          }
        }
      };

      // Schedule test failure
      const delayedAwaitError = withRealTimers(() => setImmediate(abortMatcher));

      return executeWhenAwaited(async () => {
        // Cancel test failure if test case is using await
        withRealTimers(() => clearImmediate(delayedAwaitError));

        const result = await scenario.execute(inspections);

        // Essentially here we want `expect(result).toEqual(inspections);` which we could
        // execute, but then the failure would be reported with a wrong stack trace.
        // So we must build matcher result the hard way.

        const isReplicated = this.equals(result, inspections);
        const hintOptions = {comment: 'scenario result should match inspections', isNot: this.isNot, promise: this.promise};
        setMatcherResult({
          actual: result,
          pass: isReplicated,
          message: () => this.utils.matcherHint('toReplicate', undefined, undefined, hintOptions) +
            '\n\n' +
            `Difference:\n\n${diff(inspections, result, {expand: this.expand})}`
        });
      });
    });
  },
});
