package com.cib.library;

/**
 * Created by liudan on 2019/6/26.
 */

public class BaseResultCode {
    //rn统一返回值字段名
    public static final String RESULT_CODE = "resultCode";
    public static final String RESULT_MESSAGE = "resultMessage";
    //未授权权限组code

    public static final int PERMISSI_BLUETOOTH = 7002;//蓝牙权限
    public static final int PERMISSI_CALENDAR_AUSAGE = 7003;//读写日历权限
    public static final int PERMISSI_NOCAMER_AUSAGE = 7004;//相机权限
    public static final int PERMISSI_READ_CONTACTS = 7005;//获取联系人权限
    public static final int PERMISSI_LOCATION = 7010;
    public static final int PERMISSI_RECORDAUDIO = 7011;//录音权限
    public static final int PERMISSI_PHOTOSMANAGE = 7014;//图片权限

    public static final int PERMISSI_EXTERNAL_STORAGE = 7019;//读写SD卡权限
    public static final int PERMISSI_SIHARE = 7020;//分享权限
    public static final int PERMISSI_SIGNATURE = 7021;//签名权限
    public static final int PERMISSI_STATISTIC = 7022;//统计权限
    public static final int PERMISSI_INTERNET = 7023;//网络权限
    public static final int PERMISSI_CALL_PHONE = 7024;//打电话权限
    public static final int PERMISSI_SEND_SMS = 7025;//发短信权限
    public static final int PERMISSI_MEDIA = 7026;//视频权限
    public static final int PERMISSI_MEDIAMODULE = 7027;//图片加水印权限
    public static final int PERMISSI_FILEMANAGER = 7028;//文件管理权限
    public static final int PERMISSI_LOCATION_GPS = 7029;//GPS定位权限
    public static final int PERMISSI_LOCATION_INTERNET = 7030;//网络定位权限
    public static final int PERMISSI_GET_DEVICE = 7031;//获取设备信息

    //定位
    public static final int LOCATION_FAILED = 6202;

    //获取联系人
    public static final int MY_JUMP_NUMBER = 101;
    public static final int MAILLIST_GET_FAILED = 6203;//获取联系人失败
    public static final int MAILLIST_ACTIVITY_NOTEXIST = 6204;//跳转activity不存在

    //日历操作失败返回结果码
    public static final int CALENDAR_ADD_FAILED = 6240;//日历事件添加失败
    public static final int CALENDAR_DELETE_FAILED = 6244;//日历事件删除失败
    public static final int CALENDAR_NOID_CODE = 6245;//日历账户id不存在
    public static final int CALENDAR_ADD_CALLING_FAILED = 6246;//日历事件添加提醒失败
    public static final int CALENDAR_ID_NOTFOUND = 6247;//日历事件id未找到
    public static final int CALENDAR_LIST_FAILED = 6248;//获取日历事件失败

    //webview打开失败
    public static final int WEBVIEW_OPEN_FAILED = 6250;

    //二维码识别失败返回的结果码
    public static final int SCAN_USER_CANCELLED = 6260; //用户取消
    public static final int SCAN_NORESULT = 6261;

    //文件管理插件
    public static final int FAILED_PRESERVATION_CODE = 6272;//保存失败

    public static final int FAIL_TO_READ_FILE_CODE = 6276;//读取文件失败
    public static final int FILE_DIRECTORY_ALREADY_EXISTS_CODE = 6280;//文件目录已存在
    public static final int FOLDER_DOES_NUOT_EXIST_CODE = 6281;//文件夹不存在
    public static final int FAILED_DIRECTORY_CREATION_FAILED_CODE = 6282;//文件目录创建失败
    public static final int FAILED_FOLDER_OF_FILES_CODE = 6283;//删除文件夹失败
    public static final int FAILED_DELETION_OF_PREFERCE_DATA_CODE = 6291;//删除偏好数据失败
    public static final int FAILED_TO_OBTAIN_DATA_CODE = 6292;//获取数据失败
    public static final int Z_FAILED_DECOMPRESSION_CODE = 6301;//7z解压失败
    public static final int FAILED_DELETION_OF_FILE_CODE = 6275;//删除文件失败

