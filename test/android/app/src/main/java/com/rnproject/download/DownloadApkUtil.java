package com.rnproject.download;

import android.content.Context;
import android.util.Log;

import com.cib.library.http.https.HttpsUtils;
import com.cib.library.sp.SPEncryptedUtils;
import com.rnproject.BuildConfig;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by nicolaszhang on 2018/7/11.
 */

public class DownloadApkUtil {
    private static DownloadApkUtil downloadUtil;
    private OkHttpClient okHttpClient;
    private OkHttpClient.Builder builder = null;

    private DownloadApkUtil(Context context) {
        if (BuildConfig.isUseHttps.equals("true")) {
            HttpsUtils.SSLParams sslParams = null;
            builder = new OkHttpClient().newBuilder();
            try {
                SPEncryptedUtils sharedPreferencesHelper = SPEncryptedUtils.getInstance(context);
                String ca = sharedPreferencesHelper.getDecryptedData("ca");
                sslParams = HttpsUtils.getSslSocketFactory(new InputStream[]{new ByteArrayInputStream(ca.getBytes())}, null, null);
            } catch (Exception e) {
                e.printStackTrace();
            }
            builder.connectTimeout(60, TimeUnit.SECONDS)
                    .readTimeout(60, TimeUnit.SECONDS)
                    .writeTimeout(60, TimeUnit.SECONDS);

            // Create an ssl socket factory with our all-trusting manager
            builder.sslSocketFactory(sslParams.sSLSocketFactory, sslParams.trustManager)
                    .hostnameVerifier(new HostnameVerifier() {
                        @Override
                        public boolean verify(String hostname, SSLSession session) {
                            return true;
                        }
                    })
                    .connectTimeout(60, TimeUnit.SECONDS);
            builder.hostnameVerifier(new HostnameVerifier() {
                @Override
                public boolean verify(String hostname, SSLSession session) {
                    return true;
                }
            });
            builder.cookieJar(new CookieJar() {
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

            okHttpClient = builder.build();
        } else {
            okHttpClient = new OkHttpClient.Builder()
                    .connectTimeout(60, TimeUnit.SECONDS)
                    .readTimeout(60, TimeUnit.SECONDS)
                    .build();
        }
    }

    public static DownloadApkUtil get(Context context) {
        if (downloadUtil == null) {
            downloadUtil = new DownloadApkUtil(context);
        }
        return downloadUtil;
    }

    /**
     * @param url          下载连接
     * @param destFileDir  下载的文件储存目录
     * @param destFileName 下载文件名称
     * @param listener     下载监听
     */
    public void download(final String url, final String destFileDir, final String destFileName, final OnDownloadListener listener) {
        Request request = new Request.Builder().url(url).build();
        okHttpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                // 下载失败监听回调
                listener.onDownloadFailed(e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                InputStream is = null;
                byte[] buf = new byte[2048];
                int len = 0;
                FileOutputStream fos = null;
                // 储存下载文件的目录
                File dir = new File(destFileDir);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                File file = new File(dir, destFileName);
                try {
                    is = response.body().byteStream();
                    long total = response.body().contentLength();
                    fos = new FileOutputStream(file);
                    long sum = 0;
                    while ((len = is.read(buf)) != -1) {
                        fos.write(buf, 0, len);
                        sum += len;
                        int progress = (int) (sum * 1.0f / total * 100);
                        // 下载中更新进度条
                        listener.onDownloading(progress);
                        Log.e("down", "onResponse: " + progress);
                    }
                    fos.flush();
                    // 下载完成
                    listener.onDownloadSuccess(file);
                } catch (Exception e) {
                    listener.onDownloadFailed(e);
                    e.printStackTrace();
                } finally {
                    try {
                        if (is != null)
                            is.close();
                    } catch (IOException e) {
                    }
                    try {
                        if (fos != null)
                            fos.close();
                    } catch (IOException e) {
                    }
                }
            }
        });
    }


    public interface OnDownloadListener {
        /**
         * @param file 下载成功后的文件
         */
        void onDownloadSuccess(File file);

        /**
         * @param progress 下载进度
         */
        void onDownloading(int progress);

        /**
         * @param e 下载异常信息
         */
        void onDownloadFailed(Exception e);
    }
}
