package com.rnproject.base;

import android.os.Environment;
import com.rnproject.BuildConfig;

import java.io.File;

/**
 * Created by liudan on 2018/3/20.
 */

public class Const {
    public static final String NOTICEACTION = "com.cib.android.notice";
    /*apk更新*/
    public static final String CHECK_APK_NEWVIERSION = "/ApiSystem/api/v1/upgrade/checkApp";

    /*bundle更新*/
    public static final String CHECK_BUNELD_NEWVIERSION = "/ApiSystem/api/v1/upgrade/checkBundle";
    public static final String UPLOADDEVLOADINFO = "/ApiSystem/api/v1/init/upload";
    public static final String CHECK_HASH = "/ApiSystem/api/v1/init/check";
    public static final String JS_BUNDLE_LOCAL_FILE = "index.android.bundle";
    public static final String SD_PATH = Environment.getExternalStorageDirectory().toString() + File.separator;
    //public static final String SD_PATH = MainApplication.getInstance().getCacheDir() + File.separator;
    public static final String SD_PATH_BUNDLE = SD_PATH + BuildConfig.APPLICATION_ID + File.separator + "bundle" + File.separator;
    public static final String JS_PATCH_LOCAL_FOLDER = SD_PATH_BUNDLE + "patches" + File.separator;
    public static final String JS_PATCH_LOCAL_PATH = SD_PATH_BUNDLE + "bundle" + File.separator;
    public static final String JS_BUNDLE_LOCAL_PATH = JS_PATCH_LOCAL_PATH + JS_BUNDLE_LOCAL_FILE;
    public static final String JS_PATCH_LOCAL_FILE = JS_PATCH_LOCAL_FOLDER + "patches.pat";

    public static final String JS_PATCH_LOCAL_FOLDER_IMAGE = SD_PATH_BUNDLE + "bundlepatches" + File.separator;    //存储bundle图片资源的文件夹
    public static final String JS_PATCH_LOCAL_IMAGE_NAME = "bundleimage.zip";             //图片资源本地保存zip包文件名
    public static final String JS_PATCH_LOCAL_IMAGE_FILEPATH = JS_PATCH_LOCAL_PATH + "drawable-mdpi" + File.separator;    //图片资源本地保存地址
    public static final String JS_PATCH_LOCAL_PATH_TEMP = SD_PATH_BUNDLE + "bundletemp" + File.separator;  //临时bundle文件夹
    public static final String JS_BUNDLE_TEMP = JS_PATCH_LOCAL_PATH_TEMP + JS_BUNDLE_LOCAL_FILE;     //临时bundle文件
    public static String appconf = "";
}