    public static final int FILE_DECOMPRESSION_FORMAT_IS_NOT_SUPPORTED_CODE = 6302;//文件解压格式不支持
    public static final int UPZIPFILE_FAILED_DECOMPRESSION__CODE = 6424;

    //录音
    public static final int RECORDIO_NO_INIT = 6310;//录音未初始化
    public static final int RECORDIO_FILE_NOTEXIST = 6311;//录音文件未找到

    public static final int RECORDIO_FAILED = 6313;//录音失败
    public static final int RECORDIO_NOT_START = 6314;//录音未开始
    public static final int RECORDIO_PLAY_FAILED = 6315;//录音播放失败
    public static final int AUDIO_PROGRESS_ERROR = 6316;//音频进度错误


    //图片插件失败返回的结果码
    public static final int SYSTEM_CUT_PICTURE_FAILED_CODE= 6321;//系统剪切图片失败
    public static final int FAILED_TO_SAVE_ALBUM_CODE= 6322;//相册保存失败

    public static final int FAILED_PICTURES_ALBUMS_CODE = 6325; //从相册获取图片失败
    public static final int PROPORTIONAL_COMPRESSION_FAILED_CODE= 6326;//比例压缩失败
    public static final int PIXEL_COMPRESSION_FAILED_CODE= 6327;//像素压缩失败
    public static final int COMPRESSION_FAILED_BY_IMAGESIZE_CODE= 6328;//按图片大小压缩失败
    public static final int WARTERMARKING_FAILED_CODE= 6329;//图片加水印失败

    //视频插件失败返回的结果码
    public static final int VIDEO_DOES_NOT_EXIST_CODE= 6340;//视频不存在
    public static final int SYSTEM_VIDEO_FAILED_CODE= 6341;//创建临时图片文件失败
    public static final int FAILED_TO_CREATE_TEMPORARY_IMAGEFILE_CODE= 6342;//系统摄像失败
    public static final int FAILED_PHOTOS_CODE= 6343;//拍照失败
    public static final int FAILED_COMPRESS_MOVIE_CODE= 6344;//压缩视频失败

    //分享rn失败返回值code
    public static final int SHARE_QQ_FAILD_CODE = 6350;//QQ分享失败
    public static final int SHARE_QZONE_FAILD_CODE = 6351;//QQ空间分享失败
    public static final int SHARE_WEChCHAT_FAILE_CODE = 6352;//微信分享失败
    public static final int SHARE_WECHATCIRCLE_FAILD_CODE = 6353;//微信朋友圈分享失败
    public static final int SHARE_SINA_FAILD_CODE = 6354;//新浪微博分享失败

    public static final int SHARE_QQ_CANCEL_CODE = 6355;//QQ分享取消
    public static final int SHARE_WECCHAT_CABNCEL_CODE = 6356;//微信分享取消
    public static final int SHARE_WECHAT_UNSUPPORT_CODE = 6357;//微信分享不支持
    public static final int SHARE_WECHAT_UNKNOWN_CODE = 6358;//微信分享未知错误
    public static final int SHARE_WECHAT_DENIED_CODE = 6359;//微信发送被拒绝
    public static final int SHARE_SINA_CANCEL_CODE = 6349;//新浪微博分享取消

    //日志操作失败返回值code
    public static final int RUNLOG_Delete_Failed_CODE = 6361;//日志删除失败
    public static final int RUNLOG_Record_JsLog_Failed_CODE = 6362;//js日志记录失败
    public static final int RUNLOG_Upload_NoneFile_CODE = 6363;//无日志文件

    //蓝牙
    public static final int BLUETOOTH_NO_SERVICEID = 6378;//没有外设服务ID或者外设服务特征ID
    public static final int BLUETOOTH_VERSION_NOT_SUPPORTE = 6379;//蓝牙版本不支持
    public static final int BLUETOOTH_DISCONNECTED = 6380;//蓝牙未连接外设
    public static final int BLUETOOTH_UNINITIALIZED = 6381;//蓝牙未初始化
    public static final int BLUETOOTH_INITIALIZED_FAILED = 6382;//初始化失败

