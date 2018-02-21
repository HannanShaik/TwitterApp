import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import OAuthManager from 'react-native-oauth';
// Styles
import styles from './Styles/LaunchScreenStyles'

const config = {
  twitter: {
    consumer_key: 'oNKtP1e5SkuJ8Gi4CFLtyQP2x',
    consumer_secret: 'ZBl1K0e3jQksqaokb4zy6phNK5lNBcwgvyT948brD0IA3YAwbj'
  }
}
// Create the manager
const manager = new OAuthManager('hannantwitterapp')
// configure the manager
manager.configure(config);

export default class LaunchScreen extends Component {

  componentWillMount() {
    console.log('hello');
    manager.authorize('twitter')
      .then(resp => {
        console.log(resp)
        const userTimelineUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
        manager
          .makeRequest('twitter', userTimelineUrl)
          .then(resp => {
            console.log('Data ->', resp.data);
            manager.deauthorize('twitter');

          });
      }
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}
