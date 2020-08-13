import React, {useCallback, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {Colors, Inputs} from '../../style';

export default function TodoEnter({completed, setCompleted}) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const onChange = useCallback(
    (e) => {
      const {text} = e.nativeEvent;
      setValue(text);

      if (text === 'Done') {
        inputRef.current.blur();
        setTimeout(setCompleted, 0);
      }
    },
    [setCompleted],
  );

  return (
    <TextInput
      ref={inputRef}
      testID="todoEnter"
      disabled={completed}
      onChange={onChange}
      style={Inputs.regular}
      placeholder="scenario.enter('todoEnter', 'Done')"
      placeholderTextColor={Colors.gray}
      value={value}
    />
  );
}
