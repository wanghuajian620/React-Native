/**
 *     Revision   History: 
 *          Initial: 2019/04/28     Author:  Wang Huajian
 *          简要: 此页是设置底部标签栏
 */

import { createBottomTabNavigator,  createAppContainer } from 'react-navigation';

import Commodity from '../commodity/index';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Commodity,
  }
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    lazy: false,
    tabBarOptions: {
      activeTintColor: '#000',
    },
});

export default createAppContainer(TabNavigator);
