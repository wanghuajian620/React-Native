/**
 *@description WebSDK适配库封装
 *@author      ai4code
 *@date        2018-06-29
 *@version     2.0.4
 */
import $ from './sdk-check'
let Platform = null;
try{
   let $RN = require('react-native');
   Platform = $RN.Platform;
}catch(e){
   console.log('web环境不支持');
}
const DslSDK = require('./sdk');
const WebApp = window.WebApp || {};
const WebSDK = {};
const PLATFORM = {
    WEB: 'WebPlugin', // 移动门户
    RN: 'RNPlugin', // rn
};
const typeOfEnvironment = window.typeOfEnvironment || PLATFORM.RN;

const Sea = window.Sea || {}; // 适配门户端
const WebDeviceType = window.deviceType;

/**
 * 成功失败返回值
 */
const resultResponse = {
    code: '',
    data: '',
};

/**
 * 通用适配库成功返回码各端统一规范
 * @params{platform：平台, vo:返回值}
 */
function sdkResponse(result, platform) {
    const curPlatform = platform || typeOfEnvironment;

    if (curPlatform !== PLATFORM.WEB && curPlatform !== PLATFORM.RN) {
        return modelAlert('暂不支持DEV平台');
    }

    if (curPlatform === PLATFORM.WEB) {
        resultResponse.code = result.flag || '0';
        resultResponse.data = result.info ? result.info : result;
        return resultResponse;
    } 

    if (curPlatform === PLATFORM.RN) {
		 resultResponse.code = result.resultCode;
         resultResponse.data = result.resultMessage ? result.resultMessage : "";
         return resultResponse;
    }
}
var RNSuccRes = {
	code: '',
	data: ''
};
var RNErrorRes = {
	code: '',
	message: ''
};

 
function errorRes(platform, result) {
	//Cordova Error Response
	if (platform === PLATFORM.WEB) {
		RNErrorRes.code = result.flag || "-1";
		RNErrorRes.message = result.info || result;
		return RNErrorRes;
	}

	//ReactNative Error Response
	if (platform === PLATFORM.RN) {
		RNErrorRes.code = (result.resultCode || result.resultCode == 0) ? result.resultCode : '-1';
		RNErrorRes.message = result.resultMessage || "";
		return RNErrorRes;
	}
};

/**
 * 通用适配库成功返回码各端统一规范
 * @params{platform：平台, vo:返回值}
 */
function successPipe(result, platform) {
	var curPlatform = platform || typeOfEnvironment;

	if (curPlatform !== PLATFORM.WEB && curPlatform !== PLATFORM.RN) {
		return modelAlert("暂不支持DEV平台");
	}

	if (curPlatform === PLATFORM.WEB) {
		RNSuccRes.code = result.flag || "0";
		RNSuccRes.data = result.info ? result.info : result;
	}

	if (curPlatform === PLATFORM.RN) {
		RNSuccRes.code = result.status || "-1";
		RNSuccRes.data = result.data ? result.data : "";
	}

	return RNSuccRes;
};
 

function modelAlert(contentext) {
    const obj = {};
    obj.code = '404';
    obj.data = contentext;
    return obj;
}

