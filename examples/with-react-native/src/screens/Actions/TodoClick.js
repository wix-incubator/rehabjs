import React from 'react';
import SolidButton from '../../components/SolidButton';
import {Buttons} from '../../style';

export default function TodoClick({setCompleted}) {
  return (
    <SolidButton
      title="scenario.click('todoClick')"
      testID="todoClick"
      onPress={setCompleted}
      style={Buttons.primary.bg}
      textStyle={Buttons.primary.text}
    />
  );
}
