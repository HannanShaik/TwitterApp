import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? Metrics.baseMargin : 0,
    height: Metrics.navBarHeight,
    backgroundColor: Colors.appHeaderColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: Metrics.textSize.medium,
    color: Colors.appHeadertitleColor
  }
})
