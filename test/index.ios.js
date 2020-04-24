/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { WebSDK } from './src/sdk';
require('./src/util/constant');

window.webSDK = WebSDK;
// 去除黄色警告
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
