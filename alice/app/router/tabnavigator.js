/**
 *     Revision   History:
 *        Initial:  2019/05/09         Author:  Wang Huajian
 */

import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Home from '../page/home/index';
import Setting from '../page/setting/index';

import Color from '../res/color';

const First_Stack = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '首页',
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      tabBarLabel: '我的',
    }
  }
}, {
  tabBarPosition: 'bottom',
  navigationOptions: { header: null },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Color.buttonColor,
    inactiveTintColor: Color.defaultColor,
    lazy: true,
    style: {
      backgroundColor: Color.tabColor,
    },
  }
})

export default First_Stack;
