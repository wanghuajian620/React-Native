package com.cib.library.runlogplugin;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Environment;

import com.cib.library.BaseResultCode;
import com.cib.library.BaseResultValue;
import com.cib.library.file.LogFiles;
import com.cib.library.file.ZipUtils;
import com.cib.library.http.UploadCallback;
import com.cib.library.permission.RxPermission;
import com.cib.library.sp.SPEncryptedUtils;
import com.cib.library.utils.RNResult;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeMap;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import io.reactivex.functions.Consumer;

/**
 * Created by fgq on 2018/08/10.
 */

public class RunLogMoudle extends ReactContextBaseJavaModule {

    private static final String TAG = "RunLogMoudle";
    private Context mContext;
    private SPEncryptedUtils spEncryptedUtils;
    private boolean isUseHttps = false;//是否使用https

    private String[] runlogPermission = new String[]{Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE,Manifest.permission.READ_PHONE_STATE};


    public RunLogMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        spEncryptedUtils = new SPEncryptedUtils(mContext);
        isUseHttps = Boolean.parseBoolean(spEncryptedUtils.getDecryptedData("isUseHttps"));
        LogFiles.LogsToFile(mContext,LogFiles.TYPE_ANDROID,getName(),getName()+"初始化");
    }

    @Override
    public String getName() {
        return "RunLogPlugin";
    }


    /**
     * 上传日志RN
     */
    @SuppressLint("MissingPermission")
    @ReactMethod
    public void uploadLog(final ReadableMap readableMap,final Callback successCallback, final Callback errorCallback) {
        LogFiles.LogsToFile(mContext,LogFiles.TYPE_ANDROID,getName(),"uploadLog");
        ReadableNativeMap readableNativeMap = (ReadableNativeMap) readableMap;
        Map map = readableNativeMap.toHashMap();
        final String uploadUrl=(String)map.get("uploadUrl");
        //判断路径是否正确
        if( null ==uploadUrl||"".equals(uploadUrl)){
            RNResult.failedResult(errorCallback,BaseResultCode.CODE_PARAMETER_CANNOT_BENULL,BaseResultValue.ParameterCannotNull);
            return;
        }
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermission.getIntance(getCurrentActivity(), getName())
                    .request(runlogPermission)
                    .subscribe(new Consumer<Boolean>() {
                        @Override
                        public void accept(Boolean aBoolean) throws Exception {
                            if (aBoolean) {
                                //要上传的文件的集合
                                List<String> fileListjs = LogFiles.getAllName(LogFiles.logsJSAddress(mContext));
                                List<String> fileListandroid = LogFiles.getAllName(LogFiles.logsCacheAddress(mContext));
                                if (null==fileListjs&&null==fileListandroid){
                                    RNResult.failedResult(errorCallback,BaseResultCode.RUNLOG_Upload_NoneFile_CODE,BaseResultValue.RunLogUploadNoneFileMessage);
                                    return;
                                }

                                String filedirs=Environment.getExternalStorageDirectory()+ File.separator+getCurrentActivity().getPackageName()+File.separator+"logs"+File.separator;
                                String zipurl=Environment.getExternalStorageDirectory()+ File.separator+getCurrentActivity().getPackageName()+File.separator+"logs.zip";
                                String url= null;
                                try {
                                    url = ZipUtils.ZipFolder(filedirs,zipurl);
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }

                                List<String> uploadstr=new ArrayList<>();
                                uploadstr.add(url);
                                RunlogUpload runlogUpload = new RunlogUpload();
                                //上传文件的方法
                                runlogUpload.multiFileUpload(mContext, isUseHttps, uploadUrl, uploadstr, new UploadCallback() {
                                    @Override
                                    public void success(Object o) {
                                        RNResult.successResult(successCallback, o);
                                    }

                                    @Override
                                    public void failed(Integer object,Object o) {
                                        switch (object){
                                            case BaseResultCode.CODE_URL_NON_OPEN:
                                                if (object != null){
                                                    RNResult.failedResult(errorCallback, BaseResultCode.CODE_URL_NON_OPEN,BaseResultValue.UrlNonOpenMessage);
                                                }else {
                                                    RNResult.failedResults(errorCallback, BaseResultCode.CODE_URL_NON_OPEN,o.toString());
                                                }
                                                break;
                                        }
                                    }
                                });
                            }else {
                                permissionErr(errorCallback);
                            }
                        }
                    });
            }
        });

    }


    /**
     * 删除本地所有日志
     */
    @ReactMethod
    public void deleteLog(final Callback successCallback, final Callback errorCallback) {
        LogFiles.LogsToFile(mContext,LogFiles.TYPE_ANDROID,getName(),"deleteLog");
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermission.getIntance(getCurrentActivity(), getName())
                    .request(runlogPermission)
                    .subscribe(new Consumer<Boolean>() {
                        @Override
                        public void accept(Boolean aBoolean) throws Exception {
                            if (aBoolean) {
                                boolean isdelete=LogFiles.deleteSDFile(new File(Environment.getExternalStorageDirectory()+ File.separator+getCurrentActivity().getPackageName()+File.separator+"logs"+File.separator));
                                //是否删除文件成功
                                if (isdelete){
                                    LogFiles.LogsToFile(mContext,LogFiles.TYPE_ANDROID,getName(),"deleteLog删除成功");
                                    RNResult.successResult(successCallback, BaseResultValue.Success);
                                }else {
                                    LogFiles.LogsToFile(mContext,LogFiles.TYPE_ANDROID,getName(),"deleteLog删除失败");
                                    RNResult.failedResult(errorCallback,BaseResultCode.RUNLOG_Delete_Failed_CODE, BaseResultValue.RunLogDeleteFailedMessage);
                                }
                            }else {
                                permissionErr(errorCallback);
                            }
                        }
                    });
            }
        });
    }


    /**
     * 记录js日志
     */
    @ReactMethod
    public void recordJsLog(final ReadableMap readableMap, final Callback successCallback, final Callback errorCallback) {
        LogFiles.LogsToFile(mContext,LogFiles.TYPE_ANDROID,getName(),"recordJsLog");
        ReadableNativeMap readableNativeMap = (ReadableNativeMap) readableMap;
        Map map = readableNativeMap.toHashMap();
        final String logstr=(String) map.get("jsLog");

        if(null ==logstr || "".equals(logstr)){
            RNResult.failedResult(errorCallback,BaseResultCode.CODE_PARAMETER_CANNOT_BENULL,BaseResultValue.ParameterCannotNull);
            return;
        }

        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RxPermission.getIntance(getCurrentActivity(), getName())
                    .request(runlogPermission)
                    .subscribe(new Consumer<Boolean>() {
                        @Override
                        public void accept(Boolean aBoolean) throws Exception {
                            if (aBoolean) {
                                 boolean isLogIn=LogFiles.writeTxtToFile(mContext,LogFiles.TYPE_JS,"","",logstr);
                                 if (isLogIn){
                                     LogFiles.LogsToFile(mContext,LogFiles.TYPE_ANDROID,getName(),"JsLog:" + logstr);
                                     RNResult.successResult(successCallback,BaseResultValue.Success);
                                 }else {
                                     LogFiles.LogsToFile(mContext,LogFiles.TYPE_ANDROID,getName(),"recordJsLog记录日志失败");
                                     RNResult.failedResult(errorCallback,BaseResultCode.RUNLOG_Record_JsLog_Failed_CODE,BaseResultValue.RunLogRecordJsLogFailedMessage);
                                 }
                            }else {
                                     permissionErr(errorCallback);
                            }
                        }
                    });
            }
        });
    }

    //未授权回调
    private void permissionErr(Callback callback){
        LogFiles.LogsToFile(mContext,LogFiles.TYPE_ANDROID,getName(),"recordJsLog权限不足");
        RNResult.failedResult(callback, BaseResultCode.PERMISSI_EXTERNAL_STORAGE, BaseResultValue.PermissionNoExternalStorageMessage);
    }
}
