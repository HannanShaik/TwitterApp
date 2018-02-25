import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, ListView } from 'react-native'
import { connect } from 'react-redux'
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerButton from '../Components/DrawerButton';
import AlertMessage from '../Components/AlertMessage';
import TweetActions from '../Redux/TweetRedux';
import TweetInput from '../Components/TweetInput';
import TweetListItem from '../Components/TweetListItem';

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      error: false,
      showMessage: false
    }
    this.renderHiddenRow = this.renderHiddenRow.bind(this);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  }
  componentWillMount() {
    this.props.fetchTimeline();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        errorMessage: nextProps.error.message,
        error: true,
        showMessage: true
      })
    } else if (nextProps.tweets.length > 0) {
      this.setState({ tweets: nextProps.tweets });
    }
  }

  renderHiddenRow(data, secId, rowId, rowMap) {
    const tweet = data;
    return (
      <View style={styles.hiddenRowStyle}>
        <TouchableOpacity
          style={[styles.hiddenButtonStyle, styles.retweet]}
          onPress={() => {
            rowMap[`${secId}${rowId}`].closeRow()
            this.props.doRetweet(tweet.id_str)
          }}
        >
          <Icon name="retweet" size={30} color={tweet.retweeted ? '#03960c' : '#333f33'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.hiddenButtonStyle, styles.favorite]}
          onPress={() => this.props.markFavorite(tweet.id)}
        >
          <Icon name="star" size={30} color={tweet.favorited ? '#f71f02' : '#333f33'} />
        </TouchableOpacity>
      </View >
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TweetInput
          onSubmit={this.props.tweet} />
        <SwipeListView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          dataSource={this.ds.cloneWithRows(this.state.tweets)}
          renderRow={(data) => {
            return (<TweetListItem
              tweet={data}
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

        <AlertMessage
          title={this.state.errorMessage}
          type={this.state.error ? 'ERROR' : 'INFO'}
          show={this.state.showMessage}
          onClose={() => this.setState({ showMessage: false })}
        />

      </View>
    )
  }
}

const mapStateToProps = ({ tweet }) => {
  const { tweets, error } = tweet;
  return {
    tweets, error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tweet: (message) => dispatch(TweetActions.postTweet(message)),
    fetchTimeline: (page) => dispatch(TweetActions.fetchTimeline()),
    doRetweet: (id) => dispatch(TweetActions.doRetweet(id)),
    markFavorite: (id) => dispatch(TweetActions.markFavorite(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
