import {Navigation} from 'react-native-navigation';

import * as screens from './src/screens';

Object.keys(screens)
  .map((key) => screens[key])
  .forEach(({id, generator}) => {
    Navigation.registerComponent(id, generator);
  });

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: screens.HOME.id,
            },
          },
        ],
      },
    },
  });
});
