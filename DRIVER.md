Driver documentation
========
## Overview

Our framework use [Test Renderer](https://reactjs.org/docs/test-renderer.html) to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.

At first, we need to create modules, for example react-native-navigation and fetch
```js
import RNNModule from 'rehabjs/modules/react-native-navigation';
import FetchModule from 'rehabjs/modules/fetch';

const rnnModule = new RNNModule();
const fetchModule = new FetchModule({
  getFetchResult: (url, options) => ({data: {email: 'mock@test.com'}}),
});
```
Then we need to initialize test driver generator with object as argument of `createTestDriver` function
```js
const screenDriver = createTestDriver({
  componentGenerator: () => require('./index').default,
  modules: [rnnModule, fetchModule],
});
```
 - `componentGenerator` is a function that returns default export of React component
 -  `modules` is array of created modules

Next step would be created screenDriver for each of your test

```js
describe('Home', () => {
  it('renders', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    const scenario = driver.run();

    expect(await scenario.execute()).toEqual({
      '[navigation]': [],
      '[fetch]': [
        {
          body: undefined,
          url: 'https://reqres.in/api/users/2',
        },
      ],
    });
  });
``` 
`screenDriver` takes passProps and describes set of actions (scenario) 
also it has methods like `run`, `begin`, `end` and others.

Method `run` represent shortcut for first execution 
and invokes `begin`, `end` methods for primary scenario generation.

Then we execute our `scenario` in asynchronous way to catch all asynchronous actions.



