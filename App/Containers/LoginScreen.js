import React, { Component } from 'react'
import { View, Text, Button, AsyncStorage, Alert } from 'react-native'
import AppHeader from '../Components/AppHeader'
import { ACCESS_TOKEN } from '../Config/Constants';
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux';
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.accessToken) {
      AsyncStorage.setItem(ACCESS_TOKEN, nextProps.accessToken);
      this.props.navigation.navigate('HomeScreen');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is a simple twitter app built by Hannan Shaik</Text>
        <Button
          title="Login With Twitter"
          onPress={this.props.loginWithTwitter} />
        <Text>Based on https://developer.twitter.com</Text>
      </View>
    )
  }
}

const mapStateToProps = ({ login }) => {
  const { response, error } = login;
  const { credentials } = response;
  return {
    accessToken: credentials.access_token,
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithTwitter: () => dispatch(LoginActions.loginRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
