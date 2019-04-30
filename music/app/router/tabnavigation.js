/**
 *     Revision   History: 
 *          Initial: 2019/04/28     Author:  Wang Huajian
 *          简要: 此页是设置底部标签栏
 */

import React from 'react'; 
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Commodity from '../commodity/index';
import Setting from '../mine/index';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Commodity,
    navigationOptions: {
      tabBarLabel: '首页'
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      tabBarLabel: '我的'
    },
  }
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    lazy: false,
    tabBarOptions: {
      activeTintColor: '#000',
    },
});

const MyApp = createStackNavigator({
  Home: {screen: TabNavigator}
}, {
  initialRouteName: 'Home'
})

const App = createAppContainer(MyApp);

export default class SSS extends React.Component {
  render() {
    return (
      <App />
    );
  }
}
