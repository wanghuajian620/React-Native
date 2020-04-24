package com.cib.library;

import android.os.Environment;

import java.io.File;

/**
 * Created by Jun on 2019/6/27.
 */

public class BaseConstant {

    // 微信 APP_ID 替换为你的应用从官方网站申请到的合法appId
    public static final String APP_ID = "wx3f32af5f32318b1e";
    /*创建五种路径地址*/
    public static final String project_address = "reactnative/";//project
    public static final String defaults_address =  "default/";    //defaults
    public static final String home_address = "";        //home
    public static final String caches_address = "file/";        //caches
    public static final String temp_address = "temp/";        //tmp
    /** QQ 的APP_KEY */
    public static final String mAppid  = "1107923792";

    /** 当前 微博 APP_KEY，第三方应用应该使用自己的 APP_KEY 替换该 APP_KEY */
    public static final String APP_KEY = "1495691434";

    /**
     * 当前 DEMO 应用的回调页，第三方应用可以使用自己的回调页。
     *
     * <p>
     * 注：关于授权回调页对移动客户端应用来说对用户是不可见的，所以定义为何种形式都将不影响，
     * 但是没有定义将无法使用 SDK 认证登录。
     * 建议使用默认回调页：https://api.weibo.com/oauth2/default.html
     * </p>
     */
    public static final String REDIRECT_URL = "https://api.weibo.com/oauth2/default.html";

    /**
     * Scope 是 OAuth2.0 授权机制中 authorize 接口的一个参数。通过 Scope，平台将开放更多的微博
     * 核心功能给开发者，同时也加强用户隐私保护，提升了用户体验，用户在新 OAuth2.0 授权页中有权利
     * 选择赋予应用的功能。
     *
     * 我们通过新浪微博开放平台-->管理中心-->我的应用-->接口管理处，能看到我们目前已有哪些接口的
     * 使用权限，高级权限需要进行申请。
     *
     * 目前 Scope 支持传入多个 Scope 权限，用逗号分隔。
     *
     * 有关哪些 OpenAPI 需要权限申请，请查看：http://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI
     * 关于 Scope 概念及注意事项，请查看：http://open.weibo.com/wiki/Scope
     */
    public static final String SCOPE =
            "email,direct_messages_read,direct_messages_write,"
                    + "friendships_groups_read,friendships_groups_write,statuses_to_me_read,"
                    + "follow_app_official_microblog," + "invitation_write";
    public static final String wechat_id = "0";

    public static final String wechatTimeline_id = "1";

    public static final String weibosina_id = "2";


    public static final String FILE_PATH = "filePath";
    public static final String IMAGE_SMALL = "thumbnailPath";
    public static final String IMAGE_PATH = "imagePath";

    public static final String DcimCameraAgree = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM).getAbsolutePath()+ File.separator+"Camera"+File.separator;

    public static final String SdPath = Environment.getExternalStorageDirectory().getAbsolutePath()+"/";
    public static final String LATITUDE = "latitude";       //经度
    public static final String LONGITUDE = "longtude";      //纬度
    public static final String ADDRESS = "address";         //具体位置
    public static final String COUNTRYCODE = "countrycode"; //国家代码
    public static final String SUBLOCALITY = "sublocality"; //区
    public static final String COUNTRY = "country";         //国家
    public static final String CITY = "city";               //城市

    /*录音时间*/
    public static final String TIME="time";
    /*录音地址*/
    public static  final String PATH="path";

    public static final String LOCAL_PATH="/storage/emulated/0";

    public static final int BLUETOOTH_SERVICE_BIND = 6;
    /*默认缩略图高度*/
    public static final int DEFAULT_THUMBNAIL_HEIGHT = 300;
    /*默认缩略图宽度*/
    public static final int DEFAULT_THUMBNAIL_WIDTH = 300;
    /*默认视频识别回调*/
    public static final int REQUEST_VIDEO = 101;
    /*默认PIC回调*/
    public static final int REQUEST_PIC = 102;
}
