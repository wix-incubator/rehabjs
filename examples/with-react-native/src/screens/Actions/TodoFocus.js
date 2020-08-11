import React, {useCallback, useRef} from 'react';
import {TextInput} from 'react-native';
import {Colors, Inputs} from '../../style';

export default function TodoFocus({setCompleted}) {
  const inputRef = useRef(null);
  const onFocus = useCallback(() => {
    inputRef.current.blur();
    setTimeout(setCompleted, 0);
  }, [setCompleted]);

  return (
    <TextInput
      ref={inputRef}
      testID="todoFocus"
      onFocus={onFocus}
      style={Inputs.regular}
      placeholder="scenario.focus('todoFocus')"
      placeholderTextColor={Colors.gray}
    />
  );
}