/**
 * @description 查看文件状态
 * @param paramObj | object | 查看文件的参数  | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.fileStatus = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: { // Cordova端
        const status = WebApp.fileStatus(paramObj.uri, paramObj.path);
        if (status == '0') {
            successCallBack && successCallBack(sdkResponse(status,PLATFORM.WEB));
        } else {
            failCallBack && failCallBack(sdkResponse(status,PLATFORM.WEB));
        }
        break;
    }
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-文件状态查看'));
        break;
    }
};

/**
 * @description 打开文件
 * @param paramObj | object | 打开文件的参数 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.showFile = function (paramObj, successCallBack, failCallBack) {
	 
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.showFile(paramObj.uri, paramObj.path);
        successCallBack && successCallBack({
            code: '0',
            data: path,
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-打开文件'));
        break;
    }
};
/**
 * @ 
 * @description 获取登录信息
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getLoginInfo = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.getLoginInfo((res) => {
            res = JSON.parse(res);
            if (res.flag == '0') {
                successCallBack && successCallBack(sdkResponse(res,PLATFORM.WEB));
            } else {
                failCallBack && failCallBack(sdkResponse(res,PLATFORM.WEB));
            }
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-获取用户登录信息'));
        break;
    }
};

/**
 * @description 数据库事务操作
 * @param paramObj | object | 参数对象 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.sqlTransactionAsync = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        paramObj = JSON.stringify(paramObj);
        WebApp.sqlTransactionAsync(paramObj, (success) => {
            let succeStr;
            if (WebDeviceType === 'ios') {
                succeStr = JSON.parse(success);
            } else {
                const succeArr = success.split("'info':");
                if (succeArr[1].indexOf('{') > -1) {
                    const succeArrL = succeArr[1].length;
                    const suceeObj = succeArr[1].slice(2, succeArrL - 2);
                    succeStr = `${succeArr[0].replace(/'/g, '"')}"info":${suceeObj}}`;
                    succeStr = JSON.parse(succeStr);
                } else {
                    succeStr = success.replace(/'/g, '"');
                    succeStr = JSON.parse(succeStr);
                }
            }

            if (succeStr.flag == '0') {
                successCallBack && successCallBack(sdkResponse(succeStr,PLATFORM.WEB));
            } else {
                failCallBack && failCallBack(sdkResponse(succeStr,PLATFORM.WEB));
            }
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-数据库事务操作'));
        break;
    }
};

/**
 * @description 拦截Back事件（使用小应用：企金项目应用）Android专用，iOS无回退键
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.registNativeEnv = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.registNativeEnv();
        successCallBack && successCallBack({
            code: '0',
            data: '',
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-当前应用是否拦截Back键事件'));
        break;
    }
};

/**
 * 门户---拦截back事件
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.onBackButtonTap = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        Sea && Sea.onBackButtonTap();
        successCallBack && successCallBack({
            code: '0',
            data: '',
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-拦截back事件'));
        break;
    }
};

/**
 * @description 关闭当前应用
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.closeWebapp = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.closeWebapp();
        successCallBack && successCallBack({
            code: '0',
            data: '',
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-关闭当前应用'));
        break;
    }
};

/**
 * @description 用户选择目标地理位置
 * @param paramStr | string | 选取位置的半径 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.chooseLocation = function (paramStr, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.chooseLocation((data) => {
            let succeStr;
            if (WebDeviceType === 'ios') {
                succeStr = JSON.parse(data);
            } else {
                succeStr = data.replace(/'/g, '"');
                succeStr = JSON.parse(succeStr);
            }
            if (succeStr.flag == '0') {
                successCallBack && successCallBack(sdkResponse(succeStr,PLATFORM.WEB));
            } else {
                failCallBack && failCallBack(sdkResponse(succeStr,PLATFORM.WEB));
            }
        }, paramStr);
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-用户选择目标地理位置'));
        break;
    }
};

/**
 * @description 计算两个地理位置的距离
 * @param paramObj | object | 参数对象 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.calculateLineDistance = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: { // Cordova端
        paramObj = JSON.stringify(paramObj);
        const linedistance = WebApp.calculateLineDistance(paramObj);
        typeof linedistance === 'string' ? successCallBack && successCallBack({
            code: '0',
            data: linedistance,
        }) : failCallBack && failCallBack({
            code: '-1',
            message: linedistance,
        });
        break;
    }
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-计算两个地理位置的距离'));
        break;
    }
};

/**
 * @description 门户打包压缩文件
 * @param paramObj | object | 参数对象 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.filesToZip = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        paramObj = JSON.stringify(paramObj);
        WebApp.filesToZip(paramObj, (data) => {
            if (WebDeviceType === 'ios') {
                data = JSON.parse(data);
                if (data.flag == '0') {
                    successCallBack && successCallBack(sdkResponse(data,PLATFORM.WEB));
                } else {
                    failCallBack && failCallBack(sdkResponse(data,PLATFORM.WEB));
                }
            } else {
                typeof data === 'string' ? successCallBack && successCallBack(sdkResponse(data,PLATFORM.WEB)) : failCallBack && failCallBack(sdkResponse(data,PLATFORM.WEB));
            }
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-打包压缩文件'));
        break;
    }
};

/**
 * @description 浏览图片大图
 * @param paramStr | string | 拍照返回的fileId | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.viewPhoto = function (paramStr, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.viewPhoto(paramStr);
        successCallBack && successCallBack({
            code: '0',
            data: paramStr,
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-浏览图片大图'));
        break;
    }
};

/**
 * @description 删除图片
 * @param paramStr | string | 返回的fileId | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.deletePhoto = function (paramStr, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.deletePhoto(paramStr);
        successCallBack && successCallBack({
            code: '0',
            data: paramStr,
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-删除图片'));
        break;
    }
};

/**
 * @description 加水印自定义录像
 * @param paramObj | object | 参数对象 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.shuiYinLuXiang = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        paramObj = JSON.stringify(paramObj);
        WebApp.shuiYinLuXiang(paramObj, (data) => {
            const msgs = JSON.parse(data);
            if (msgs.flag == '0') {
                successCallBack && successCallBack(sdkResponse(msgs,PLATFORM.WEB));
            } else {
                failCallBack && failCallBack(sdkResponse(msgs,PLATFORM.WEB));
            }
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-加水印自定义录像'));
        break;
    }
};

/**
 * @description 用户选择日期
 * @param paramObj | object | 指定选择日期的限制条件 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.pickDate = function (paramObj, successCallBack, failCallBack) { // webapp只有一个回调函数
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        paramObj = JSON.stringify(paramObj);
        WebApp.pickDate(paramObj, (data) => {
            data = JSON.parse(data);
            const dataObj = {
                flag: data.flag,
                info: data.date,
            };
            if (dataObj.flag == '0') {
                successCallBack && successCallBack(sdkResponse(dataObj,PLATFORM.WEB));
            } else {
                failCallBack && failCallBack(sdkResponse(dataObj,PLATFORM.WEB));
            }
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-用户选择日期'));
        break;
    }
};

/**
 * @description 查看是否安装某个应用
 * @param paramStr | string | 应用id | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.ifInstallApp = function (paramStr, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: { // Cordova端
        const isInstallApp = WebApp.ifInstallApp(paramStr);
        String(isInstallApp) === 'true' ? successCallBack && successCallBack({
            code: '0',
            data: isInstallApp,
        }) : failCallBack && failCallBack({
            code: '-1',
            message: isInstallApp,
        });
        break;
    }
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-查看是否安装某个应用'));
        break;
    }
};

/**
 * @description 图片上传
 * @param paramArr | array | 上传图片的ID数组 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.uploadPhotos = function (paramArr, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.uploadPhotos(paramArr, (success) => {
            let succeStr;
            if (WebDeviceType === 'ios') {
                succeStr = JSON.parse(success);
            } else {
                succeStr = success.replace(/'/g, '"');
                succeStr = JSON.parse(succeStr);
            }
            successCallBack && successCallBack(sdkResponse(succeStr,PLATFORM.WEB));
        }, (err) => {
            let errStr;
            if (WebDeviceType === 'ios') {
                errStr = JSON.parse(err);
            } else {
                errStr = err.replace(/'/g, '"');
                errStr = JSON.parse(errStr);
            }
            failCallBack && failCallBack(sdkResponse(errStr,PLATFORM.WEB));
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-图片上传'));
        break;
    }
};

/**
 * @description 查看自己的appid
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getMyselfAppId = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: { // Cordova端
        const myselfAppId = WebApp.getMyselfAppId();
        myselfAppId ? successCallBack && successCallBack({
            code: '0',
            data: myselfAppId,
        }) : failCallBack && failCallBack({
            code: '-1',
            message: myselfAppId,
        });
        break;
    }
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-查看自己的appid'));
    }
};

/**
 * @description 查看授权书
 * @param paramObj | object | 查看授权书信息 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.viewAuthorizedFile = function (paramObj, successCallBack, failCallBack) { // 整合成功失败回调 data为空
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.viewAuthorizedFile(paramObj.uri, paramObj.param);
        successCallBack && successCallBack(sdkResponse({
            code: '0',
            data: '',
        },PLATFORM.WEB));
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-查看授权书'));
        break;
    }
};

/**
 * @description 分享H5应用给联系人-暂无
 * @param paramObj | object | 参数 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.faSongFenXiang = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        paramObj = JSON.parse(paramObj);
        WebApp.faSongFenXiang(paramObj, (data) => {
            data = JSON.parse(data);
            if (data.flag == '0') {
                successCallBack && successCallBack(sdkResponse(data,PLATFORM.WEB));
            } else {
                failCallBack && failCallBack(sdkResponse(data,PLATFORM.WEB));
            }
        });
        break;
    case PLATFORM.RN: // React Native端
        failCallBack && failCallBack(modelAlert('RN原生插件暂无-分享H5应用给联系人'));
        break;
    }
};

/**
 * @Plugin react-native-mediamodule
 * @description 动态原生---图片加水印
 * @param {imagePath : string ,text : string ,location : string,textsize : string ,fileName : string} | Object | 参数的集合 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.watermark = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"watermark");
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: { // Cordova端
        const fileID = paramObj.imagePath;
        const quality = paramObj.quality || '50';
        const shuiYinText = paramObj.text || '图片水印';
        const pixeLW = paramObj.pixeLW || '60';
        const pixeLH = paramObj.pixeLH || '60';
        WebApp.compressAndwaterMark(fileID, quality, shuiYinText, pixeLW, pixeLH, (success) => {
            success = JSON.parse(success);
            if (success.flag == '0') {
                successCallBack && successCallBack(sdkResponse(success,PLATFORM.WEB));
            } else {
                failCallBack && failCallBack(sdkResponse(success,PLATFORM.WEB));
            }
        });
        break;
    }
    case PLATFORM.RN: { 
        DslSDK.watermark(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
    }
};

/**
 * @Plugin react-native-networkplugin 
 * @description 门户---文件上传通用接口
 * @param {url:string, filePaths : array[string]} | Object | 参数的集合 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @param onProgress | function | 进度回调 | 是 |
 * @return |
 */
