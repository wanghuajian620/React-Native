package com.cib.library.http.uploadFile;

import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.cib.library.BaseResultCode;
import com.cib.library.encrypt.sm3.SM3Utils;
import com.cib.library.encrypt.sm4.SM4Utils;
import com.cib.library.file.LogFiles;
import com.cib.library.http.BaseApiClient;
import com.cib.library.http.NetworkService;
import com.cib.library.http.UploadCallback;
import com.cib.library.sp.SPEncryptedUtils;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.net.FileNameMap;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by nicolaszhang on 2018/7/3.
 */

public class NetworkUpload {
    private final String TAG = "Upload";
    /**
     * 多文件同时上传
     * @param
     */
    public void multiFileUpload(final Context context, Boolean isUseHttps, final boolean isUseGzip,
                                String url, List<String> fileNames, final SPEncryptedUtils sharedPreferencesHelper,UploadCallback uploadCallback)
    {
//        OkHttpClient client = new OkHttpClient();
        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(20, TimeUnit.SECONDS)
                .build();
        if(isUseHttps) {
            client = NetworkService.getHttps(context, BaseApiClient.builder);
        }
        MultipartBody requestBody = getRequestBody(fileNames);
        Request request = new Request.Builder()
                .url(url)
                .headers(NetworkService.getHeaderBuilder(null,false))
                .post(requestBody)
                .build();
        //使用异步加载，判断连接网络是否成功
        Call newCall = client.newCall(request);
        newCall.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                //连接失败
                 LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,TAG,"fileUpload:onFailure:"+e.getMessage());
//                RNResult.failedResult(errorCallback, BaseResultCode.NETWORK_UPLOAD_FILE_DAILED, BaseResultValue.NetworkUploadFailed);
                uploadCallback.failed(BaseResultCode.NETWORK_UPLOAD_FILE_DAILED,null);
            }

            @Override
            public void onResponse(Call call, Response response){
                try {
                    String responseStr = response.body().string();
                    LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,TAG,"fileUpload:onResponse:"+responseStr);
                    if(!TextUtils.isEmpty(responseStr)) {
                        JSONObject msgObj = new JSONObject(responseStr);
                        if (msgObj.has("header")){
                            //兴业的逻辑，需要解析数据
                            JSONObject header = msgObj.getJSONObject("header");
                            String sign = (String) header.get("sign");
                            Object body = msgObj.get("body");
                            int code = header.getInt("code");
                            String msg = header.getString("msg");
                            if(code == 200){
                                Log.e(TAG, "文件上传成功，返回文件ID！");
                                String seckey = sharedPreferencesHelper.getDecryptedData("seckey");
                                if(seckey.equals("SM4")) {
                                    String SEC = sharedPreferencesHelper.getDecryptedData("SEC");
                                    String result = SM4Utils.SM4Decrypt(body.toString(), SEC);
                                    String bodySign = SM3Utils.SM3Encrypt(result);
                                    if (!sign.equals(bodySign)) {
//                                        RNResult.failedResult(errorCallback,BaseResultCode.NETWORK_DATA_CORRUPTED,BaseResultValue.NetworkDataCorrupted);
                                        uploadCallback.failed(BaseResultCode.NETWORK_DATA_CORRUPTED,msgObj);
                                        return;
                                    }
                                    body = JSON.parse(result);
                                }

                                JSONObject resultObj = new JSONObject();
                                resultObj.put("header",header);
                                resultObj.put("body", body);
                                LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,TAG,"fileUpload成功:" + resultObj.toString());
                                uploadCallback.success(resultObj);
                            }else {
                                LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,TAG,"fileUpload失败:");
//                                RNResult.failedResult(errorCallback,BaseResultCode.NETWORK_UPLOAD_FILE_DAILED,BaseResultValue.NetworkUploadFailed);
                                uploadCallback.failed(BaseResultCode.NETWORK_UPLOAD_FILE_DAILED,msgObj);
                            }
                        }else {
                            //其他的逻辑
                            String msgresult = msgObj.toString();
                            Log.e("fgq","data====="+msgresult);
                            LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,TAG,"fileUpload成功:" + msgresult);
//                            RNResult.successResult(successCallback,Arguments.makeNativeMap((Map) JSON.parse(msgresult)));
                            uploadCallback.success(msgObj);
                        }

                        //暂时不换加密方式
//                        else if (code == 9000) {
//                            //当返回码为9000时，说明更换了加密类型，需要重新获取
//                            String initURL = sharedPreferencesHelper.getDescryptedData("initURL");
//                            String saveUpSecURL = sharedPreferencesHelper.getDescryptedData("saveUpSecURL");
//
//                            NetworkService networkService = new NetworkService(context, sharedPreferencesHelper);
//                            networkService.initHttps(context, initURL, saveUpSecURL, successCallback, errorCallback);
//                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,TAG,"fileUpload:catch:"+e.getMessage());
//                    RNResult.failedResult(errorCallback,BaseResultCode.NETWORK_UPLOAD_FILE_DAILED,BaseResultValue.NetworkUploadFailed);
                    uploadCallback.failed(BaseResultCode.NETWORK_UPLOAD_FILE_DAILED,null);
                }
            }
        });
    }

    /**
     * 通过上传的文件的完整路径生成RequestBody
     *
     * @param fileNames 完整的文件路径
     * @return
     */
    private static MultipartBody getRequestBody(List<String> fileNames) {
        //创建MultipartBody.Builder，用于添加请求的数据
        MultipartBody.Builder builder = new MultipartBody.Builder().setType(MultipartBody.FORM);
        for (int i = 0; i < fileNames.size(); i++) { //对文件进行遍历
            File file = new File(fileNames.get(i)); //生成文件
            //根据文件的后缀名，获得文件类型
            String fileType = getMimeType(file.getName());
            builder.addFormDataPart( //给Builder添加上传的文件
                    "file"+i+1 ,  //请求的名字
                    file.getName(), //文件的文字，服务器端用来解析的
                    RequestBody.create(MediaType.parse(fileType), file) //创建RequestBody，把上传的文件放入
            );
        }
        return builder.build(); //根据Builder创建请求
    }

    /**
     * 获取文件MimeType
     *
     * @param filename 文件名
     * @return
     */
    private static String getMimeType(String filename) {
        FileNameMap filenameMap = URLConnection.getFileNameMap();
        String contentType = filenameMap.getContentTypeFor(filename);
        if (contentType == null) {
            contentType = "application/octet-stream"; //* exe,所有的可执行程序
        }
        return contentType;
    }

    //初始化上传文件的数据
    public List<String> initUploadFile(){
        List<String> fileNames = new ArrayList<>();
        fileNames.add("storage/emulated/0/cib/1.jpg"); //txt文件
        fileNames.add("storage/emulated/0/cib/2.jpg"); //图片
        return fileNames;
    }
}
