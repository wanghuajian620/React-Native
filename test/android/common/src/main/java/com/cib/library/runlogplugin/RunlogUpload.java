package com.cib.library.runlogplugin;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Environment;

import com.cib.library.BaseResultCode;
import com.cib.library.BaseResultValue;
import com.cib.library.encrypt.sm3.SM3Utils;
import com.cib.library.file.LogFiles;
import com.cib.library.http.BaseApiClient;
import com.cib.library.http.NetworkService;
import com.cib.library.http.UploadCallback;
import com.cib.library.http.https.HttpsUtils;
import com.cib.library.sp.SPEncryptedUtils;
import com.cib.library.utils.AndroidDeviceUtil;
import com.cib.library.utils.RNResult;
import com.cib.library.http.RequestInterceptor;
import com.facebook.react.bridge.Callback;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.FileNameMap;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;

import okhttp3.Call;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by nicolaszhang on 2018/7/3.
 * 操作日志上传
 */

public class RunlogUpload {
    private final String TAG = "RunlogUpload";
    /**
     * 多文件同时上传
     * @param
     */
    public void multiFileUpload(final Context context, boolean isUseHttps, String url, List<String> fileNames, UploadCallback uploadCallback) {
         OkHttpClient client = new OkHttpClient.Builder()
            .connectTimeout(10, TimeUnit.SECONDS)
            .readTimeout(20, TimeUnit.SECONDS)
            .build();

        if(isUseHttps) {
            client = NetworkService.getHttps(context,BaseApiClient.builder);
        }
         JSONObject jsonObject = new JSONObject();
         JSONObject jsonObject1 = new JSONObject();

         SPEncryptedUtils spEncryptedUtils = new SPEncryptedUtils(context);
//         SM3Utils sm3 = new SM3Utils();
//         String  sign = sm3.SM3Encrypt(jsonObject.toString());
         String appId=spEncryptedUtils.getDecryptedData("channelNumber");
//         String token=spEncryptedUtils.getDecryptedData("TOKEN");
//         String secversion = spEncryptedUtils.getDecryptedData("secversion");
//         if ("".equals(secversion)) secversion="0";
         @SuppressLint("MissingPermission")
         String imei1= AndroidDeviceUtil.getDeviceID(context);
         String deciceToken = appId + imei1;
//         String appVersion=spEncryptedUtils.getDecryptedData("apkversion");
//         String buildVersion=spEncryptedUtils.getDecryptedData("bundleVersion");
//        if (null==buildVersion||"".equals(buildVersion)){
//            buildVersion=appVersion+"_0";
//        }
        try {
            jsonObject1.put("imei1",imei1);
            jsonObject1.put("imei2","");
            jsonObject1.put("meid","");
            jsonObject1.put("devicetoken",deciceToken);
            jsonObject.put("req_msg",jsonObject1);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        Request request = new Request.Builder()
//                .addHeader("CHANNELTYPE","0")
//                .addHeader("APPVERSION",appVersion)
//                .addHeader("BUNDLEVERSION",buildVersion)
//                .addHeader("APPID", appId)
//                .addHeader("DEVICEID",deviceId)
//                .addHeader("SECURITYVERSION",secversion)
//                .addHeader("SIGN", sign)
//                .addHeader("TOKEN", token)
                .headers(NetworkService.getHeaderBuilder(jsonObject,false))
                .url(url)
                .post(getRequestBody(fileNames))
                .build();
        //使用异步加载，判断连接网络是否成功
        Call newCall = client.newCall(request);
        newCall.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,"RunLogPlugin失败","uploadLog"+e.getMessage());
                //连接失败
//                RNResult.failedResult(errorCallback, BaseResultCode.CODE_URL_NON_OPEN,BaseResultValue.UrlNonOpenMessage);
                uploadCallback.failed(BaseResultCode.CODE_URL_NON_OPEN,null);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String body=response.body().string();
                LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,"RunLogPlugin","uploadLog成功"+body);
                JSONObject jsonObject = null;
                try {
                    jsonObject = new JSONObject(body);
                    JSONObject jsonObject2 = jsonObject.getJSONObject("header");
                    String code= jsonObject2.getString("code");
                    String message= jsonObject2.getString("msg");
                    if ("200".equals(code)){
                        JSONObject resultObj = new JSONObject();
                        resultObj.put("header",jsonObject2);
                        resultObj.put("body", body);
//                        RNResult.successResult(successCallback, BaseResultValue.Success);
                        uploadCallback.success(resultObj.toString());

                        //删除生成的压缩包
                        String zipurl= Environment.getExternalStorageDirectory()+ File.separator+context.getPackageName()+File.separator+"logs.zip";
                        File file=new File(zipurl);
                        if (file.exists())  file.delete();
                    }else {
//                        RNResult.failedResults(errorCallback,Integer.parseInt(code),message);
                        uploadCallback.failed(Integer.parseInt(code),message);
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
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

//    public  OkHttpClient getHttps(Context context, OkHttpClient client) {
//        OkHttpClient.Builder builder = new OkHttpClient().newBuilder();
//        //默认双向认证
//        HttpsUtils.SSLParams sslParams = null;
//        try {
//            SPEncryptedUtils sharedPreferencesHelper = new SPEncryptedUtils(context);
//            String ca = sharedPreferencesHelper.getDecryptedData("ca");
//            sslParams = HttpsUtils.getSslSocketFactory(new InputStream[]{new ByteArrayInputStream(ca.getBytes())}, null, null);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        builder.connectTimeout(60, TimeUnit.SECONDS)
//                .readTimeout(60, TimeUnit.SECONDS)
//                .writeTimeout(60, TimeUnit.SECONDS);
//
//        // Create an ssl socket factory with our all-trusting manager
//        builder.sslSocketFactory(sslParams.sSLSocketFactory, sslParams.trustManager)
//                .hostnameVerifier(new HostnameVerifier() {
//                    @Override
//                    public boolean verify(String hostname, SSLSession session) {
//                        return true;
//                    }
//                })
//                .connectTimeout(60, TimeUnit.SECONDS)
//                .addInterceptor(new RequestInterceptor());
//        // .addNetworkInterceptor(new StethoInterceptor());
//        builder.hostnameVerifier(new HostnameVerifier() {
//            @Override
//            public boolean verify(String hostname, SSLSession session) {
//                return true;
//            }
//        });
//        builder.cookieJar(new CookieJar() {
//            private final HashMap<String, List<Cookie>> cookieStore = new HashMap<String, List<Cookie>>();
//            @Override
//            public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
//                cookieStore.put(url.host(), cookies);
//            }
//
//            @Override
//            public List<Cookie> loadForRequest(HttpUrl url) {
//                List<Cookie> cookies = cookieStore.get(url.host());
//                return cookies != null ? cookies : new ArrayList<Cookie>();
//            }
//        });
//
//        client = builder.build();
//        return client;
//    }

}
