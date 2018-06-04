import React, { Component } from 'react'
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions';

import Icon from 'react-native-vector-icons/Ionicons';

class PlaceDetail extends Component {
  state = {
    viewMode: 'portrait'
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  }

  placeDeletedHandler = () => {
    this.props.deletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={[
        styles.container,
        this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer
      ]}>
        <View style={styles.subContainer}>
          <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <Icon
                size={27}
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                color="red"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
   )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: 'column'
  },
  landscapeContainer: {
    flexDirection: 'row'
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  button: {
    alignItems: 'center'
  },
  subContainer: {
    flex: 1
  }
})

export default connect(null, { deletePlace })(PlaceDetail);