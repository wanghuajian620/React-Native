package com.cib.library;

import java.net.PortUnreachableException;

/**
 * Created by liudan on 2019/6/26.
 * 此类用于统一的返回值的提示信息，为了做国际化中英文等适配
 */

public class BaseResultValue {
    //未获取相机权限
    public static final int PermissionNoCameraUsageMessage = R.string.PermissionNoCameraUsageMessage;
    //二维码识别失败返回的结果提示信息
    public static final int ScanNoResultMessage = R.string.ScanNoResultMessage;
    //二维码识别时用户取消识别提示信息
    public static final int ScanUserCancelledMessage = R.string.ScanUserCancelledMessage;
    //入参格式错误
    public static final int ParameterError = R.string.ParameterError;
    //入参不能为空
    public static final int ParameterCannotNull = R.string.ParameterCannotNull;
    //未获取网络权限
    public static final int PermissionNoInternetMessage = R.string.PermissionNoInternetMessage;
    //未获取读写SD卡权限
    public static final int PermissionNoExternalStorageMessage = R.string.PermissionNoExternalStorageMessage;
    //读写日历未授权
    public static final int PermissionCalendarAusage = R.string.PermissionNoCalendarMessage;
    //获取日历id失败
    public static final int CalendarNoID = R.string.CalendarNoID;
    //日历事件添加失败
    public static final int CalendarAddFailed = R.string.CalendarAddFailed;
    //添加日历提醒事件失败
    public static final int CalendarAddCallingFailed = R.string.CalendarAddCallingFailed;
    //日历事件添加成功
    public static final int CalendarAddSuccess = R.string.CalendarAddSuccess;
    //删除日历事件失败
    public static final int CalendarDeleteFailed = R.string.CalendarDeleteFailed;
    //删除日历事件成功
    public static final int CalendarDeleteSuccess = R.string.CalendarDeleteSuccess;
    //日历事件id不存在
    public static final int CalendarIdNotdfound =  R.string.CalendarIdNotdfound;
    //获取日历事件集合失败
    public static final int CalendarListFailed =  R.string.CalendarListFailed;
    //获取日历事件集合成功
    public static final int CalendarListSuccess = R.string.CalendarListSuccess;
    //未获取网络权限

    //未获取统计权限
    public static final int PermissionStatisticsMessage = R.string.PermissionStatisticsMessage;
    //统计插件初始化成功
    public static final int StatisticsSuccessMessage = R.string.StatisticsSuccessMessage;
    //统计插件初始化成功
    public static final int StatisticsSuccess = R.string.StatisticsSuccess;
    //统计插件初始化失败
    public static final int StatisticsFailMessage = R.string.StatisticsFailMessage;


    //未获取签名权限
    public static final int PermissionSignatureFailMessage = R.string.PermissionSignatureFailMessage;
    //签名成功
    public static final int SignatureSuccess = R.string.SignatureSuccess;
    //签名失败
    public static final int SignatureFail = R.string.SignatureFail;

    //分享插件
    public static final int PermissionShareMessage = R.string.PermissionShareMessage;//未获取分享权限
    public static final int ShareQQSuccessMessage =  R.string.ShareQQSuccessMessage; //QQ分享成功
    public static final int ShareQQFaildMessage = R.string.ShareQQFaildMessage;//QQ分享失败
    public static final int ShareQQCanceldMessage = R.string.ShareQQFaildMessage;//QQ分享取消
    public static final int ShareQZoneSuccessMessage = R.string.ShareQZoneSuccessMessage;//QQ空间分享成功
    public static final int ShareQZoneFaildMessage = R.string.ShareQZoneFaildMessage;//QQ空间分享失败
    public static final int ShareWeChatSuccessMessage = R.string.ShareWeChatSuccessMessage; //微信分享成功
    public static final int ShareWeChatFaildMessage = R.string.ShareWeChatFaildMessage;//微信分享失败
    public static final int ShareWeChatCanceldMessage = R.string.ShareQQFaildMessage;//微信分享取消
    public static final int ShareWeChatUnsupportedMessage = R.string.ShareQQFaildMessage;//微信分享不支持
    public static final int ShareWeChatUnknownMessage = R.string.ShareQQFaildMessage;//微信分享未知错误
    public static final int ShareWeChatDeniedMessage = R.string.ShareQQFaildMessage;//微信发送被拒绝
    public static final int ShareWeChatCircleSuccessMessage = R.string.ShareWeChatCircleSuccessMessage;//微信朋友圈分享成功
    public static final int ShareWeChatCircleFaildMessage = R.string.ShareWeChatCircleFaildMessage;//微信朋友圈分享失败
    public static final int ShareSinaSuccessMessage = R.string.ShareSinaSuccessMessage;//新浪微博分享成功
    public static final int ShareSinaFaildMessage = R.string.ShareSinaFaildMessage;//新浪微博分享失败
    public static final int ShareSinaCanceldMessage = R.string.ShareQQFaildMessage;//新浪微博分享取消

