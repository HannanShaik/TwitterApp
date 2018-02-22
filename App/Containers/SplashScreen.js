import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { ACCESS_TOKEN } from '../Config/Constants'

import styles from './Styles/SplashScreenStyle'

class SplashScreen extends Component {

  componentWillMount() {
    AsyncStorage.getItem(ACCESS_TOKEN)
      .then((accessToken) => {
        if (accessToken) {
          this.props.navigation.navigate('LaunchScreen')
        } else {
          this.props.navigation.navigate('LoginScreen')
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>Hannan's Twitter App</Text>
      </View>
    )
  }
}

export default SplashScreen
