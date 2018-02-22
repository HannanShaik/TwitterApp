import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.appHeaderColor
  },
  titleStyle: {
    color: '#ffffff',
    paddingLeft: 15,
    fontSize: Metrics.textSize.large
  }
})
