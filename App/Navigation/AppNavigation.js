import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
import SplashScreen from '../Containers/SplashScreen'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Hannan\'s Twitter App',
      headerLeft: null
    }
  },
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen: { screen: LoginScreen },
}, {
    // Default config for all screens
    headerMode: 'screen',
    initialRouteName: 'SplashScreen',
    navigationOptions: {
      headerStyle: styles.header,
      headerTitleStyle: styles.titleStyle,
      headerTintColor: '#FFFFFF'
    }
  })

export default PrimaryNav
