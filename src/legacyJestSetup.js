export const legacyJestSetup = () => {
  afterEach(() => {
    const Navigation = require('react-native-navigation').Navigation;
    const events = Navigation.events();
    if (events) {
      const observer = events.componentEventsObserver;
      Object.keys(observer.listeners).forEach((componentId) => observer.unmounted(componentId));
    }
  });

  jest.setTimeout(30000);

  const tableRunner = (runner) => (table) => (pattern, executor) => {
    table.forEach((input) => {
      const args = Array.isArray(input) ? input : [input];
      const testDescription = pattern.replace('%s', args[0]);
      runner(testDescription, () => executor.apply(null, args));
    });
  };

  global.check = {
    each: tableRunner(test),
    only: {each: tableRunner(test.only)},
    skip: {each: tableRunner(test.skip)},
  };
};
