Rehab js
========

[![Build Status](https://travis-ci.com/wix-incubator/rehabjs.svg?token=ECstxpHzEZeQwCfcirJ4&branch=master)](https://travis-ci.com/wix-incubator/rehabjs)

Integration testing library for React.


Usage
-----

```js
import {createTestDriver, modules} from 'rehabjs';

const screenDriver = createTestDriver({
  componentGenerator: () => require('./').default,
  modules: [
    new rehabModules.ReactNativeNavigation(),
  ],
  mocksSetup: [
    /*setupUILibMocks*/
  ],
});

describe('Example screen test', () => {
  it('Shows overlay on render', async () => {
    const result = await screenDriver({
      passProps: {componentId: 'test', message: 'Hello'},
    }).execute();
    expect(result).toEqual({
      '[navigation]': [
        {
          overlays: [
            {
              name: 'wix.some-screen-id',
              passProps: {
                message: "Hello",
              },
            },
          ],
        },
      ],
    });
  });
});

```
