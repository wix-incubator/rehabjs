RehabJs
========

[![Build Status](https://travis-ci.com/wix-incubator/rehabjs.svg?token=ECstxpHzEZeQwCfcirJ4&branch=master)](https://travis-ci.com/wix-incubator/rehabjs)
[![NPM Version](https://img.shields.io/npm/v/rehabjs.svg?style=flat)](https://www.npmjs.com/package/rehabjs)
[![Discord Chat](https://img.shields.io/discord/735444524783894528?style=flat)](https://discord.gg/rHVnJps)
[![Twitter](https://img.shields.io/twitter/follow/rehab_js?color=174%20172%20174&style=flat)](https://twitter.com/intent/follow?screen_name=rehab_js)

Integration testing framework for React and React Native applications that helps you test components in isolated environment.

<img src="https://i.imgur.com/zhqepP5.png">

Our focus is to make tests fast and give a developer a top to bottom approach for testing where he can start his tests from UI actions invocation and take a snapshot of any meaningful interaction that he is interested in (Network, BI, Navigation, etc.).

## About

In order to write a good and fast-growing application you have to cover  your code with meaningful tests that will help your team run fast but still give you an understanding of what is broken.

One of the sweetest spots of the testing pyramid is Integration tests that are much faster than e2e and are easier to support than unit tests, also they are very informative on what is broken in your code and what are use cases that are affected.

RehabJS applies the following approaches:

* **Use case driven:** all rehab tests describe user actions that can be performed over components that are shown on a screen.
* **Top to bottom:** every action should trigger all code that has been written by your team from click callback or react hook to any action performed or state changed.
* **Snapshots validation:** a developer should have an easy way of recording snapshots of any part of the system that he is interested in. Whether it is a network call, Navigation or state changes.
* **Extendable:** developer should have an easy mechanism to add additional actions to testDriver that can be performed during tests.

### Motivation

In this section, we will make a thought experiment that shows how Rehab could
help you with integration tests.

Let's imagine that you are working on a new React component. You are a conscious developer so you decide to write a test. Your component has UI part so it needs 
a rendering platform (a browser or a native mobile environment), also 
it uses network, storage and push notifications components. Looks like we need
a real **integration** test that is working with a set of code components.

You want to test your component in **isolation** which means that you should
create an **isolated test runtime environment**. It might be a test application with a separate screen with your component. Also you should provide mocks for 
all used components (networking, storage, etc).

But you are a tough guy and you overcome all these obstacles - now you have 
a test application that could be executed on a **real platform** (a browser or a
mobile device simulator). You are ready to start writing tests! Usually in a test 
you do such things:

1. Prepare mocks for test (add test data to storage, mock network responses, etc).
   To do this you could use some mock tool (the most obvious choice - [Jest]).
2. Implement testing scenarion - make some actions with the component (fill text
   fields, scroll lists, click on buttons, etc). For this you could use some e2e 
   testing tool (like [Cypres] for a browser or [Detox] for ReactNative)
3. Validate final component state (for example, ensure that some new element 
   is visible now) and check if needed mock methods were called. 
   
At this moment you should be able to start a **real platform**, open your test
application on it and start the test suite. You made your integration tests - 
congratulations!

But as you can see it was a bumpy road - how can we make it more comfortable?
RehabJS is the answer!

RehabJS doesn't change overall concept of our test structure but simplifies it.
This is how it could help you:

1️⃣ RehabJS uses [ReactNative TestRenderer] and it means that you don't need
a **real platform** anymore because your component is rendered into "virtual 
DOM" - plain JS objects. Such approach makes test run much faster and you don't 
need e2e test tools anymore (because you have a direct access to all DOM elements).

2️⃣ RehabJS provides an **isolated environment** for you so you don't need
to create a test application/separate screen/etc to isolate your component. You 
just give a function that can create your component and RehabJS handle everything 
else.

3️⃣ RehabJS introduces an abstraction of `RehabModule`. Such module simplifies 
work with mocked subsystems. For example, you have some big library like 
[ReactNative Navigation] and you want to mock it. The `NavigationRehabModule`
hides all mock setup boilerplate inside, provides an interface for the 
interaction with mock (for example, method `navigate()`), records all interaction
with mock objects and simplifies result data/event sequence verification.

Modules could be written once and **reused** in all tests. In bright future,
library owners will provide RehabJS modules along with their libraries.

4️⃣ RehabJS provides a **test driver** object that is used as a single entry point
for testing facility. In result our test might look like this:

```js
const screenDriver = createTestDriver({
  componentGenerator: () => require('./mySweetComponent').default,
  modules: [new RNNavigationModule(), new ReactNativeModule()],
});

describe('My sweet component', () => {
  it('should navigate to screen A on click', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    const scenario = driver.begin().click('OK_btn').end();

    await scenario.validate({
      '[navigation]': [
        {
          name: screens.NAVIGATION.id,
          operation: 'push',
          passProps: expect.objectContaining({
            title: 'Navigation',
            description: 'Test cases for React Native Navigation',
            id: screens.NAVIGATION.id
          }),
        },
      ],
    });
  });
});

```

5️⃣ RehabJS handles all async operations for you (under the hood it uses magic 🎩 ;)

## Usage

See [with-react-native](/examples/with-react-native/src/screens/Home/it.test.js)

Work in progress [with-react](/examples/with-react/README.md)

[Cypres]: https://www.cypress.io/
[Detox]: https://github.com/wix/Detox
[Jest]: https://jestjs.io/
[ReactNative TestRenderer]: https://reactjs.org/docs/test-renderer.html
[ReactNative Navigation]: https://wix.github.io/react-native-navigation/docs/before-you-start/