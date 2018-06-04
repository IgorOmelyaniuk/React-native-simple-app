import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import startTabs from '../main-tabs';
import DefaultInput from '../../components/ui/default-input';
import HeadingText from '../../components/ui/heading-text';
import MainText from '../../components/ui/main-text';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBg from '../../components/ui/button-bg';
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import { tryAuth } from '../../store/actions/auth';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    authMode: 'login',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false        
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }
    })
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    })
  }

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    }
    this.props.tryAuth(authData)
    startTabs();
  }

  updateInputState = (key, value) => {
    let connectedValue = {};

    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }

    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password' ? validate(
              prevState.controls.confirmPassword.value,
              prevState.controls.confirmPassword.validationRules,
              connectedValue
            ) : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value,
            valid: validate(value, prevState.controls[key].validationRules, connectedValue),
            touched: true
          }
        }
      }
    })
  }
  
  render() {
    let headingText = null;
    let confirmPasswordControl = null;

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Login</HeadingText>
        </MainText>
      )
    }

    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <View style={
          this.state.viewMode === 'landscape' ? styles.landscapePasswordWidth : styles.portraitPasswordWidth
        }>
          <DefaultInput
            placeholder='Confirm Password'
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={(val) => this.updateInputState('confirmPassword', val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      )
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <KeyboardAvoidingView style={styles.container} behavior='padding'>
            {headingText}
            <ButtonWithBg color='#29aaf4' onPress={this.switchAuthModeHandler}>
              Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
            </ButtonWithBg>
              <View style={styles.inputContainer}>
                <DefaultInput
                  placeholder='Your E-Mail Address'
                  style={styles.input}
                  value={this.state.controls.email.value}
                  onChangeText={(val) => this.updateInputState('email', val)}
                  valid={this.state.controls.email.valid}
                  touched={this.state.controls.email.touched}
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                />
                <View style={
                  this.state.viewMode === 'landscape' ? styles.landscapePasswordContainer : styles.portraitPasswordContainer}>
                  <View style={
                    this.state.viewMode === 'landscape' ? styles.landscapePasswordWidth : styles.portraitPasswordWidth
                  }>
                    <DefaultInput
                      placeholder='Password'
                      style={styles.input}
                      value={this.state.controls.password.value}
                      onChangeText={(val) => this.updateInputState('password', val)}
                      valid={this.state.controls.password.valid}
                      touched={this.state.controls.password.touched}
                      secureTextEntry
                    />
                  </View>
                  {confirmPasswordControl}
                </View>
              </View>
            <ButtonWithBg
              disabled={
                !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' ||
                !this.state.controls.email.valid ||
                !this.state.controls.password.valid
              }
              color='#29aaf4'
              onPress={this.loginHandler}
            >Submit</ButtonWithBg>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  textHeading: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWidth: {
    width: '45%' 
  },
  portraitPasswordWidth: {
    width: '100%' 
  }
});

export default connect(null, { tryAuth })(AuthScreen);