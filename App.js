import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/auth';
import SharePlaceScreen from './src/screens/share-place';
import FindPlaceScreen from './src/screens/find-place';
import PlaceDetailScreen from './src/screens/place-detail';
import SideDrawer from './src/screens/side-drawer';

import configureStore from './src/store/configureStore';

const store = configureStore();

// Register Screens
Navigation.registerComponent('udemy.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('udemy.SharePlaceScreen', () => SharePlaceScreen, store, Provider);
Navigation.registerComponent('udemy.FindPlaceScreen', () => FindPlaceScreen, store, Provider);
Navigation.registerComponent('udemy.PlaceDetailScreen', () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent('udemy.SideDrawer', () => SideDrawer);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'udemy.AuthScreen',
    title: 'Login'
  }
})