    //密码键盘插件
    public static final int KeyBoardNoValue = R.string.KeyBoardNoValue;
    //日志插件-runlogplugin
    public static final int RunLogDeleteFailedMessage = R.string.RunLogDeleteFailedMessage;
    public static final int RunLogUploadNoneFileMessage = R.string.RunLogUploadNoneFileMessage;
    public static final int RunLogUploadFailedMessage = R.string.RunLogUploadFailedMessage;
    //打电话，发短信
    public static final int RunLogRecordJsLogFailedMessage = R.string.RunLogRecordJsLogFailedMessage;

    //获取定位信息失败
    public static final int LocationFailed = R.string.LocationFailed;
    public static final int PermissionLocation = R.string.PermissionLocation;
    public static final int PermissionLicationGps = R.string.PermissionLicationGps;


    //PhotosManage 图片插件
    public static final int PermissionPhotosMessage = R.string.PermissionPhotosMessage;//未获取图片权限
    public static final int FailedToPicturesFromAlbumsMessage = R.string.FailedToPicturesFromAlbumsMessage;//从相册获取图片失败
    public static final int SystemCutPictureFailedMessage = R.string.SystemCutPictureFailedMessage;//系统剪切图片失败
    public static final int CutPictureSuccessMessage = R.string.CutPictureSuccessMessage;//剪切图片成功
    public static final int FailedToSaveAlbumMessage = R.string.FailedToSaveAlbumMessage;//相册保存失败
    public static final int SuccessToSaveAlbumMessage = R.string.SuccessToSaveAlbumMessage;//相册保存成功
    public static final int ProportionalCompressionFailureMessage = R.string.ProportionalCompressionFailureMessage;//比例压缩失败
    public static final int PixelCompressionFailedMessage = R.string.PixelCompressionFailedMessage;//像素压缩失败
    public static final int CompressionFailedByImageSizeMessage = R.string.CompressionFailedByImageSizeMessage;//按图片的大小压缩失败


    //PhotosManage 图片插件
    public static final int PermissionMediaMessage = R.string.PermissionMediaMessage;//未获取视频权限
    public static final int SystemVideoFailedMessage = R.string.SystemVideoFailedMessage;//系统摄像失败
    public static final int CreateTempoparyImagefileFailedMessage = R.string.CreateTempoparyImagefileFailedMessage;
    public static final int FailedPhotosMessage = R.string.FailedPhotosMessage;//拍照失败
    public static final int CompressMovieFailedMessage = R.string.CompressMovieFailedMessage;
    public static final int VideoDoesNotExistMessage = R.string.VideoDoesNotExistMessage;

    //未获取图片加水印权限
    public static final int PermissionMediaModuleFailMessage = R.string.PermissionMediaModuleFailMessage;
    public static final int WaterMarkingFailMessage = R.string.WaterMarkingFailMessage;

    public static final int PermissionCallPhone = R.string.PermissionCallPhone;
    public static final int PermissionSendSms = R.string.PermissionSendSms;
    //获取联系人
    public static final int MaillistGetFailed = R.string.MaillistGetFailed ;
    public static final int MaillistActivityNoExist = R.string.MaillistActivityNoExist;
    public static final int PermissiReadContacts = R.string.PermissiReadContacts;
    public static final int PermissionLocationInternet = R.string.PermissionLocationInternet;

    public static final int PermissionGetDevice = R.string.PermissionGetDevice;
    public static final int RecordFileNotExist = R.string.RecordFileNotExist;
    public static final int PermissiRecordAudio = R.string.PermissiRecordAudio;
    public static final int RecordFailed = R.string.RecordFailed;
    public static final int RecordioInitSuccess = R.string.RecordioInitSuccess;
    public static final int RecordioNotInit = R.string.RecordioNotInit;
    public static final int RecordioStart = R.string.RecordioStart;
    public static final int RecordioNotStart = R.string.RecordioNotStart;
    public static final int RecordioIng = R.string.RecordioIng;
    public static final int Recordioed = R.string.Recordioed;
    public static final int RecordioPlayFailed = R.string.RecordioPlayFailed;
    public static final int AudioProgressError = R.string.AudioProgressError;

