package com.cib.library.http;

import android.annotation.SuppressLint;
import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

import com.cib.library.BaseResultCode;
import com.cib.library.BaseResultValue;
import com.cib.library.encrypt.rsa.RSAUtil;
import com.cib.library.encrypt.sm3.SM3Utils;
import com.cib.library.encrypt.sm4.SM4Utils;
import com.cib.library.file.LogFiles;
import com.cib.library.http.https.HttpsUtils;
import com.cib.library.sp.SPEncryptedUtils;
import com.cib.library.utils.AndroidDeviceUtil;
import com.cib.library.utils.NetUtils;
import com.cib.library.utils.RNResult;
import com.cib.library.utils.StringUtils;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;

import okhttp3.Call;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.FormBody;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import static com.cib.library.http.BaseApiClient.JSON;
import static com.cib.library.http.BaseApiClient.builder;

/**
 * Created by admin on 2018/8/15.
 */

public class NetworkService {
    private static Context context;
    private static SPEncryptedUtils sharedPreferencesHelper;
    private static String deviceID;
    private static String TAG = NetworkService.class.getName();
    private OkHttpClient client = null;

    @SuppressLint("MissingPermission")
    public NetworkService(Context context, SPEncryptedUtils sharedPreferencesHelper){
        this.context = context;
        this.sharedPreferencesHelper = sharedPreferencesHelper;
    }

    /**
     * 统一请求头
     * @param params
     * @return
     */
    @SuppressLint("MissingPermission")
    public static Headers getHeaderBuilder(Object params, Boolean isUseGzip){
        if (sharedPreferencesHelper == null){
            sharedPreferencesHelper = SPEncryptedUtils.getInstance(context);
        }
        String paramsStr = "";
        if(params != null){
            paramsStr = params.toString();
        }
        Headers.Builder headersBuilder = new Headers.Builder();
        String SING = "";
        try {
            SM3Utils sm3 = new SM3Utils();
            SING = sm3.SM3Encrypt(paramsStr);
        } catch (Exception e) {
            e.printStackTrace();
        }
        deviceID = AndroidDeviceUtil.getDeviceID(context);
        String APPVersion = sharedPreferencesHelper.getDecryptedData("apkversion");
        String bundleVersion = sharedPreferencesHelper.getDecryptedData("bundleVersion");
        if(TextUtils.isEmpty(bundleVersion)){
            bundleVersion = APPVersion + "_0";
        }
        String secversion = sharedPreferencesHelper.getDecryptedData("secversion");
        if(TextUtils.isEmpty(secversion)){
            secversion = "0";
        }
        headersBuilder.add("SIGN", NetUtils.encodeHeadInfo(SING));//签名
        headersBuilder.add("CHANNELTYPE","0");//平台，0代表Android
        headersBuilder.add("APPVERSION",APPVersion);//应用版本
        headersBuilder.add("BUNDLEVERSION", bundleVersion);//bundle版本
        headersBuilder.add("APPID",sharedPreferencesHelper.getDecryptedData("channelNumber"));//应用ID
        headersBuilder.add("DEVICEID",deviceID);//设备ID
        headersBuilder.add("SECURITYVERSION", secversion);
        headersBuilder.add("TOKEN", sharedPreferencesHelper.getDecryptedData("TOKEN"));
        if (isUseGzip){
            headersBuilder.add("ISUSEGZIP","1");//0:不压缩，1:压缩
        }else {
            headersBuilder.add("ISUSEGZIP","0");//0:不压缩，1:压缩
        }
        Headers build = headersBuilder.build();
        Log.d(TAG, "Headers: " + build.toString());
        return build;
    }

