import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadingText = props => (
  <Text {...props} style={[props.style, styles.textHeading]}>
    {props.children}
  </Text>
)

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 28,
    fontWeight: 'bold'
  },
})

export default HeadingText;