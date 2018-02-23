import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.alertBackgroundColor
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  message: {
    margin: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    color: Colors.lightTextColor
  }
})
