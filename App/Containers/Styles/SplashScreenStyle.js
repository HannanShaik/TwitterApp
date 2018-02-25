import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appTitle: {
    fontSize: Metrics.textSize.huge,
    color: Colors.lightTextColor
  }
})