WebSDK.uploadFile = function (paramObj, successCallBack, failCallBack, onProgress) {
    let item = $.api(paramObj,"uploadFile");
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        paramObj = JSON.stringify(paramObj);
        WebApp.uploadFile(paramObj, (err) => {
            err = JSON.parse(err);
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.WEB));
        }, (success) => {
            success = JSON.parse(success);
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.WEB));
        }, (pro) => {
            onProgress && onProgress(pro);
        });
        break;
    case PLATFORM.RN: // React Native端 没有进度回调
        DslSDK.fileUpload(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        if (onProgress) {
            onProgress({
                code: '404',
                data: 'RN原生暂无上传文件进度回调',
            });
        }
        break;
    }
};

/**
 * @Plugin react-native-mediaplay
 * @description 视频播放
 * @param paramStr | string | 视频路径 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.mediaPlayer = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,"mediaPlayer");
    if(item && !item.validate){
         alert(item.message);
         return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.playVideo(paramStr);
        successCallBack && successCallBack({
            code: '0',
            data: paramStr,
        });
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.mediaPlay({
            filePath: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-media
 * @description 动态原生/门户插件---拍摄视频组件
 * @param {quality:string,path:string,thumbnailWidth:string,thumbnailHeight:string} | object | 拍摄视频参数 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getMovie = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"getMovie");
    if(item && !item.validate){
         alert(item.message);
         return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        if (WebDeviceType === 'ios') {
            WebApp.luXiang(paramObj.appId, paramObj.desc, paramObj.pixeLW, paramObj.pixeLH, (success) => {
                const msgs = JSON.parse(success);
                if (msgs.flag == '0') {
                    successCallBack && successCallBack(sdkResponse(msgs,PLATFORM.WEB));
                } else {
                    failCallBack && failCallBack(sdkResponse(msgs,PLATFORM.WEB));
                }
            });
        } else {
            WebApp.luXiang(paramObj.appId, paramObj.desc, (success) => {
                const msgs = JSON.parse(success);
                if (msgs.flag == '0') {
                    successCallBack && successCallBack(sdkResponse(msgs,PLATFORM.WEB));
                } else {
                    failCallBack && failCallBack(sdkResponse(msgs,PLATFORM.WEB));
                }
            }, paramObj.pixeLW, paramObj.pixeLH);
        }
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getMovie({
            quality: paramObj.quality || '1',
            path: paramObj.path || '',
            thumbnailWidth: paramObj.thumbnailWidth,
            thumbnailHeight: paramObj.thumbnailHeight,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-filemanager
 * @description 写入文件
 * @param {content : string ,destinationPath  : string ,encryptKey  : string ,useKeyArchiver  : string  } | object | 文件内容 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.saveFile = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,'saveFile');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.writeFile(paramObj.content, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.WEB));
        });
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.saveFile(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 读取文件
 * @param {sourcePath : string,encryptKey :string,useKeyArchiver :string} | object | 文件内容 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.readFile = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,'readFile');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
       failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.readFile(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-filemanager
 * @description 文件压缩
 * @param {sourcePath : string,destinationPath:string} | object | 文件内容 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.compress = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,'compress');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
       failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.compress(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 剪切文件
 * @param {sourcePath :string,destinationPath : string} | object | 文件内容 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.cutFile = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,'cutFile');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.cutFile(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-filemanager
 * @description 拷贝文件
 * @param {sourcePath : string,destinationPath :string} | object | 文件内容 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.copyFile = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,'copyFile');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.copyFile(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 判断是否为文件路径
 * @param paramStr | string | 文件路径 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.directoryExistsAtPath = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,'directoryExistsAtPath');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.directoryExistsAtPath({
            sourcePath :  paramStr
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 创建文件夹 
 * @param paramStr | string | 文件路径 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.createDirectory = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,'createDirectory');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.createDirectory({
            sourcePath :  paramStr
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 删除文件夹 
 * @param paramStr | string | 文件路径 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.deleteDirectory = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,'deleteDirectory');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.deleteDirectory({
            sourcePath :  paramStr
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-filemanager
 * @description 获取文件夹下子目录 
 * @param {sourcePath :string ,locateFileType :string } | object | 文件内容 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getDirectorySubpaths  = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,'getDirectorySubpaths');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.getDirectorySubpaths(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};



/**
 * @Plugin react-native-filemanager
 * @description 判断文件是否存在
 * @param paramStr | string | 文件路径 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.fileExistsAtPath = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,'fileExistsAtPath');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.fileExistsAtPath({
            sourcePath :  paramStr
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 删除文件
 * @param paramStr | string | 文件路径 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.deleteFile = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,'deleteFile');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.deleteFile({
            sourcePath :  paramStr
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-filemanager
 * @description 获取文件相关信息
 * @param paramStr | string | 文件路径 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getFileInfo = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,'getFileInfo');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getFileInfo({
            sourcePath :  paramStr
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 获取文件全（绝对）路径
 * @param paramStr | string | 文件路径 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getAbsolutePath = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,'getAbsolutePath');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getAbsolutePath({
            sourcePath :  paramStr
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-networkplugin
 * @description 门户-通用文件下载
 * @param {remoteUrl:string,fileID:array[string]} | object | 文件参数的集合 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @param onProgress | function | 下载文件进度 | 否 |
 * @return |
 */
