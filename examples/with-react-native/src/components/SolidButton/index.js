import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function SolidButton({textStyle, title, ...props}) {
  return (
    <TouchableOpacity {...props}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
