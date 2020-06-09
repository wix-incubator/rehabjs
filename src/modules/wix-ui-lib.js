import {toggleToast} from 'wix-react-native-ui-lib';

const uilibLog = [];

export default class WixUILibModule {

  effectsKey = '[ui-lib]';

  beforeEach = () => {
    toggleToast.mockImplementation(({message, position, preset}) => {
      const state = preset === 'failure' ? 'error' : 'success';
      uilibLog.push({message, position, state});
    });
  };

  afterEach = () => {

  }

  collectEffects = () => {
    return {[this.effectsKey]: [...uilibLog]};
  };
}
