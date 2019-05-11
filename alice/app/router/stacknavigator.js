/**
 *     Revision   History:
 *        Initial:  2019/05/09         Author:  Wang Huajian
 */

import { createStackNavigator } from 'react-navigation';

import First_Stack from './tabnavigator';

const MyAPP = createStackNavigator({
  Tab: {screen: First_Stack},
},{
  initialRouteName: "Tab"
});

export default MyAPP;
