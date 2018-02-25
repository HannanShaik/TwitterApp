import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/TweetListItemStyle'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TweetListItem extends Component {
  render() {

    const { tweet } = this.props;
    const { user } = tweet;
    const { media } = tweet.entities;
    let tweetImage = '';
    if (media && media[0].type === 'photo') {
      tweetImage = media[0].media_url_https;
    }

    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.profileImage}
            source={{ uri: user.profile_image_url_https }}
          />
        </View>
        <View style={styles.tweetDetails}>
          <View style={styles.profileTitle}>
            <Text style={styles.name}> {user.name}</Text>
            <Text style={styles.screenName}> @{user.screen_name}</Text>
          </View>
          <Text style={styles.tweetText}> {tweet.text}</Text>
          {
            tweetImage ?
              <Image
                style={styles.tweetImage}
                source={{ uri: tweetImage }}
              /> :
              null
          }

          {/* <View style={styles.lineSeperator} /> */}
          <View style={styles.tweetFooter}>
            <TouchableOpacity
              onPress={this.props.onRetweetPress}
            >
              <Icon name="retweet" size={30} color={tweet.retweeted ? '#03960c' : '#333f33'} />
            </TouchableOpacity>
            <Text style={styles.badgeCount}>{tweet.retweet_count}</Text>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity
              onPress={this.props.onFavoritePress}
            >
              <Icon name="star" size={30} color={tweet.favorited ? '#f71f02' : '#333f33'} />
            </TouchableOpacity>
            <Text style={styles.badgeCount}>{tweet.favorite_count}</Text>
          </View>
        </View>
      </View>
    )
  }
}
