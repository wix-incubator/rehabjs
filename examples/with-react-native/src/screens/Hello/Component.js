import React from 'react';
import {ScrollView} from 'react-native';

import {LearnMoreLinks} from 'react-native/Libraries/NewAppScreen';

export const Component = ({componentId}) => {
  return (
    <ScrollView>
      <LearnMoreLinks />
    </ScrollView>
  );
};
