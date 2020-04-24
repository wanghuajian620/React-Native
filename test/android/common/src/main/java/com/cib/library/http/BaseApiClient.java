package com.cib.library.http;

import android.content.Context;
import com.cib.library.encrypt.sm4.SM4Utils;
import com.cib.library.file.LogFiles;
import com.cib.library.sp.SPEncryptedUtils;
import com.cib.library.utils.NetUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import okhttp3.Callback;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

/**
 * 网络请求基类
 *
 * @author Sandy
 *         create at 16/6/1 下午5:46
 */
public class BaseApiClient {

    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    public static Context context;
    public static OkHttpClient client = null;
    public static OkHttpClient.Builder builder = new OkHttpClient().newBuilder()
                .connectTimeout(60,TimeUnit.SECONDS)
                .readTimeout(60, TimeUnit.SECONDS)
                .writeTimeout(60, TimeUnit.SECONDS);

    /**
     * @param context
     * @param isUseIndustrialBankEncrypt 是否走银行通道
     * @param url
     * @param params
     * @param asyncCallBack
     * */
    public static void post(Context context,boolean isUseIndustrialBankEncrypt,boolean isUseHttps,final boolean isUseGzip,String url, Object params, Callback asyncCallBack) {
        String bodyRequest = "";
        SPEncryptedUtils sharedPreferencesHelper = new SPEncryptedUtils(context);
        Headers headersBuilder = NetworkService.getHeaderBuilder(params,isUseGzip);

        //是否使用https
        if(isUseHttps){
            client = NetworkService.getHttps(context,builder);
        }else {
            client = new OkHttpClient();
        }

        //若走银行加密通道，需要用sm3对body体做一个签名添加到请求头里
        if(isUseIndustrialBankEncrypt) {
            String SING = "";
            //若加密方式是sm4，则需要用上传秘钥时上传的秘钥对body报文体进行加密
            String seckey = sharedPreferencesHelper.getDecryptedData("seckey");
            if(seckey.equals("SM4")){
                String SEC = sharedPreferencesHelper.getDecryptedData("SEC");
                bodyRequest = SM4Utils.SM4Encrypt(params.toString(), SEC);
            }else {
                bodyRequest = params.toString();
            }
        }else {
            bodyRequest=params.toString();
        }

        LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,"NetWorkPlugin","post:headers:" + headersBuilder.toString() +"body:" + bodyRequest);
        if (isUseGzip){
            try {
                bodyRequest = GZipUtil.compressForGzip(bodyRequest,"");//加密即压缩报文，不加密不需要压缩,不需要js传递
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        Request request = new Request.Builder()
                .header("Content-Type", "application/json")
                .headers(headersBuilder)
                .url(url)
                .post(RequestBody.create(JSON, bodyRequest))
                .build();
        LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,"NetWorkPlugin111","post:headers:" + headersBuilder.toString() +"body:" + bodyRequest);
        client.newCall(request).enqueue(asyncCallBack);
    }

    /**
     * 请求执行
     *  @param context       上下文对象
     * @param request       请求对象
     * @param asyncCallback 回调函数
     */
    private static void enqueue(final Context context, Request request, Callback asyncCallback) {
        if (context == null) {
            return;
        }
        if (NetUtils.getNetStatus(context) == NetUtils.NET_NONE) {
//            asyncCallback.getCallback().sendFailMessage(Config.ERROR_NET,
//                    Config.ERROR_NET_MSG);
//            EventBus.getDefault().post(
//                    new ErrorEvent(Config.ERROR_NET, Config.ERROR_NET_MSG,
//                            asyncCallback.getTag(), context));
        } else {
            //为OkHttp设置自动携带Cookie的功能
            builder.followRedirects(false)  //禁制OkHttp的重定向操作，我们自己处理重定向
                    .followSslRedirects(false)
                    .cookieJar(new LocalCookieJar() {
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
            client = builder.build();
            client.newCall(request).enqueue(asyncCallback);
        }
    }


    /**
     * 根据tag取消网络请求
     *
     * @param tag 网络请求标记
     */
    public static void cancelCall(Object tag) {
        client.dispatcher().cancelAll();
    }

    private static class LocalCookieJar implements CookieJar {
        List<Cookie> cookies;

        @Override
        public List<Cookie> loadForRequest(HttpUrl arg0) {
            if (cookies != null)
                return cookies;
            return new ArrayList<Cookie>();
        }

        @Override
        public void saveFromResponse(HttpUrl arg0, List<Cookie> cookies) {
            this.cookies = cookies;
        }

    }
}
