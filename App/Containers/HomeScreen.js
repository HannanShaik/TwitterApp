import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TweetActions from '../Redux/TweetRedux';
import TweetInput from '../Components/TweetInput';

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentWillMount() {
    this.props.fetchTimeline();
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <View style={styles.container}>
        <TweetInput
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tweet: (message) => dispatch(TweetActions.postTweet(message)),
    fetchTimeline: (page) => dispatch(TweetActions.fetchTimeline())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
