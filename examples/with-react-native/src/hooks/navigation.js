import {useMemo} from 'react';
import {Navigation} from 'react-native-navigation';
import * as screens from '../screens';

export const useNavigation = ({componentId}) => {
  return useMemo(() => {
    const pushScreen = (screenId, passProps = {}) =>
      Navigation.push(componentId, {
        component: {
          name: screens[screenId].id,
          passProps,
        },
      });

    const pop = () => Navigation.pop(componentId);

    return {
      pushScreen,
      pop,
    };
  }, [componentId]);
};
