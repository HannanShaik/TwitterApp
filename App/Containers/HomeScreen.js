import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import TweetActions from '../Redux/TweetRedux';
import TweetInput from '../Components/TweetInput';
import TweetListItem from '../Components/TweetListItem';

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

  componentWillMount() {
    this.props.fetchTimeline();
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <View style={styles.container}>
        <TweetInput
          onSubmit={this.props.tweet} />
        <TweetListItem />
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
