import _ from 'lodash';

class Driver {

  modules = [];

  getNetworkOutcome = (input, init) => {
    return {};
  };

  registerModules = () => {
    const RNN = require('./modules/react-native-navigation').default;
    const WixNetwork = require('./modules/wix-one-app-network').default;
    const UILib = require('./modules/wix-ui-lib').default;
    modules.append(new RNN());
    modules.append(new WixNetwork(this.getNetworkOutcome));
    modules.append(new UILib());
  };

  collectLogs = () => {
    return _.reduce(this.modules, (result, value) => {
      return {...result, ...value};
    }, {});
  };
}

export default function createDriver() {
  return new Driver();
}
