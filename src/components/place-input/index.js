import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { DefaultInput } from '../ui';

const PlaceInput = props => {
  return (
    <DefaultInput
      placeholder='Enter a place'
      value={props.placeData.value}
      onChangeText={props.onChangeText}
      valid={props.placeData.valid}
      touched={props.placeData.touched}
    />
  )
}

export default PlaceInput;
