import { mock } from "react-test-renderer-utils";

  global.engine = {};

  // SILENCED_ERRORS
  const error = console.error;
  console.error = function(...args) {
    // SILENCING act warning triggered by hooks in toggleToast
    if (
      args[0].includes &&
      args[0].includes(
        "Warning: An update to %s inside a test was not wrapped in act"
      )
    ) {
      return console.warn(args);
    }
    const ignored = ["The above error occurred in the"];
    if (
      typeof args[0] !== "string" ||
      ignored.find(prefix => args[0].startsWith(prefix)) === undefined
    ) {
      error.apply(console, args);
      if (args.length === 1 && args[0].name && args[0].message) {
        throw args[0];
      }
      throw new Error(args);
    }
  };

  jest.mock("react-native", () => {
    const RN = jest.requireActual('react-native');
    RN.AccessibilityInfo.isScreenReaderEnabled = () => new Promise(() => false);

    RN.NativeModules.RNDeviceInfo = {};
    RN.NativeModules.RNGestureHandlerModule = {};
    RN.NativeModules.StatusBarManager.getHeight = jest.fn();
    return RN;
  });

  jest.mock("wix-react-native-ui-lib", () => {
    const UI = require.requireActual("wix-react-native-ui-lib");
    const mocks = [
      {
        toggleToast: jest.fn(),
      },
      "Video"
    ];
    const chooseImplementation = name => (original, item) =>
      item === name ? mock(name) : item[name] ? item[name] : original;
    const testable = (name, obj) =>
      mocks.reduce(chooseImplementation(name), obj[name]);
    return new Proxy(UI, {
      get(obj, name) {
        if (name === "Input10") {
          return class Input10 extends require("./test-utils/components")
            .FocusableComponent {
            render() {
              const React = require("react");
              return React.createElement("Input10", this.props);
            }
          };
        }
        if (name === "Video") {
          return class Video extends require("./test-utils/components")
            .PlayableComponent {
            render() {
              const React = require("react");
              return React.createElement("Video", this.props);
            }
          };
        }
        if (name === "FlatList") {
          // Prevents spamming console with unactionable warnings
          return require("react-native").FlatList;
        }
        if (name === "ScrollView") {
          // Prevents spamming console with unactionable warnings
          return require("react-native").ScrollView;
        }
        return testable(name, obj);
      }
    });
  });

  function flushPromises() {
    return new Promise(setImmediate);
  }

  global.window = undefined;
  global.fetch = jest.fn();
  global.flushPromises = flushPromises;
