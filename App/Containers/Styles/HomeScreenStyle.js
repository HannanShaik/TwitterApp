import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  hiddenRowStyle: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 8,
    minHeight: 104
  },
  hiddenButtonStyle: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  retweet: {
    right: 75,
    backgroundColor: '#bfe6ff'
  },
  favorite: {
    right: 0,
    backgroundColor: '#62bdf7'
  },
})