    //数据库
    public static final int DATABASE_CREATETAB_FAILED = 6395;//创建数据表失败
    public static final int DATABASE_QUERY_FAILED = 6396;//数据库查询失败


    //获取本地消息
    public static final int NOTIFICATION_UPDATA_FAILED = 6411;
    public static final int NOTIFICATION_DELETE_FAILED = 6413;
    public static final int NOTIFICATION_QUERY_FAILED = 6412;
    public static final int NotificationBadgeFaild = 6415;


    //网络
    public static final int NETWORK_SERVICES_RESPONSE_FAILED = 6422;//接口数据返回错误
    public static final int NETWORK_UPLOAD_FILE_DAILED = 6425;//数据上传失败
    public static final int NETWORK_DOWNLOAD_FAILED = 6426;//数据下载失败
    public static final int NETWORK_CONNECT_ERR = 6427;//网络连接失败
    public static final int NETWORK_UNKONW_ENCRYPTYPE = 6428; //未知加密方式
    public static final int NETWORK_DATA_CORRUPTED = 6429;//签名不一致,数据遭篡改
    public static final int NETWORK_DATA_UNDENCRTY_FAILED = 6430;//数据解密失败
    public static final int NETWORK_DATA_UNZIP_FAILED = 6431;//数据解压失败
    public static final int NETWORK_UPLOAD_PERIMISSION = 6432;//数据上传权限无
    public static final int NETWORK_DOWNLOAD_FAILED_EXCEPTION = 6433;//数据下载失败




    //所有rn失败返回值code
    public static final int SIGNATURE_ERROR =2000 ;//签名失败
    public static final int STATISTIC_ERROR =2001 ;//统计失败

    //所有startactivityforresult 的resultcode
    public static final int QR_REQUEST_CODE = 1000;//二维码插件code
    public static final int QR_ERROR_CODE = 1001;
    public static final int SG_REQUEST_CODE = 1002;//签名插件code
    /*拍照选择码*/
    public static final int PHOTO_GRAPH = 1003;
    /* 剪切请求识别码 */
    public static final int CODE_PHOTO_GALLERY_REQUEST = 1004;
    /* 剪切请求识别码 */
    public static final int CODE_GALLERY_REQUEST = 1005;
    /* 选择图片识别码 */
    public static final int CODE_REQUEST_IMAGE = 1006;
    /*视频选择码*/
    public static final int VIDEO_GRAPH = 1007;
    public static final int PWDSET_REQUEST_CODE = 1008;//签名插件code
    public static final int PWDDEC_REQUEST_CODE = 1009;//签名插件cod
    /*录音码*/
    public static final int RECORD_REQUEST_CODE = 1010;
    //密码键盘的返回值
    public static final int KEYBOARD_NOVALUE = 6400;//返回值为空


    //键盘插件code信息
    public static final int CODE_DELETE=-5;
    public static final int CODE_DONE=-3;
    public static final int CODE_ABC=-1;
    public static final int CODE_NUM=-2;
    public static final int CODE_SYMBOLS=-7;
    public static final int CODE_CHANGE=-1;


    //ocr权限
    public static final int PERMISSI_YMOCR = 6444;



    //全局通用回调
    //rn统一返回值code 成功返回
    public static final int RESULT_CODE_VALUE = 0;
    public static final int CODE_PARAMETER_ERROR = 6100;//入参格式错误
    public static final int CODE_PARAMETER_CANNOT_BENULL = 6101; //入参不能为空
    public static final int CODE_IMAGEPATH_NON_EXIST = 6102; //图片路径不存在
    public static final int CODE_URL_NON_OPEN = 6103;//连接网络失败！请检查网络
    public static final int CODE_EXCEPTION = 6104;//catch异常
    public static final int FILE_DOES_NOT_EXIST = 6105;//文件不存在
    public static final int CODE_EXCEPTION_ZIP_ERROR = 6106;

    public static final int CODE_CANCLE = 6107;//取消
}
