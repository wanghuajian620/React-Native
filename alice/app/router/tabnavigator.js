/**
 *     Revision   History:
 *        Initial:  2019/05/09         Author:  Wang Huajian
 */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
// import { Icon } from 'native-base';

import Home from '../page/home';
import Setting from '../page/setting';

const First_Stack = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '首页',
      // tabBarIcon: ({ focused }) => (
      //   <Icon
      //     name={focused ? 'cloud' : 'cloud-outline'}
      //     style={{fontSize: 26, color: focused ? '#478384' : '#80aba9'}}
      //   />)
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      tabBarLabel: '我的',
      // tabBarIcon: ({ focused }) => (
      //   <Icon
      //     name={focused ? 'star' : 'star-outline'}
      //     style={{fontSize: 26, color: focused ? '#478384' : '#80aba9'}}
      //   />
      // ),
    }
  }
}, {
  tabBarPosition: 'bottom',
  navigationOptions: {header: null},
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#2f5d50',
    inactiveTintColor: '#5b7e91',
    // activeBackgroundColor: '#e7e7eb',
    lazy: true,
    style: {
      backgroundColor: '#f3f3f3',
    },
  }
})

export default First_Stack;
