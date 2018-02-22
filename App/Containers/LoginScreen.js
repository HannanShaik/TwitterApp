import React, { Component } from 'react'
import { ScrollView, Text, Button } from 'react-native'
import AppHeader from '../Components/AppHeader'

import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentWillReceiveProps(nextProps) {
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <AppHeader />
        <Button
          title="Login With Twitter"
          onPress={this.props.loginWithTwitter} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithTwitter: () => dispatch(LoginActions.loginRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
