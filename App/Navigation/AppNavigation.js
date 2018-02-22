import { StackNavigator } from 'react-navigation'
import SplashScreen from '../Containers/SplashScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  })

export default PrimaryNav
