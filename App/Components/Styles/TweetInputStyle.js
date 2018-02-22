import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginLeft: 10,
    marginRight: 10,
    marginTop: (Platform.OS === 'ios') ? 10 : 0
  },
  tweetAction: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tweetCounter: {
  },
  tweetInput: {
    flex: 0.9
  },
  tweetButton: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