    /*
    * 初始化秘钥，获取加密类型
    */
    public Call initHttps(final Context context, final boolean isUseHttps, String initURL) {
        if(isUseHttps) {
            client = NetworkService.getHttps(context,builder);
        }else {
            if (client == null)client = new OkHttpClient();
        }
        //创建请求
        RequestBody requestBody = new FormBody.Builder().build();
        Request request = new Request.Builder()
                .headers(getHeaderBuilder(null,false))
                .url(initURL)
                .post(requestBody)
                .build();

        //使用异步加载，判断连接网络是否成功
        return client.newCall(request);
    }
    /**
     * 转换地址为当前配置地址
     * @param url js传递地址
     * @return 转换后地址
     */
    public String formatUrl(String url){
        String urlJS = url;
        String ip = sharedPreferencesHelper.getDecryptedData("interfaceUrl");
        String httpStr = "http://";
        String httpPort = sharedPreferencesHelper.getDecryptedData("httpPort");
        String httpsPort = sharedPreferencesHelper.getDecryptedData("httpsPort");
        String isUseHttps = sharedPreferencesHelper.getDecryptedData("isUseHttps");
        String port = "";
        if("true".equals(isUseHttps)){
            httpStr = "https://";
            if(!"".equals(httpsPort)){
                port = ":"+httpsPort;
            }
        }else{
            if(!"".equals(httpPort)){
                port = ":"+httpPort;
            }
        }

        if(url.indexOf("http")==0){
            url = url.substring(8,url.length());
            url = url.substring(url.indexOf("/") + 1,url.length());
        }
        if(url.startsWith("/")){
            url = httpStr +ip + port +url;
        }else {
            url = httpStr + ip + port + "/" + url;
        }
        Log.e(TAG, "修改接口地址" + urlJS + " 为：" + url);
        LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,"NetWorkPlugin","修改接口地址" + urlJS + " 为：" + url);
        return url;
    }
    public static OkHttpClient getHttps(Context context,OkHttpClient.Builder builder) {
        //默认双向认证
//        HttpsUtils.SSLParams sslParams = null;
//        try {
//            SPEncryptedUtils sharedPreferencesHelper = new SPEncryptedUtils(context);
//            String ca = sharedPreferencesHelper.getDecryptedData("ca");
//            sslParams = HttpsUtils.getSslSocketFactory(new InputStream[]{new ByteArrayInputStream(ca.getBytes())}, null, null);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        // Create an ssl socket factory with our all-trusting manager
//        builder.sslSocketFactory(sslParams.sSLSocketFactory, sslParams.trustManager)
        //是否做域名校验，返回处不做域名校验
        builder.hostnameVerifier(new HostnameVerifier() {
            @Override
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        })
//        .connectTimeout(60, TimeUnit.SECONDS)
        .addInterceptor(new RequestInterceptor())
        .cookieJar(new CookieJar() {
            private final HashMap<String, List<Cookie>> cookieStore = new HashMap<String, List<Cookie>>();
            @Override
            public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
                cookieStore.put(url.host(), cookies);
            }

            @Override
            public List<Cookie> loadForRequest(HttpUrl url) {
                List<Cookie> cookies = cookieStore.get(url.host());
                return cookies != null ? cookies : new ArrayList<Cookie>();
            }
        });
        return builder.build();
    }
    /*
   * 上传密钥网络请求
   * @parms url 网络路径
   *  @parms DEVICEID 手机ID
   */
    public Call uploadKey(final Context context, final Boolean isUseGzip, Boolean isUseHttps, String saveUpSecURL,String Random_Number,String Random_Num) throws Exception {
        //todo 根据服务端返回的加密方式生成秘钥
        if(isUseHttps) {
            client = NetworkService.getHttps(context,builder);
        }else {
            if (client == null)client = new OkHttpClient();
        }

        String SEC = RSAUtil.RASencrypt(context,Random_Number);//RSA加密
        String body = SM4Utils.SM4Encrypt(Random_Num, Random_Number);
        LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,"NetWorkPlugin","uploadKey:body:" + body);
        if (isUseGzip){
            body = GZipUtil.compressForGzip(body,"");
        }
        LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,"NetWorkPlugin","uploadKey:body1:" + body);
        RequestBody requestBody = RequestBody.create(JSON, body.getBytes());

        Request request = new Request.Builder()
                .headers(getHeaderBuilder(Random_Num,isUseGzip))
                .addHeader("SEC", SEC)
                .url(saveUpSecURL)
                .post(requestBody)
                .build();
        //使用异步加载，判断连接网络是否成功
        return client.newCall(request);
    }
}
