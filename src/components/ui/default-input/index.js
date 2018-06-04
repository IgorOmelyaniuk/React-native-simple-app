import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = props => (
  <TextInput
    underlineColorAndroid='transparent'
    {...props}
    style={[props.style, styles.input, !props.valid && props.touched ? styles.invalid : null]}
  />
)

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    marginTop: 8,
    marginBottom: 8
  },
  invalid: {
    backgroundColor: 'red',
    borderColor: 'red'
  }
}) 

export default defaultInput;