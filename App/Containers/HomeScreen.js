import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, ListView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertMessage from '../Components/AlertMessage';
import TweetActions from '../Redux/TweetRedux';
import TweetInput from '../Components/TweetInput';
import TweetListItem from '../Components/TweetListItem';
import { Colors } from '../Themes/';

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      error: false,
      showMessage: false,
      loading: false
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.renderHiddenRow = this.renderHiddenRow.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  componentWillMount() {
    this.props.fetchTimeline();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetching) {
      this.setState({ loading: true })
    } else if (nextProps.error) {
      this.showMessage(nextProps.error.message);
    } else if (nextProps.posted) {
      this.showMessage('Your Status is posted successfully');
    } else if (nextProps.tweets.length > 0) {
      this.setState({ loading: false, tweets: nextProps.tweets });
    }
  }

  doRetweet(tweet, row) {
    row.closeRow()
    if (!tweet.retweeted) {
      this.props.doRetweet(tweet.id_str)
    }
  }

  markFavorite(tweet, row) {
    row.closeRow()
    if (!tweet.favorited) {
      this.props.markFavorite(tweet.id_str)
    }
  }

  showMessage(message) {
    this.setState({
      errorMessage: message,
      showMessage: true,
      loading: false
    })
  }

  renderHiddenRow(data, secId, rowId, rowMap) {
    const tweet = data;
    return (
      <View style={styles.hiddenRowStyle}>
        <TouchableOpacity
          style={[styles.hiddenButtonStyle, styles.retweet]}
          onPress={() => this.doRetweet(tweet, rowMap[`${secId}${rowId}`])}
        >
          <Icon name="retweet" size={30} color={
            tweet.retweeted ? Colors.retweetColor : Colors.unselectedColor
          } />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.hiddenButtonStyle, styles.favorite]}
          onPress={() => this.markFavorite(tweet, rowMap[`${secId}${rowId}`])}
        >
          <Icon name="star" size={30} color={
            tweet.favorited ? Colors.favoriteColor : Colors.unselectedColor
          } />
        </TouchableOpacity>
      </View >
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TweetInput
          onSubmit={this.props.postTweet} />
        {
          this.state.loading ?
            <ActivityIndicator size="large" color={Colors.loaderColor} /> :
            <SwipeListView
              style={{ flex: 1 }}
              scrollEventThrottle={16}
              dataSource={this.ds.cloneWithRows(this.state.tweets)}
              renderRow={(data) => {
                return (
                  <TweetListItem
                    tweet={data}
                    onRetweetPress={() => this.showMessage('Swipe left to ReTweet')}
                    onFavoritePress={() => this.showMessage('Swipe left to Mark Favorite')}
                  />);
              }
              }
              renderHiddenRow={this.renderHiddenRow}
              rightOpenValue={-150}
              closeOnRowBeginSwipe
              disableRightSwipe
              previewOpenValue={-100}
              closeOnScroll
              enableEmptySections
            />
        }
        <AlertMessage
          title={this.state.errorMessage}
          show={this.state.showMessage}
          onClose={() => this.setState({ showMessage: false })}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ tweet }) => {
  const { tweets, error, fetching, posting, posted } = tweet;
  return {
    tweets, error, fetching, posted
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postTweet: (message) => dispatch(TweetActions.postTweet(message)),
    fetchTimeline: (page) => dispatch(TweetActions.fetchTimeline()),
    doRetweet: (id) => dispatch(TweetActions.doRetweet(id)),
    markFavorite: (id) => dispatch(TweetActions.markFavorite(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