    //文件管理插件
    public static final int PermissionFileManagerMessage = R.string.PermissionFileManagerMessage;
    public static final int FailedPreservation = R.string.FailedPreservation;
    public static final int SuccessfulPreservation = R.string.SuccessfulPreservation;
    public static final int FailedToObtainData = R.string.FailedToObtainData;
    public static final int SuccessfulDeletionOfPreferenceData = R.string.SuccessfulDeletionOfPreferenceData;
    public static final int FailedDeletionOfPreferenceData = R.string.FailedDeletionOfPreferenceData;
    public static final int FileDecompressionFormatIsNotSupported = R.string.FileDecompressionFormatIsNotSupported;
    public static final int upZipFileSuccessfulDecompression = R.string.upZipFileSuccessfulDecompression;
    public static final int upZipFileFailedDecompression = R.string.upZipFileFailedDecompression;
    public static final int unRarSuccessfulDecompression = R.string.unRarSuccessfulDecompression;
    public static final int zSuccessfulDecompression = R.string.zSuccessfulDecompression;
    public static final int zFailedDecompression = R.string.zFailedDecompression;
    public static final int exception_zip_error = R.string.exception_zip_error;
    public static final int FailToReadFile = R.string.FailToReadFile;
    public static final int FilePathDoesNotExist = R.string.FilePathDoesNotExist;
    public static final int SuccessfulCopyingOfFiles = R.string.SuccessfulCopyingOfFiles;
    public static final int SuccessfulFileClipping = R.string.SuccessfulFileClipping;
    public static final int SuccessfulDeletionOfFiles = R.string.SuccessfulDeletionOfFiles ;
    public static final int SuccessfulFolderOfFiles = R.string.SuccessfulFolderOfFiles ;
    public static final int FailedDeletionOfFiles = R.string.FailedDeletionOfFiles ;
    public static final int FolderDoesNotExist = R.string.FolderDoesNotExist;
    public static final int FileDirectoryAlreadyExists = R.string.FileDirectoryAlreadyExists;
    public static final int DocumentExistence = R.string.DocumentExistence;
    public static final int FileDirectoryCreationSuccessful = R.string.FileDirectoryCreationSuccessful;
    public static final int FileDirectoryCreationFailed = R.string.FileDirectoryCreationFailed;
    public static final int FailedFolderOfFiles = R.string.FailedFolderOfFiles ;
    public static final int PwdSetSuccess = R.string.PwdSetSuccess;
    public static final int PwdUnlockSuccess = R.string.PwdUnlockSuccess;

    public static final int PermissiBluetooth = R.string.PermissiBluetooth;
    public static final int BluetoothSendDataSuccess = R.string.BluetoothSendDataSuccess;
    public static final int BluetoothVersionNotSupporte = R.string.BluetoothVersionNotSupporte;
    public static final int BluetoothNoServiceid = R.string.BluetoothNoServiceid;
    public static final int BluetoothUninitialized = R.string.BluetoothUninitialized;
    public static final int BluetoothinitializSuccess = R.string.BluetoothinitializSuccess;
    public static final int BluetoothinitializFailed = R.string.BluetoothinitializFailed;
    public static final int BluetoothDisconnected = R.string.BluetoothDisconnected;
    public static final int BluetoothConnectioSuccess  = R.string.BluetoothConnectioSuccess;

    public static final int DatabaseInitSuccess = R.string.DatabaseInitSuccess;
    public static final int DatabaseInitFailed = R.string.DatabaseInitFailed;
    public static final int DatabaseQueryFailed = R.string.DatabaseQueryFailed;

    public static final int YmocrPermission = R.string.YmocrPermission;

    public static final int NotificationBadgeFaild = R.string.NotificationBadgeFaild;
    public static final int NotificationBadgeSuccess = R.string.NotificationBadgeSuccess;
    public static final int NotificationUpdataSuccess = R.string.NotificationUpdataSuccess;
    public static final int NotificationUpdataFailed = R.string.NotificationUpdataFailed;
    public static final int NotificationDeleteSuccess = R.string.NotificationDeleteSuccess;
    public static final int NotificationDeleteFailed = R.string.NotificationDeleteFailed;
    public static final int NotificationQueryFailed = R.string.NotificationQueryFailed;

    public static final int NetworkConnectErr = R.string.NetworkConnectErr;
    public static final int NetworkInitSuccess = R.string.NetworkInitSuccess;
    public static final int NetworkUnkonwEncryptType = R.string.NetworkUnkonwEncryptType;
    public static final int NetworkDataCorrupted = R.string.NetworkDataCorrupted;
    public static final int NetworkUploadSuccess = R.string.NetworkUploadSuccess;
    public static final int NetworkUploadFailed = R.string.NetworkUploadFailed;
    public static final int NetworkUploadPermission = R.string.NetworkUploadPermission;
    public static final int NetworkDownloadFailed = R.string.NetworkDownloadFailed;
    public static final int NetworkDownloadFailedException = R.string.NetworkDownloadFailedException;
    public static final int NetworkDataUnzipFailed = R.string.NetworkDataUnzipFailed;
    public static final int NetworkDataUnDencrtyFailed = R.string.NetworkDataUnzipFailed;

    //方法调用成功
    public static final int Success = R.string.Success;
    public static final int ImagePathNonExistMessage = R.string.ImagePathNonExistMessage;//图片路径不存在
    public static final int ImagePathIllegal = R.string.ImagePathIllegal;//图片路径非法
    public static final int UrlNonOpenMessage = R.string.UrlNonOpenMessage;//连接网络失败！请检查网络
    public static final int CodeException = R.string.CodeException;//catch异常
    public static final int CodeCancle = R.string.CodeCancle;
    public static final int GoToTelPhoneSuccess = R.string.GoToTelPhoneSuccess;

    //webview打开失败
    public static final int WebviewOpenFailed = R.string.WebviewOpenFailed;
}
