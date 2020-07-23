## Modules
First thing you need to do in your module, for example [react-native-navigation](../src/modules/react-native-navigation.js) is to add mocks to all imports from module which you want to test, you can do it using [jest.mock](https://jestjs.io/docs/en/mock-functions) like it is done here [react-native-navigation](../src/modules/react-native-navigation.js#L5);

## Creating a mock class
Then when you are creating a class, for example [React Native Navigation Module](../src/modules/react-native-navigation.js#L13) you do need to initialize screen object in which you will record all the arguments with which mock implementations of your methods were called [screenObj](../src/modules/react-native-navigation.js#L19). Then you will create a void implementation of your methods, but don't forget also to add record to your screen object of parameters with which your methods were called [](../src/modules/react-native-navigation.js#L28)

## Actions Generator
Action generator give you few methods that extends your driver, for example for [React Native Navigation Module](../src/modules/react-native-navigation.js#L64) you will have few additional methods [tap](../src/modules/react-native-navigation.js#L66), [inspectScreen](../src/modules/react-native-navigation.js#L69) [closeScreen](../src/modules/react-native-navigation.js#L72)

## Collecting effects
Collecting effects method will be called in the end of every test and will provide you an array of log items for your methods calls. At first you need to specify your own key for using in collectEffects methods [keyExample](../src/modules/react-native-navigation.js#L15), then you will need to implement collectEffects method, and it can be implemented differently depending of module that you are testing. Here whe have an examples for [react-native-navigation](../src/modules/react-native-navigation.js#L77) [fetch](../src/modules/fetch.js#L33). 

## Clearing
Please don't forget to clear your screen object in the end of collect effects method.