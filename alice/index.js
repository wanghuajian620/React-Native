/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Alice from './app/router/appcontainer';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Alice);
