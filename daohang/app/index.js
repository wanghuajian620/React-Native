/**
 *     Revision   History:
 *        Initial:  2019/04/29         Author:  Wang Huajian
 */

import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

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
})

const MyAPP = createStackNavigator({
  Home: {screen: First_Stack},
},{
  initialRouteName: "Home"
});

const APP = createAppContainer(MyAPP);

export default class SSS extends React.Component {
  render() {
    return (
      <APP />
    )
  }
};
