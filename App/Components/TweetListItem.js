import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import styles from './Styles/TweetListItemStyle'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TweetListItem extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://pbs.twimg.com/profile_images/3429373047/a6a31db3e057b629e2d9016328bd54dc_normal.jpeg' }}
          />
        </View>
        <View style={styles.tweetDetails}>
          <View style={styles.profileTitle}>
            <Text style={styles.name}> Hannan Shaik</Text>
            <Text style={styles.screenName}> @HannanShaik</Text>
          </View>
          <Text style={styles.tweetText}> This is my tweet textThis is my tweet text
          This is my tweet textThis is my tweet text</Text>
          {/* <View style={styles.lineSeperator} /> */}
          <View style={styles.tweetFooter}>
            <Icon name="retweet" size={30} color='#aaa' />
            <Text style={styles.badgeCount}>10</Text>
            <Text style={styles.separator}>|</Text>
            <Icon name="star" size={30} color='#aaa' />
            <Text style={styles.badgeCount}>10</Text>
          </View>
        </View>
      </View>
    )
  }
}
