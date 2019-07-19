// import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './components/HomeScreen'
import ItfpScreen from './components/ItfpScreen'
import PortalScreen from './components/PortalScreen'
import SideMenu from './components/SideMenu'

// we will export the homescreen component in the navigator.
// export default class App extends React.Component {
//   render() {
//     return (
//       <HomeScreen></HomeScreen>
//     );
//   }
// }

// Be careful, our AppNavigator here is actually creating a header for us, that's why we see two headers in our app.
// We will deal with it later.
const AppNavigator = createStackNavigator(
  {
    Home: {screen:HomeScreen, headerMode:"none"},
    Itfp: ItfpScreen,
    TLC_Portal: PortalScreen,
    SideMenu: SideMenu
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);