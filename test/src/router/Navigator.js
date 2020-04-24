import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { routeConfigMap } from './RouteConfigMap';
import { StackNavigatorConfig } from './StackConfig';

const AppNavigator = createStackNavigator(routeConfigMap,StackNavigatorConfig)

export default createAppContainer(AppNavigator);