import React, { Component } from 'react'
import { View, Text, Button, AsyncStorage } from 'react-native'
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
    } else {
      Alert.alert(
        'Login Failed',
        nextProps.error,
        [],
        { cancelable: true }
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AppHeader />
        <Button
          title="Login With Twitter"
          onPress={this.props.loginWithTwitter} />
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
