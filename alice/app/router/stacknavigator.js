/**
 *     Revision   History:
 *        Initial:  2019/05/09         Author:  Wang Huajian
 */

import { createStackNavigator } from 'react-navigation';

import First_Stack from './tabnavigator';

// import Login from '../page/login';
// import Signup from '../page/signup';
// import Password from '../page/password';

const MyAPP = createStackNavigator({
  // Login: {screen: Login},
  // Signup: {screen: Signup},
  // Password: {screen: Password},
  Tab: {screen: First_Stack},
},{
  initialRouteName: "Tab"
});

export default MyAPP;
