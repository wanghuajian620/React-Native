import {
    Linking
} from 'react-native';

window.$ = {};
$.instanceList = [];

/**
 * 保存实例
 * 用于保存组件对象，调用方法
 */
window.$instanceMap = new Map();

/**
 * 保存通知
 */
window.$remoteNoticeInfo = new Map();

// Linking
window.$Linking = {};

$Linking.tel = (mobile) => {
    if (!mobile) return;
    Linking.openURL(`tel:${mobile}`);
};