WebSDK.filesDownload = function (paramObj, successCallBack, failCallBack, onProgress) {
    let item = $.api(paramObj,'filesDownload');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.downloadFile(paramObj.uri, paramObj.path,
				(err) => {
    failCallBack && failCallBack(sdkResponse(err,PLATFORM.WEB));
        },(success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.WEB));
        },(pro) => {
            onProgress && onProgress(pro);
        });
                break;
    case PLATFORM.RN: // React Native端 没有进度回调
        DslSDK.filesDownload(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        if (onProgress) {
            onProgress({
                code: '404',
                data: 'RN原生暂无下载文件进度回调',
            });
        }
        break;
    }
};

/**
 * @Plugin react-native-databaseplugin
 * @description 适配库，js调用数据库  增加删除修改sql
 * @param paramStr | string | sql语句 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.execSQLite = function (paramStr, successCallBack, failCallBack) { // webapp没有成功失败回调，回到参数待验证
    let item = $.api(paramStr,'execSQLite');
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: { // Cordova端
        const execRes = WebApp.execSQLite(paramStr);
        if (execRes) {
            successCallBack && successCallBack({
                code: '0',
                data: execRes,
            });
        } else {
            failCallBack && failCallBack({
                code: '-1',
                message: execRes,
            });
        }
        break;
    }
    case PLATFORM.RN: // React Native端
        DslSDK.execSQLite({
            sql: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-databaseplugin
 * @description 适配库，js调用数据库  查询
 * @param {sql : string,condition:array[string]} | object | sql语句 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.querySQLite = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"querySQLite");
    if(item && !item.validate){
        alert(item.message);
        return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: { // Cordova端
        const queryRes = WebApp.querySQLite(paramObj.sql, paramObj.condition);
        if (queryRes.length > 0) {
            successCallBack && successCallBack(sdkResponse(queryRes,PLATFORM.WEB));
        } else {
            failCallBack && failCallBack(sdkResponse(queryRes,PLATFORM.WEB));
        }
        break;
    }
    case PLATFORM.RN: // React Native端
        DslSDK.querySQLite({
            sql: paramObj.sql,
            condition: paramObj.condition,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-photosmanage
 * @description 门户/动态原生---选本地图片文件
 * @param {thumbnailWidth : string , thumbnailHeight : string ,maxSelectCount : string} | object | 选取本地图片的信息| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.picture = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"picture");
    if(item && !item.validate){
        alert(item.message);
        return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        if (WebDeviceType === 'ios') {
            WebApp.choosePhoto(paramObj.appId, paramObj.desc, paramObj.thumbnailWidth, paramObj.thumbnailHeight, (success) => {
                successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
            }, (err) => {
                failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
            });
        } else {
            WebApp.choosePhoto(paramObj.appId, paramObj.desc, (success) => {
                successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
            }, (err) => {
                failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
            }, paramObj.thumbnailWidth, paramObj.thumbnailHeight);
        }
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.picture({
            thumbnailWidth: paramObj.thumbnailWidth,
            thumbnailHeight: paramObj.thumbnailHeight, 
            maxSelectCount : paramObj.maxSelectCount
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-photosmanage
 * @description 保存相册
 * @param paramStr | string | 图片路径 | 是
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.saveAlbum = function (paramStr,successCallBack, failCallBack) {
    let item = $.api(paramStr,"saveAlbum");
    if(item && !item.validate){
        alert(item.message);
        return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
    failCallBack && failCallBack(modelAlert('webView插件暂无-保存相册'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.saveAlbum({
            imagePath : paramStr
        },(success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (error) => {
            failCallBack && failCallBack(sdkResponse(error,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-photosmanage
 * @description 图片剪切
 * @param paramStr | string | 图片路径 | 是
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.shearImage = function (paramStr,successCallBack, failCallBack) {
    let item = $.api(paramStr,"shearImage");
    if(item && !item.validate){
        alert(item.message);
        return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
    failCallBack && failCallBack(modelAlert('webView插件暂无-保存相册'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.shearImage({
            imagePath : paramStr
        },(success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (error) => {
            failCallBack && failCallBack(sdkResponse(error,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-photosmanage
 * @description 图片压缩
 * @param {imagePath : string , size : string ,scale : string} | object | 图片压缩参数 | 是
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.compressImage = function (paramObj,successCallBack, failCallBack) {
    let item = $.api(paramObj,"compressImage");
    if(item && !item.validate){
        alert(item.message);
        return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
    failCallBack && failCallBack(modelAlert('webView插件暂无-保存相册'));
    break;
    case PLATFORM.RN: // React Native端
        DslSDK.compressImage(paramObj,(success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (error) => {
            failCallBack && failCallBack(sdkResponse(error,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-locationplugin
 * @description 获取当前位置
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getLocation = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.getLocation((success) => {
            let succeStr;
            if (WebDeviceType === 'ios') {
                succeStr = JSON.parse(success);
            } else {
                const succeArr = success.split("'info':");
                const succeArrL = succeArr[1].length;
                const suceeObj = succeArr[1].slice(2, succeArrL - 2);
                succeStr = `${succeArr[0].replace(/'/g, '"')}"info":${suceeObj}}`;
                succeStr = JSON.parse(succeStr);
            }
            successCallBack && successCallBack(sdkResponse(succeStr,PLATFORM.WEB));
        }, (err) => {
            let errStr;
            if (WebDeviceType === 'ios') {
                errStr = JSON.parse(err);
            } else {
                const errArr = err.split("'info':");
                const errArrL = errArr[1].length;
                const errObj = errArr[1].slice(2, errArrL - 2);
                errStr = `${errArr[0].replace(/'/g, '"')}"info":${errObj}}`;
                errStr = JSON.parse(errStr);
            }
            failCallBack && failCallBack(sdkResponse(errStr,PLATFORM.WEB));
        });
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getLocation((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (error) => {
            failCallBack && failCallBack(sdkResponse(error,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-webview
 * @description 使用默认浏览器打开网址
 * @param {httpUrl : string , openType : string} | object | 要打开的网址| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.openDefaultBrowser = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj, "openDefaultBrowser");
    if(item &&　!item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: { // Cordova端
        const status = WebApp.openDefaultBrowser(paramObj.httpUrl);
        status ? successCallBack && successCallBack({
            code: '0',
            data: status,
        }) : failCallBack && failCallBack({
            code: '-1',
            message: status,
        });
        break;
    }
    case PLATFORM.RN: // React Native端
        DslSDK.openWebView({
            url: paramObj.httpUrl,
            openType: paramObj.openType,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-media
 * @description 门户---拍照接口
 * @param {allowsEditing : bool ,thumbnailWidth : string ,thumbnailHeight : string } | object | 拍照参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getPhoto = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"getPhoto");
    if(item && !item.validate){
        alert(item.message);
        return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.takePhoto(paramObj.appId, paramObj.desc, (success) => {
            success = JSON.parse(success);
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            err = JSON.parse(err);
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        }, paramObj.thumbnailWidth, paramObj.thumbnailHeight);
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getPhoto({
            allowsEditing: paramObj.allowsEditing || false,
            thumbnailWidth: paramObj.thumbnailWidth,
            thumbnailHeight: paramObj.thumbnailHeight,
        }, (success) => { 
             successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-scanplugin 
 * @description 二维码扫描
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.scanQRCode = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        WebApp.scanQRCode((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.WEB));
        }, (fail) => {
            failCallBack && failCallBack(sdkResponse(fail,PLATFORM.WEB));
        });
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.ScanPluginScan((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-networkplugin
 * @description 网络请求
 * @param {url : string,params : object} | object | 请求数据的对象| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.netWork = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: { // Cordova端
        const onType = paramObj.type || 'POST';
        WebApp.invoke(paramObj.url, onType, JSON.stringify(paramObj.params), (success) => {
            success = JSON.parse(success);
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.WEB,));
        }, (fail) => {
            fail = JSON.parse(fail);
            failCallBack && failCallBack(sdkResponse(fail,PLATFORM.WEB));
        });
        break;
    }
    case PLATFORM.RN: // React Native端
        DslSDK.post({
            url: paramObj.url,
            params: paramObj.params,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-maillist
 * @description 动态原生---获取通讯录信息
 * @param paramStr | string | 通讯录获取类型(0打开通讯录进行选择,1:获取全部通讯录)| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getMailList = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr, 'getMailList')
	if (item && !item.validate) {
		alert(item.message);
		return;
	}
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-获取通讯录信息'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getMailList({
            type: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-contact
 * @description 动态原生---发短信
 * @param {phones : array[string],message : string} | object | 发短信的参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.sendMessage = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"sendMessage");
    if(item && !item.validate){
        alert(item.message);
        return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-发短信'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.sendMessage(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-contact
 * @description 动态原生---发送邮件
 * @param {to : array[string],cc : array[string],bcc : array[string],subject:string,body:string} | object | 发邮件的参数| 否 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.sendMail = function (paramObj, successCallBack, failCallBack) {
	let item = $.api(paramObj ,'sendMail')
	if (item && !item.validate) {
		alert(item.message);
		return;
	}
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-发送邮件'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.sendEmail(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-contact
 * @description 动态原生---打电话
 * @param paramStr | string | 电话号码| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getCallPhone = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,"getCallPhone");
    if(item && !item.validate){
       alert(item.message);
       return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-打电话'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getCallPhone({
            phone: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-contact
 * @description 动态原生---打电话2
 * @param paramStr | string | 电话号码| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getCallStatusAndTime = function (paramStr, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-打电话'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getCallStatusAndTime({
            phone: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-recordaudio
 * @description 动态原生---播放录音
 * @param paramStr | string | 录音地址| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.playAudio = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,"playAudio");
    if(item && !item.validate){
       alert(item.message);
       return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-播放录音'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.playAudio({
            audioPath: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success ,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err ,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-recordaudio
 * @description 动态原生---开始录音
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.startAudio = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-开始录音'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.startAudio((success) => {
            successCallBack && successCallBack(sdkResponse(success ,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err ,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @description 动态原生---录音初始化2
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.audioInit = function (paramStr, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-开始录音'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.audioInit({
            audioPath: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @description 动态原生---开始录音2
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */

