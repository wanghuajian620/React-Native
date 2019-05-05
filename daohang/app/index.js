/**
 *     Revision   History:
 *        Initial:  2019/04/29         Author:  Wang Huajian
 */

import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../app/page/login';
import Signup from '../app/page/signup';
import Password from '../app/page/password';
import Home from '../app/page/home';
import Setting from '../app/page/setting';

const First_Stack = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '首页'
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      tabBarLabel: '我的'
    }
  }
}, {
  tabBarPosition: 'bottom',
  navigationOptions: {header: null}
})

const MyAPP = createStackNavigator({
  Login: {screen: Login},
  Signup: {screen: Signup},
  Password: {screen: Password},
  Tab: {screen: First_Stack},
},{
  initialRouteName: "Login"
});

const APP = createAppContainer(MyAPP);

export default class DaoHang extends React.Component {
  render() {
    return (
      <APP />
    )
  }
};
