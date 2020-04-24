import AsyncStorage from '@react-native-community/async-storage';

 export const LocalCache = {};

/**
 * 存储数据
 */
 LocalCache.setCache = (key, value) => {
     // 若是对象转为字符串
     if (typeof value === 'object' && Object.prototype.toString.call(value).toLowerCase() === '[object object]') {
         value = JSON.stringify(value);
     }

     try {
         AsyncStorage.setItem(key, value);
     } catch (error) {
         console.log(error);
     }
 };

/**
 * 读取数据
 */
 LocalCache.getCache = (key, callback) => {
     if (typeof key !== 'string') {
         return $Toast.info('参数错误');
     }

     AsyncStorage.getItem(key).then((rel) => {
         try {
             rel = JSON.parse(rel);
         } catch (e) {
             return callback(rel);
         }
         callback(rel);
     });
 };

 /**
 * 删除key数据
 */
 LocalCache.deleteCache = (key) => {
     if (typeof key !== 'string') {
         return $Toast.info('参数错误');
     }
     return AsyncStorage.removeItem(key, (err) => {
         if (err) {
             console.log(`删除出错：${err}`);
         }
     });
 };

  /**
 * 清空本地存储数据
 */
 LocalCache.clearCache = () => AsyncStorage.clear((err) => {
     if (err) {
         console.log(`清除本地出错：${err}`);
     }
 });
 


