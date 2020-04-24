// import lib
let $rn = {};
try {
    $rn = require('react-native');
} catch (e) {
    console.log('web环境不支持');
}
const NativeModules = $rn.NativeModules;

module.exports = {
    // 地图定位当前位置
    showCurrentLocation: (params, successCallBack, errorCallback) => NativeModules.MapPlugin.showCurrentLocation(
        { ...params },
        successCallBack,
        errorCallback),
    // 地图定位指定位置
    showLocation: (params, successCallBack, errorCallback) => NativeModules.MapPlugin.showLocation(
        { ...params },
        successCallBack,
        errorCallback),
    // 下载remoteUrl:"http://static.tripbe.com/videofiles/20121214/9533522808.f4v.mp4",id:"1"
    filesDownload: (params, successCallBack, errorCallback) => NativeModules.NetWorkPlugin.fileDownLoad(
        { ...params },
        successCallBack,
        errorCallback),

    // js调用原生执行sql语句
    execSQLite: (params, successCallBack, errorCallback) => NativeModules.DataBasePlugin.execSQLite(
        { ...params },
        successCallBack,
        errorCallback),

    // 二维码条形码扫描组件
    ScanPluginScan: (successCallBack, errorCallBack) => NativeModules.ScanPlugin.scanCode(successCallBack, errorCallBack),

    // 拍照组件
    getPhoto: (params, successCallBack, errorCallBack) => NativeModules.Media.getPhoto({ ...params }, successCallBack, errorCallBack),

    // 文件上传接口
    fileUpload: (params, successCallBack, errorCallBack) => NativeModules.NetWorkPlugin.fileUpload({ ...params }, successCallBack, errorCallBack),

    // 默认浏览器打开地址
    openWebView: (params, successCallBack, errorCallBack) => NativeModules.Webview.open({ ...params }, successCallBack, errorCallBack),

    // 获取用户当前地理位置
    getLocation: (successCallBack, errorCallBack) => NativeModules.LocationPlugin.LocationInfo(successCallBack, errorCallBack),

    // 获取通讯录信息
    getMailList: (params, successCallBack, errorCallBack) => NativeModules.MailList.getMailList({ ...params }, successCallBack, errorCallBack),

    // 设置推送消息桌面角标
    setNotificationBadgeNumber: (params, successCallBack, errorCallBack) => NativeModules.Notification.setNotificationBadgeNumber( {...params },successCallBack, errorCallBack),
    
    // 获取保存在本地的推送消息
    getNotifications: (successCallBack, errorCallBack) => NativeModules.Notification.getNotifications(successCallBack, errorCallBack),
   
    // 获取某一状态消息
    getNotificationsByStatus: (params, successCallBack, errorCallBack) => NativeModules.Notification.getNotificationsByStatus({
        ...params,
    }, successCallBack, errorCallBack),

    // 按照id获取保存在本地的推送消息
    getNotificationById: (params, successCallBack, errorCallBack) => NativeModules.Notification.getNotificationById({
        ...params,
    }, successCallBack, errorCallBack),

    // 保存本地推送消息，用于本地消息修改
    setNotificationStatus: (params, successCallBack, errorCallBack) => NativeModules.Notification.setNotificationStatus({
        ...params,
    }, successCallBack, errorCallBack),

    // 删除一条消息
    deleteNotification: (params, successCallBack, errorCallBack) => NativeModules.Notification.deleteNotification({
        ...params,
    }, successCallBack, errorCallBack),

    // 删除消息
    deleteAllNotification: (successCallBack, errorCallBack) => NativeModules.Notification.deleteAllNotification(successCallBack, errorCallBack),

    // 文件保存
    saveFile: (params, successCallBack, errorCallBack) => NativeModules.FileManager.saveFile({
        ...params,
    }, successCallBack, errorCallBack),

    // 文件读取
    readFile: (params, successCallBack, errorCallBack) => NativeModules.FileManager.readFile({
        ...params,
    }, successCallBack, errorCallBack),

    // 文件复制
    copyFile: (params, successCallBack, errorCallBack) => NativeModules.FileManager.copyFile({
        ...params,
    }, successCallBack, errorCallBack),

    // 文件剪切
    cutFile: (params, successCallBack, errorCallBack) => NativeModules.FileManager.cutFile({
        ...params,
    }, successCallBack, errorCallBack),

    // 文件删除
    deleteFile: (params, successCallBack, errorCallBack) => NativeModules.FileManager.deleteFile({
        ...params,
    }, successCallBack, errorCallBack),

    // 判断是否是文件夹
    directoryExistsAtPath: (params, successCallBack, errorCallBack) => NativeModules.FileManager.directoryExistsAtPath({
        ...params,
    }, successCallBack, errorCallBack),

    // 判断文件是否存在
    fileExistsAtPath: (params, successCallBack, errorCallBack) => NativeModules.FileManager.fileExistsAtPath({
        ...params,
    }, successCallBack, errorCallBack),

    // 创建文件夹
    createDirectory: (params, successCallBack, errorCallBack) => NativeModules.FileManager.createDirectory({
        ...params,
    }, successCallBack, errorCallBack),

    // 删除文件夹
    deleteDirectory: (params, successCallBack, errorCallBack) => NativeModules.FileManager.deleteDirectory({
        ...params,
    }, successCallBack, errorCallBack),

    // 获取文件全（绝对）路径
    getAbsolutePath: (params, successCallBack, errorCallBack) => NativeModules.FileManager.getAbsolutePath({
        ...params,
    }, successCallBack, errorCallBack),

    // 获取文件夹下子目录
    getDirectorySubpaths: (params, successCallBack, errorCallBack) => NativeModules.FileManager.getDirectorySubpaths({
        ...params,
    }, successCallBack, errorCallBack),

    // 获取文件信息
    getFileInfo: (params, successCallBack, errorCallBack) => NativeModules.FileManager.getFileInfo({
        ...params,
    }, successCallBack, errorCallBack),

    // 蓝牙初始化初始化
    initPeripheral: (params, successCallBack, errorCallBack) => NativeModules.BlueToothPlugin.initPeripheral({
        ...params,
    }, successCallBack, errorCallBack),

    // 蓝牙发送消息
    sendData: (params, successCallBack, errorCallBack) => NativeModules.BlueToothPlugin.sendData({
        ...params,
    }, successCallBack, errorCallBack),

    // 蓝牙断开链接
    disconnectBlueTooth: (successCallBack, errorCallBack) => NativeModules.BlueToothPlugin.disconnectBlueTooth(successCallBack, errorCallBack),

    // 初始化完成事件(需订阅事件通知)
    EventReminder_BTInitCompletionForRN: (successCallBack, errorCallBack) => NativeModules.BlueToothPlugin.EventReminder_BTInitCompletionForRN(successCallBack, errorCallBack),

    // 扫描到蓝牙设备(需订阅事件通知)
    EventReminder_SearchBTCompletionForRN: (successCallBack, errorCallBack) => NativeModules.BlueToothPlugin.EventReminder_SearchBTCompletionForRN(successCallBack, errorCallBack),

    // 打电话
    getCallPhone: (params, successCallBack, errorCallBack) => NativeModules.Contact.getCallPhone({
        ...params,
    }, successCallBack, errorCallBack),

    // 发短信
    sendMessage: (params, successCallBack, errorCallBack) => NativeModules.Contact.sendMessage({
        ...params,
    }, successCallBack, errorCallBack),

    // 发送邮件
    sendEmail: (params, successCallBack, errorCallBack) => NativeModules.Contact.sendEmail({
        ...params,
    }, successCallBack, errorCallBack),

    // 添加日历事件
    addCalenderEvent: (params, successCallBack, errorCallBack) => NativeModules.Calendar.addCalenderEvent({
        ...params,
    }, successCallBack, errorCallBack),

    // 获取日历事件集合
    checkCalenderEvent: (params, successCallBack, errorCallBack) => NativeModules.Calendar.checkCalenderEvent({
        ...params,
    }, successCallBack, errorCallBack),

    // 删除日历事件
    removeCalenderEvent: (params, successCallBack, errorCallBack) => NativeModules.Calendar.removeCalenderEvent({
        ...params,
    }, successCallBack, errorCallBack),

    // 拍摄视频组件
    getMovie: (params, successCallBack, errorCallBack) => NativeModules.Media.getMovie({
        ...params,
    }, successCallBack, errorCallBack),

    // 文件解压
    decompression: (params, successCallBack, errorCallBack) => NativeModules.FileManager.decompression({
        ...params,
    }, successCallBack, errorCallBack),

    // 压缩文件
    compress: (params, successCallBack, errorCallBack) => NativeModules.FileManager.compress({
        ...params,
    }, successCallBack, errorCallBack),

    // 相册选择
    picture: (params, successCallBack, errorCallBack) => NativeModules.PhotosManage.picture({
        ...params,
    }, successCallBack, errorCallBack),

    // 保存相册
    saveAlbum: (params, successCallBack, errorCallBack) => NativeModules.PhotosManage.saveAlbum({
        ...params,
    }, successCallBack, errorCallBack),

    // 图片剪切
    shearImage: (params, successCallBack, errorCallBack) => NativeModules.PhotosManage.shearImage({
        ...params,
    }, successCallBack, errorCallBack),

    // 图片压缩
    compressImage: (params, successCallBack, errorCallBack) => NativeModules.PhotosManage.compressImage({
        ...params,
    }, successCallBack, errorCallBack),

    // 快捷录音:需订阅事件通知(recordCallBack),
    audio: (successCallBack, errorCallBack) => NativeModules.RecordAudio.audio(successCallBack, errorCallBack),

    // 录音初始化2
    audioInit: (params, successCallBack, errorCallBack) => NativeModules.AudioMoudle.audioInit({
        ...params,
    }, successCallBack, errorCallBack),

    // 音频播放
    audioPlay: (params, successCallBack, errorCallBack) => NativeModules.AudioMoudle.audioPlay({
        ...params,
    }, successCallBack, errorCallBack),

    // 音频暂停
    audioPause: (successCallBack, errorCallBack) => NativeModules.AudioMoudle.audioPause(successCallBack, errorCallBack),

    // 录音初始化
    initAudio: (params, successCallBack, errorCallBack) => NativeModules.RecordAudio.initAudio({
        ...params,
    }, successCallBack, errorCallBack),

    // 开始录音
    startAudio: (successCallBack, errorCallBack) => NativeModules.RecordAudio.startAudio(successCallBack, errorCallBack),

    // 结束录音
    stopAudio: (successCallBack, errorCallBack) => NativeModules.RecordAudio.stopAudio(successCallBack, errorCallBack),

    // 获取录音时间
    getAudioTime: (successCallBack, errorCallBack) => NativeModules.RecordAudio.getAudioTime(successCallBack, errorCallBack),

    // 获取录音状态
    getAudioStatus: (successCallBack, errorCallBack) => NativeModules.RecordAudio.getAudioStatus(successCallBack, errorCallBack),

    // 播放录音
    playAudio: (params, successCallBack, errorCallBack) => NativeModules.RecordAudio.playAudio({
        ...params,
    }, successCallBack, errorCallBack),

    // 键盘配置/弹出/消失方法
    onKeyboard: (params, successCallBack, errorCallBack) => NativeModules.KeybordPlugin.onKeyboard({
        ...params,
    }, successCallBack, errorCallBack),

    // 键盘解密
    /* decryptKeyboard: (params, successCallBack, errorCallBack) => NativeModules.KeybordPlugin.decryptKeyboard({
         ...params
     }, successCallBack, errorCallBack),*/

    // 偏好数据保存
    saveDefaults: (params, successCallBack, errorCallBack) => NativeModules.FileManager.saveDefaults({
        ...params,
    }, successCallBack, errorCallBack),

    // 获取偏好数据
    getDefaults: (params, successCallBack, errorCallBack) => NativeModules.FileManager.getDefaults({
        ...params,
    }, successCallBack, errorCallBack),

    // 删除偏好数据
    removeDefaults: (params, successCallBack, errorCallBack) => NativeModules.FileManager.removeDefaults({
        ...params,
    }, successCallBack, errorCallBack),

    // 数据库存储
    setData: (params, successCallBack, errorCallBack) => NativeModules.DataBasePlugin.setData({
        ...params,
    }, successCallBack, errorCallBack),

    // 最简数据库获取
    getData: (params, successCallBack, errorCallBack) => NativeModules.DataBasePlugin.getData({
        ...params,
    }, successCallBack, errorCallBack),

    // 简化数据库-添加记录
    addData: (params, successCallBack, errorCallBack) => NativeModules.DataBasePlugin.addData({
        ...params,
    }, successCallBack, errorCallBack),

    // 简化数据库-删除记录
    removeData: (params, successCallBack, errorCallBack) => NativeModules.DataBasePlugin.removeData({
        ...params,
    }, successCallBack, errorCallBack),

    // 简化数据库-修改记录
    alterData: (params, successCallBack, errorCallBack) => NativeModules.DataBasePlugin.alterData({
        ...params,
    }, successCallBack, errorCallBack),

    // 简化数据库-查询记录
    queryData: (params, successCallBack, errorCallBack) => NativeModules.DataBasePlugin.queryData({
        ...params,
    }, successCallBack, errorCallBack),

    // 简化数据库-执行sql并返回状态
    alterDataBySql: (params, successCallBack, errorCallBack) => NativeModules.DataBasePlugin.alterDataBySql({
        ...params,
    }, successCallBack, errorCallBack),


    // 简化数据库-执行sql并返回状态 -- querySQLite  查询数据sql
    querySQLite: (params, successCallBack, errorCallBack) => NativeModules.DataBasePlugin.querySQLite({
        ...params,
    }, successCallBack, errorCallBack),


    // 简化数据库-执行多条sql语句,并返回处理状态
    alterDataBySqls: (params, successCallBack, errorCallBack) => NativeModules.DataBasePlugin.alterDataBySqls({
        ...params,
    }, successCallBack, errorCallBack),

    // 简化数据库-执行sql语句并返回结果
    queryDataBySql: (params, successCallBack, errorCallBack) => NativeModules.DataBasePlugin.queryDataBySql({
        ...params,
    }, successCallBack, errorCallBack),

    // 设置密码
    SetPwdLock: (params, successCallBack, errorCallBack) => NativeModules.PwdLockPlugin.SetPwdLock({ ...params }, successCallBack, errorCallBack),

    // 九宫格密码校验
    DecryptLock: (successCallBack, errorCallBack) => NativeModules.PwdLockPlugin.DecryptLock(successCallBack, errorCallBack),

    // 获取下载任务
    getDownLoadTask: (params, successCallBack, errorCallBack) => NativeModules.DownLoad.getDownLoadTask({
        ...params,
    }, successCallBack, errorCallBack),


    // 获取下载任务列表
    getDownLoadTaskList: (successCallBack, errorCallBack) => NativeModules.DownLoad.getDownLoadTaskList(successCallBack, errorCallBack),

    // 删除下载任务
    removeDownLoadTask: (params, successCallBack, errorCallBack) => NativeModules.DownLoad.removeDownLoadTask({
        ...params,
    }, successCallBack, errorCallBack),

    // 暂停下载任务
    pauseDownLoadTask: (params, successCallBack, errorCallBack) => NativeModules.DownLoad.pauseDownLoadTask({
        ...params,
    }, successCallBack, errorCallBack),

    // 暂停所有下载
    pauseAllDownLoadTask: (params, successCallBack, errorCallBack) => NativeModules.DownLoad.pauseAllDownLoadTask({
        ...params,
    }, successCallBack, errorCallBack),

    // 暂停所有下载
    removeAllDownLoadTask: (params, successCallBack, errorCallBack) => NativeModules.DownLoad.removeAllDownLoadTask({
        ...params,
    }, successCallBack, errorCallBack),

    // 图片加水印
    watermark: (params, successCallBack, errorCallBack) => NativeModules.MediaModule.watermark({
        ...params,
    }, successCallBack, errorCallBack),

    // 分享到QQ
    shareQQ: (params, successCallBack, errorCallBack) => NativeModules.SharePlugin.shareQQ({
        ...params,
    }, successCallBack, errorCallBack),

    // 分享到QQ空间
    shareQQZone: (params, successCallBack, errorCallBack) => NativeModules.SharePlugin.shareQQZone({
        ...params,
    }, successCallBack, errorCallBack),

    // 分享到微信
    shareWeixin: (params, successCallBack, errorCallBack) => NativeModules.SharePlugin.share({
        ...params,
    }, successCallBack, errorCallBack),

    // 分享到微信朋友圈
    shareWeixinCircle: (params, successCallBack, errorCallBack) => NativeModules.SharePlugin.shareWeixinCircle({
        ...params,
    }, successCallBack, errorCallBack),

    // 分享到新浪微博
    shareXinLang: (params, successCallBack, errorCallBack) => NativeModules.SharePlugin.shareXinLang({
        ...params,
    }, successCallBack, errorCallBack),

    // 统计初始化方法
    init: (params, successCallBack, errorCallBack) => NativeModules.Statistics.init({
        ...params,
    }, successCallBack, errorCallBack),

    // 开始页面统计
    startPage: (params, successCallBack, errorCallBack) => NativeModules.Statistics.startPage({
        ...params,
    }, successCallBack, errorCallBack),

    // 结束页面统计
    endPage: (params, successCallBack, errorCallBack) => NativeModules.Statistics.endPage({
        ...params,
    }, successCallBack, errorCallBack),

    // 页面点击事件统计
    click: (params, successCallBack, errorCallBack) => NativeModules.Statistics.click({
        ...params,
    }, successCallBack, errorCallBack),

    // 视频播放
    mediaPlay: (params, successCallBack, errorCallBack) => NativeModules.MediaPlay.mediaPlayer({
        ...params,
    }, successCallBack, errorCallBack),

    // 获取设备信息
    getDeviceName: (successCallBack, errorCallBack) => NativeModules.DeviceMoudle.getDeviceName(successCallBack, errorCallBack),

    // 获取设备IP
    getDeviceIp: (successCallBack, errorCallBack) => NativeModules.DeviceMoudle.getDeviceIp(successCallBack, errorCallBack),

    // 获取设备Id
    getDeviceId: (successCallBack, errorCallBack) => NativeModules.DeviceMoudle.getDeviceId(successCallBack, errorCallBack),

    // 获取屏幕分辨率
    getScaleScreen: (successCallBack, errorCallBack) => NativeModules.DeviceMoudle.getScaleScreen(successCallBack, errorCallBack),

    // 地图点击事件
    onMapClick: (successCallBack, errorCallBack) => NativeModules.BaiduMap.onMapClick(successCallBack, errorCallBack),

    // 百度地图标注点的点击事件
    onMarkerClick: (successCallBack, errorCallBack) => NativeModules.BaiduMap.onMarkerClick(successCallBack, errorCallBack),

    // 网络初始化方法
    initHttps: (params, successCallBack, errorCallBack) => NativeModules.NetWorkPlugin.initHttps({
        ...params,
    }, successCallBack, errorCallBack),
    // 发送请求
    post: (params, successCallBack, errorCallBack) => NativeModules.NetWorkPlugin.post({
        ...params,
    }, successCallBack, errorCallBack),

    // 上传日志
    uploadLog: (params, successCallBack, errorCallBack) => NativeModules.RunLogPlugin.uploadLog(params, successCallBack, errorCallBack),

    // 删除日志
    deleteLog: (successCallBack, errorCallBack) => NativeModules.RunLogPlugin.deleteLog(successCallBack, errorCallBack),

    // 记录js日志
    recordJsLog: (params, successCallBack, errorCallBack) => NativeModules.RunLogPlugin.recordJsLog({
        ...params,
    }, successCallBack, errorCallBack),

    // 获取网络信息
    getNetInfo: (successCallBack, errorCallBack) => NativeModules.NetWorkPlugin.getNetInfo(successCallBack, errorCallBack),

    // 获取通话时间以及打电话状态
    getCallStatusAndTime: (params, successCallBack, errorCallBack) => NativeModules.Contact.getCallStatusAndTime({
        ...params,
    }, successCallBack, errorCallBack),

    // 获取系统版本号
    getSystemVersion: (successCallBack, errorCallBack) => NativeModules.DeviceMoudle.getSystemVersion(successCallBack, errorCallBack),

    // 活体检测
    livingCheck: (params, successCallBack, errorCallBack) => NativeModules.LivingCheckPlugin.livingCheck({
        ...params,
    }, successCallBack, errorCallBack),

    // 手写签名
    signature: (successCallBack, errorCallBack) => NativeModules.SignaturePlugin.signature(successCallBack, errorCallBack),
    // 打开web
    openWebMicroApplication: (params, successCallBack, errorCallBack) => NativeModules.MicroApplicationPlugin.openWebMicroApplication(params, successCallBack, errorCallBack),
    // 打开bundle
    openMicroApplication: (params, successCallBack, errorCallBack) => NativeModules.MicroApplicationPlugin.openMicroApplication(params, successCallBack, errorCallBack),


    //蓝牙插件获取身份证信息
    getIdCard: (successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.getIdCard(successCallBack, errorCallBack) },

    //获取蓝牙状态
    checkBlueToothState: (successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.checkBlueToothState(successCallBack, errorCallBack) },

    //打开蓝牙
    turnToBlueToothView: (successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.turnToBlueToothView(successCallBack, errorCallBack) },

    //搜索蓝牙设备
    searchDevices: (successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.searchDevices(successCallBack, errorCallBack) },

    //停止搜索蓝牙
    canceSearchDevices: (successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.canceSearchDevices(successCallBack, errorCallBack) },

    //获取身份证信息
    getIdCardInfo: (params, successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.getIdCardInfo({ ...params }, successCallBack, errorCallBack) },

    //获取行政区划
    getAddressInfo: (address, successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.getAddressInfo(address, successCallBack, errorCallBack) },

    //获取发证机关
    getAuthorityInfo: (authority, successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.getAuthorityInfo(authority, successCallBack, errorCallBack) },

    //获取身份证信息(正面)
    getIdCardInfoByImageFront: (successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.getIdCardInfoByImageFront(successCallBack, errorCallBack) },

    //获取身份证信息(反面)
    getIdCardInfoByImageBack: (successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.getIdCardInfoByImageBack(successCallBack, errorCallBack) },

    //登陆接口
    login: (userInfo, successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.login(userInfo, successCallBack, errorCallBack) },

    //Invoke接口
    invoke: (svcScn, successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.invoke(svcScn, successCallBack, errorCallBack) },

    //上传接口
    uploadFileRn: (filePath, successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.uploadFile(filePath, successCallBack, errorCallBack) },

    //下载接口
    downloadFile: (fileInfo, successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.downloadFile(fileInfo, successCallBack, errorCallBack) },

    //查询省市区集合
    queryProvinceOrSubsetId: (addressId, successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.queryProvinceOrSubsetId(addressId, successCallBack, errorCallBack) },

    //获取已匹配设备信息
    getConnectedList: (successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.getConnectedList(successCallBack, errorCallBack) },

    //设置图片缓存个数
    setImageNum: (imageNum, successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.setImageNum(imageNum, successCallBack, errorCallBack) },

    //清除Cookie
    cleanCookie: (successCallBack, errorCallBack) => { NativeModules.CustomzatiomPlugin.cleanCookie(successCallBack, errorCallBack) },

    //蓝牙断开连接
    disconnect: (successCallBack, errorCallBack) => NativeModules.CustomzatiomPlugin.disconnect(successCallBack, errorCallBack),

    //合成身份证反面
    doCombinationBack: (params, successCallBack, errorCallBack) => NativeModules.CustomzatiomPlugin.doCombinationBack({ ...params }, successCallBack, errorCallBack),

    //合成身份证正面
    doCombinationFront: (params, successCallBack, errorCallBack) => NativeModules.CustomzatiomPlugin.doCombinationFront({ ...params }, successCallBack, errorCallBack),

    //检查图片是否存在
    pictureIsExists: (params, successCallBack, errorCallBack) => NativeModules.CustomzatiomPlugin.pictureIsExists({ ...params }, successCallBack, errorCallBack),
};
