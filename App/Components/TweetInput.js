import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TextInput, Button } from 'react-native'
import styles from './Styles/TweetInputStyle'

export default class TweetInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.tweetInput}
          multiline={true}
          numberOfLines={4}
          maxLength={130}
          placeholder='Update your status here...'
          value={this.state.value}
          onChangeText={(value) => this.setState({ value })}
        />
        <View style={styles.tweetAction}>
          <Text style={styles.tweetCounter}>
            {this.state.value.length}/130
          </Text>
          <Button
            style={styles.tweetButton}
            title="Tweet"
            onPress={() => {
              this.setState({ value: '' })
              this.props.onSubmit(this.state.value)
            }}
          />
        </View>

      </View >
    )
  }
}
