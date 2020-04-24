
import {
    DeviceEventEmitter,
    BackHandler,
    AppState,
    Platform
} from 'react-native';

/**
 * 监听远程推送
 */
export const $listenRemoteNoticeInfo = (event) => {
    DeviceEventEmitter.addListener('remoteNotifications', event);
};

/**
 * 移除远程推送
*/
export const $removeRemoteNoticeInfo = (event) => {
    DeviceEventEmitter.removeListener('remoteNotifications', event);
};


/**
 * 监听安卓物理返回键
 */
export const $listenKeyboardBack = (event) => {
    if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', event);
    }
};

/**
 * 移除安卓物理返回键
 */
export const $removeKeyboardBack = (event) => {
    if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', event);
    }
};

/**
 * 增加监听前后台切换
 * "active" | "background" | "inactive"
 */
export const $addListenAppStateChange = (event) => {
    AppState.addEventListener('change', event);
};

/**
 * 移除前后台切换监听
 */
export const $removeListenAppStateChange = (event) => {
    AppState.removeEventListener('change', event);
};

