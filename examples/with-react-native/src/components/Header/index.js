import React, {useMemo} from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {Colors, Fonts} from '../../style';

function Title({style, children}) {
  const computedStyle = useMemo(() => [styles.title, style], [style]);
  return <Text style={computedStyle}>{children}</Text>;
}

function Subtitle({style, children}) {
  const computedStyle = useMemo(() => [styles.subtitle, style], [style]);
  return <Text style={computedStyle}>{children}</Text>;
}

export default function Header({style, children, ...props}) {
  const computedStyle = useMemo(() => [styles.header, style], [style]);

  return (
    <ImageBackground
      style={computedStyle}
      imageStyle={styles.headerBg}
      source={require('../../assets/images/fading-gradient.png')}
      {...props}>
      {children}
    </ImageBackground>
  );
}

Header.Title = Title;
Header.Subtitle = Subtitle;

const styles = StyleSheet.create({
  header: {
    paddingTop: 44,
    paddingBottom: 16,
  },
  headerBg: {
    resizeMode: 'stretch',
  },
  title: {
    ...Fonts.H1,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  subtitle: {
    ...Fonts.H3,
    color: Colors.primaryDark,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 33,
  },
});
