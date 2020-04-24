
//路由
export { $Router } from './router';
//网络请求
export { $Ajax } from './ajax';
//监听
export { $listenRemoteNoticeInfo, $removeRemoteNoticeInfo, $listenKeyboardBack, $removeKeyboardBack, $addListenAppStateChange, $removeListenAppStateChange } from './eventListener';
//本地存储
export { LocalCache as $Local } from './localCache';
//弹框方法
export { $Toast, $ActionSheet, $Modal } from './promptMethods';
//全局this绑定
export { default } from './this';