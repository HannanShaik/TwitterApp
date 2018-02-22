import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/AppHeaderStyle'

export default class AppHeader extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hannan's Twitter App</Text>
      </View>
    )
  }
}