WebSDK.audioPlay = function (paramStr, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-开始录音'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.audioPlay(
            {
                time: paramStr,
            }
			, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @description 动态原生---录音暂停
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.audioPause = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-开始录音'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.audioPause((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-customkeyboard 
 * @description 动态原生---键盘配置/弹出/消失方法
 * @param {isUp:string,isRandom:string} | object | 键盘配置| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.onKeyboard = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"onKeyboard");
    if(item && !item.validate){
        alert(item.message);
        return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-键盘配置/弹出/消失方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.onKeyboard(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-bluetoothplugin
 * @description 动态原生---蓝牙初始化初始化
 * @param  {peripheralName : string ,peripheralServiceID : string ,peripheralCharacteristicID :string } | object | 键盘配置| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.initPeripheral = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"initPeripheral");
    if(item && !item.validate){
        alert(item.message);
        return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-键盘配置/弹出/消失方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.initPeripheral(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-bluetoothplugin
 * @description 动态原生---蓝牙发送消息
 * @param  {data : string} | object | 键盘配置| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.sendData = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"sendData");
    if(item && !item.validate){
        alert(item.message);
        return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-键盘配置/弹出/消失方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.sendData(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-bluetoothplugin
 * @description 动态原生---蓝牙断开链接|
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.disconnectBlueTooth = function ( successCallBack, failCallBack) {   
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-键盘配置/弹出/消失方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.disconnectBlueTooth((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-pwdlockplugin
 * @description 动态原生---设置密码
 * @param paramStr | string | 关键字| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.SetPwdLock = function (paramStr,successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-设置密码'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.SetPwdLock({
            id: paramStr
        },(success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-pwdlockplugin
 * @description 动态原生---九宫格
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.DecryptLock = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-九宫格密码校验'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.DecryptLock((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 动态原生---偏好数据保存
 * @param {key:string,value:string,encryptKey:string} | object | 偏好数据| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.saveDefaults = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"saveDefaults");
    if(item && !item.validate){
        alert(item.message);
        return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-偏好数据保存'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.saveDefaults(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 动态原生---获取偏好数据
 * @param {key:string, encryptKey:string} | object | 关键字| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getDefaults = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"getDefaults");
    if(item && !item.validate){
        alert(item.message);
        return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-获取偏好数据'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getDefaults(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 动态原生---删除偏好数据
 * @param paramStr | string | 关键字| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.removeDefaults = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,"removeDefaults");
    if(item && !item.validate){
        alert(item.message);
        return
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-删除偏好数据'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.removeDefaults({
            key: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};
 
/**
 * @Plugin react-native-notification
 * @description 动态原生---获取保存在本地的推送消息
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getNotifications = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-获取保存在本地的推送消息'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getNotifications((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-notification
 * @description 动态原生---设置推送消息桌面角标
 * @param {count: string} | object | 关键字| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.setNotificationBadgeNumber = function (paramObj,successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-设置推送消息桌面角标'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.setNotificationBadgeNumber({...paramObj},(success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-notification
 * @description 动态原生---修改本地推送消息已读未读状态
 * @param paramObj | object | 修改本地推送消息 | 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.setNotificationStatus = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-修改本地推送消息已读未读状态'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.setNotificationStatus(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-notification
 * @description 动态原生---删除本地推送消息已读未读状态
 * @param paramStr | string | 标志| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.deleteNotification = function (paramStr, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-删除一条消息'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.deleteNotification({
            id: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-deviceplugin
 * @description 动态原生---获取设备信息
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getDeviceName = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-获取设备信息'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getDeviceName((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-deviceplugin
 * @description 动态原生---获取设备Ip
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getDeviceIp = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-获取设备Ip'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getDeviceIp((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-deviceplugin
 * @description 动态原生---获取设备Id
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getDeviceId = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-获取设备Id'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getDeviceId((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-deviceplugin
 * @description 动态原生---获取屏幕分辨率
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getScaleScreen = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-获取设备信息'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getScaleScreen((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-networkplugin
 * @description 网络初始化方法
 * @param {initURL: string,saveUpSecURL:string} | object | 初始化参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.initHttps = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"initHttps");
    if(item && !item.validate){
       alert(item.message);
       return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-网络初始化方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.initHttps(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-statistics
 * @description 动态原生---初始化方法
 * @param paramObj | object | 事件所需集合| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.init = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"init");
    if(item && !item.validate){
       alert(item.message);
       return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-初始化方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.init({
            key: paramObj.key,
            url: paramObj.url,
            post: paramObj.post,
            postTime: paramObj.postTime,
            isDebug: paramObj.isDebug,
            isUpdate: paramObj.isUpdate,
            isUpdateOnline: paramObj.isUpdateOnline,
            tag: paramObj.tag,
            userID: paramObj.userID,
            isUpdateOnlyWIFI: paramObj.isUpdateOnlyWIFI,
            isSendLocation: paramObj.isSendLocation,
            sessionTime: paramObj.sessionTime,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-statistics
 * @description 动态原生---点击事件统计
 * @param paramStr | string | 事件描述| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.click = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,"click");
    if(item && !item.validate){
       alert(item.message);
       return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-点击事件统计'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.click({
            click: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-statistics
 * @description 动态原生---结束页面统计
 * @param paramStr | string | 页面ID| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.endPage = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,"endPage");
    if(item && !item.validate){
       alert(item.message);
       return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-结束页面统计'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.endPage({
            page: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-statistics
 * @description 动态原生---开始页面统计
 * @param paramStr | string | 页面ID| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.startPage = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,"startPage");
    if(item && !item.validate){
       alert(item.message);
       return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-开始页面统计'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.startPage({
            page: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @description 动态原生---上传日志
 * @param paramStr | string | 上传路径| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.uploadLog = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,"uploadLog");
    if(item && !item.validate){
         alert(item.message);
         return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-上传日志'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.uploadLog({
            uploadUrl: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @description 动态原生---删除日志
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.deleteLog = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-删除日志'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.deleteLog((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @description 动态原生---JS记录日志
 * @param paramStr | string | 日志信息| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.recordJsLog = function (paramStr, successCallBack, failCallBack) {
    let item = $.api(paramStr,"recordJsLog");
    if(item && !item.validate){
         alert(item.message);
         return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-js记录日志'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.recordJsLog({
            jsLog: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-shareplugin
 * @description 动态原生---分享图片、文本、链接到QQ
 * @param {url : string, title :string ,description :string , image:string} | object | 分享信息| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.shareQQ = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.shareQQ({
            url: paramObj.url,
            title: paramObj.title,
            description: paramObj.description,
            image: paramObj.image,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-shareplugin
 * @description 动态原生---分享图片、文本、链接到QQ空间
 * @param {url : string, title :string ,description :string , image:string} | object | 分享信息| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.shareQQZone = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.shareQQZone({
            url: paramObj.url,
            title: paramObj.title,
            description: paramObj.description,
            image: paramObj.image,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-shareplugin
 * @description 动态原生---分享图片、文本、链接到微信
 * @param {url : string, title :string ,description :string , image:string} | object | 分享信息| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.shareWeixin = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.shareWeixin({
            url: paramObj.url,
            title: paramObj.title,
            description: paramObj.description,
            image: paramObj.image,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-shareplugin
 * @description 动态原生---分享图片、文本、链接到微信朋友圈
 * @param {url : string, title :string ,description :string , image:string} | object | 分享信息| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.shareWeixinCircle = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.shareWeixinCircle({
            url: paramObj.url,
            title: paramObj.title,
            description: paramObj.description,
            image: paramObj.image,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-shareplugin
 * @description 动态原生---分享图片、文本、链接到新浪微博
 * @param {url : string, title :string ,description :string , image:string} | object | 分享信息| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.shareXinLang = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.shareXinLang({
            url: paramObj.url,
            title: paramObj.title,
            description: paramObj.description,
            image: paramObj.image,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-map
 * @description 动态原生---地图定位当前位置
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.showCurrentLocation = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-地图定位当前位置'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.showCurrentLocation((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-map
 * @description 动态原生---地图定位指定位置
 * @param paramStr | string | 指定位置| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.showLocation = function (paramStr, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-地图定位指定位置'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.showLocation({
            locationInfo: paramStr,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @description 动态原生---获取通话时间以及打电话状态
 * @param phone | string | 手机号码| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getCallStatusAndTime = function (phone, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getCallStatusAndTime({
            phone: phone,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-deviceplugin
 * @description 动态原生---获取系统版本号
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getSystemVersion = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.getSystemVersion((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @description 动态原生---活体检测
 * @param paramObj | Object | 检测所需参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.livingCheck = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.livingCheck({
            liveLevel: paramObj.liveLevel,
            licence: paramObj.licence,
            liveCount: paramObj.liveCount,
            isFaceCompare: paramObj.isFaceCompare,
            faceImage: paramObj.faceImage,
            faceserver: paramObj.faceserver,
            faceappid: paramObj.faceappid,
            faceappser: paramObj.faceappser,
        }, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @description 动态原生---手写签名
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.signature = function (successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.signature((success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-microapplicationplugin
 * @description 动态原生---打开bundle
 * @param paramObj | Object | 检测所需参数| 是 |   
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.openWebMicroApplication = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.openWebMicroApplication(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};


/**
 * @Plugin react-native-microapplicationplugin
 * @description 动态原生---打开h5
 * @param paramObj | Object | 检测所需参数| 是 |   
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.openMicroApplication = function (paramObj, successCallBack, failCallBack) {
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.openMicroApplication(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-filemanager
 * @description 动态原生---解压文件
 * @param  {sourcePath : string,destinationPath:string} | Object | 检测所需参数| 是 |     
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.decompression = function (paramObj, successCallBack, failCallBack) {
    let item =$.api(paramObj,"decompression");
    if(item && !item.validate){
       alert(item.message);
       return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.decompression(paramObj, (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-calendar
 * @description 动态原生---添加日历事件
 * @param {title : string,startDate : string,endDate : string,notes : string} | Object | 所需参数| 是 |  
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.addCalenderEvent = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj,"addCalenderEvent");
    if(item && !item.validate){
        alert(item.message);
        return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.addCalenderEvent(paramObj
         , (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-calendar
 * @description 动态原生---获取日历事件集合
 * @param {startDate : string,endDate :string} | Object | 所需参数 | 是 |    
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.checkCalenderEvent = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj ,"checkCalenderEvent");
    if(item && !item.validate){
       alert(item.message);
       return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.checkCalenderEvent(paramObj
         , (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-calendar
 * @description 动态原生---删除日历事件
 * @param {eventIdentifier : string} | Object | 检测所需参数| 是 |  
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.removeCalenderEvent = function (paramObj, successCallBack, failCallBack) {
    let item = $.api(paramObj ,"removeCalenderEvent");
    if(item && !item.validate){
       alert(item.message);
       return;
    }
    switch (typeOfEnvironment) {
    case PLATFORM.WEB: // Cordova端
        failCallBack && failCallBack(modelAlert('webView插件暂无-分享方法'));
        break;
    case PLATFORM.RN: // React Native端
        DslSDK.removeCalenderEvent(paramObj
         , (success) => {
            successCallBack && successCallBack(sdkResponse(success,PLATFORM.RN));
        }, (err) => {
            failCallBack && failCallBack(sdkResponse(err,PLATFORM.RN));
        });
        break;
    }
};

/**
 * @Plugin react-native-customization
 * @description 动态原生---获取蓝牙状态
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.checkBlueToothState = function(successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.checkBlueToothState(function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---打开蓝牙
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.turnToBlueToothView = function(successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.turnToBlueToothView(function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---搜索蓝牙设备
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.searchDevices = function(successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.searchDevices(function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---停止搜索蓝牙
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.canceSearchDevices = function(successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.canceSearchDevices(function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---获取身份证信息
 * @param paramObj | object | 
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getIdCardInfo = function(paramObj,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.getIdCardInfo({
					deviceMac: paramObj.deviceMac,
				    timeout: paramObj.timeout
					},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---获取行政区划
 * @param address | string | 
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getAddressInfo = function(address,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.getAddressInfo({address},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---获取发证机关
 * @param authority | string | 
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getAuthorityInfo = function(authority,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.getAuthorityInfo({authority},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---获取身份证信息(正面)
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getIdCardInfoByImageFront = function(successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.getIdCardInfoByImageFront(function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---获取身份证信息(反面)
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getIdCardInfoByImageBack = function(successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.getIdCardInfoByImageBack(function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---登陆接口
 * @param username | string | 用户名
 * @param password | string | 密码
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.login = function(userName,passWord,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.login({userName,passWord},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---Invoke接口
 * @param svcScn | string | 
 * @param Svccd | string | 
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.invoke = function(SvcScn,Svccd,params,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.invoke({SvcScn,Svccd,params},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---上传接口
 * @param filePath | string | 上传地址
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.uploadFileRn = function(filePath,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.uploadFileRn({filePath},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---下载接口
 * @param fileId | string |
 * @param fileNo | string | 下载文件编号
 * @param filename | string |  下载生成文件名称
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.downloadFile = function(fileId,fileNo,fileName,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.downloadFile({fileId,fileNo,fileName},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---查询省市区集合
 * @param addressId | string | 为省市区信息的upperregion字段，如果传值为空字符串，则查询所有省份信息
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.queryProvinceOrSubsetId = function(addressId,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.queryProvinceOrSubsetId({addressId},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---获取已匹配设备信息
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.getConnectedList = function(successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.getConnectedList(function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---设置图片缓存个数
 * @param imageNum | int | 数量
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.setImageNum = function(imageNum,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.setImageNum({imagenum:imageNum},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---清除Cookie
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.cleanCookie = function(successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.cleanCookie(function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---断开蓝牙连接
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.disconnect = function(successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.disconnect(function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---身份证合成正面
 * @param paramObj | object | 
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.doCombinationFront = function(paramObj,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.doCombinationFront({
					name: paramObj.name,
				    sex: paramObj.sex,
					nation: paramObj.nation,
					birthday: paramObj.birthday,
					address: paramObj.address,
					id: paramObj.id,
					headImage:paramObj.headImage,
					manage:paramObj.manage
					},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---身份证合成反面
 * @param paramObj | object | 
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.doCombinationBack = function(paramObj,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.doCombinationBack({
					authority: paramObj.authority,
				    startDate: paramObj.startDate,
					endDate: paramObj.endDate
					
					
					},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}

/**
 * @Plugin react-native-customization
 * @description 动态原生---图片路径是否存在
 * @param paramObj | object | 
 * @param successCallBack | function | 成功回调 | 是 |
 * @param failCallBack | function | 失败回调 | 是 |
 * @return |
 */
WebSDK.pictureIsExists = function(paramObj,successCallBack, failCallBack){
	switch (typeOfEnvironment) {
		case PLATFORM.WEB: //Cordova端
			failCallBack && failCallBack(modelAlert('webView插件暂无'));;
			break;
		case PLATFORM.RN: //React Native端
			if(Platform.OS === 'ios'){
				failCallBack && failCallBack(modelAlert('iOS插件暂无'));;
			}else{
				DslSDK.pictureIsExists({
					picturePath: paramObj.picturePath
					},function (success) {
					successCallBack && successCallBack(successPipe(success));
				}, function (err) {
					failCallBack && failCallBack(errorRes(PLATFORM.RN, err));
				});
			}
			break;
	}
}


export {
	WebSDK,
};
