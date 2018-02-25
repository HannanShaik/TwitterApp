import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    margin: 5,
    padding: 10,
    backgroundColor: Colors.defaultBackgroundColor
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
