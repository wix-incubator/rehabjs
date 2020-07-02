import {toggleToast} from "wix-react-native-ui-lib";

const uilibLog = [];

export function setupUILibMocks() {
  console.log('setupUILibMocks');
}

export default class WixUILibModule {
  effectsKey = "[ui-lib]";

  beforeEach = () => {
    toggleToast.mockImplementation(({ message, position, preset }) => {
      const state = preset === "failure" ? "error" : "success";
      uilibLog.push({ message, position, state });
    });
  };

  afterEach = () => {};

  actionsGenerator = () => {
    return {};
  };

  collectEffects = () => {
    if (uilibLog.length > 0) {
      return { [this.effectsKey]: [...uilibLog] };
    } else {
      return {};
    }
  };
}
