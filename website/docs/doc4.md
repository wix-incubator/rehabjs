---
id: doc4
title: Module Creation
---

## Modules

First thing you need to do in your module, for example [react-native-navigation](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js) is to add mocks to all imports from the module which you want to test, you can do it using [jest mock](https://jestjs.io/docs/en/mock-functions) like it is done here [react-native-navigation](../../src/modules/react-native-navigation.js#L5).

---

## Creating a mock class

Then when you are creating a class, for example [React Native Navigation Module](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L13) you do need to initialize screen object in which you will record all the arguments with which mock implementations of your methods were called [screenObj](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L19). Then you will create a void implementation of your methods, but don't forget also to add a record to your screen object of parameters with which your methods were called [](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L28).

---

## Actions Generator

Action generator give you few methods that extends your driver, for example for [React Native Navigation Module](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L64) you will have few additional methods [tap](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L66), [inspectScreen](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L69), [closeScreen](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L72).

---

## Collecting effects

The collecting effects method will be called at the end of every test and will provide you an array of log items for your methods calls. At first you need to specify your own key for using in collectEffects methods [keyExample](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L15), then you will need to implement collectEffects method, and it can be implemented differently depending on a module that you are testing. Here we have an examples for [react-native-navigation](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L77), [fetch](https://github.com/wix-incubator/rehabjs/blob/master/src/modules/fetch.js#L33).

---

## Clearing

Please don't forget to clear your screen object at the end of the collect effects method.
