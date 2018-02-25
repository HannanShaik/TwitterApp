import React, { Component } from 'react'
import { View, Text, Button, AsyncStorage, Alert, NetInfo, Platform } from 'react-native'
import { ACCESS_TOKEN } from '../Config/Constants';
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux';
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    }
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.accessToken) {
      AsyncStorage.setItem(ACCESS_TOKEN, nextProps.accessToken);
      this.props.navigation.navigate('HomeScreen');
    }
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isInternetConnected: isConnected })
    })
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = (isConnected) => {
    this.setState({ isInternetConnected: isConnected });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is a simple twitter app built by Hannan Shaik</Text>
        <Button
          title="Login With Twitter"
          onPress={() => {
            if (this.state.isInternetConnected) {
              this.props.loginWithTwitter();
            } else {
              Alert.alert(
                'Internet Connection Error',
                'Please check your internet connection.',
                [{ text: 'OK', onPress: () => { } }],
                { cancelable: true }
              )
            }
          }} />
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
