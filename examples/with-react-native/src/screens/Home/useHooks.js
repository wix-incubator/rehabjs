import {Navigation} from 'react-native-navigation';
import {useCallback, useState, useEffect} from 'react';
import * as screens from '../index';
import {getUser} from '../../services/user'

export const useHooks = ({componentId}) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    getUser().then(setUser);
  }, [])

  const onPushScreenPress = useCallback(() => {
    Navigation.push(componentId, {
      component: {
        name: screens.HELLO.id,
        passProps: {},
      },
    });
  }, [componentId]);

  return {
    onPushScreenPress,
    user,
  };
};
