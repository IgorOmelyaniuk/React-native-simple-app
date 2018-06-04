import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  Platform
} from 'react-native';

const ButtonWithBg = props => {
  const content = (
    <View style={[{backgroundColor: props.color}, styles.button, props.disabled ? styles.disabled : null]}>
      <Text style={props.disabled ? styles.disabledText : null}>{props.children}</Text>
    </View>
  )
  if (props.disabled) {
    return content;
  }
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    ) 
  }
  
  return (
    <TouchableOpacity onPress={props.onPress}>
      {content}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#aaa'
  },
  disabledText: {
    color: '#aaa',
  }
})


export default ButtonWithBg;