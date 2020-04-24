package com.rnproject;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.os.Process;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.util.Log;
import android.widget.Toast;

import androidx.core.content.FileProvider;

import com.cib.library.db.SQLUtils;
import com.cib.library.encrypt.sm3.SM3Utils;
import com.cib.library.file.FileUtils;
import com.cib.library.file.LogFiles;
import com.cib.library.http.NetworkService;
import com.cib.library.http.https.HttpsUtils;
import com.cib.library.http.https.IntenetUtil;
import com.cib.library.permission.PermissionResultInterface;
import com.cib.library.permission.PermissionUtils;
import com.cib.library.sp.SPEncryptedUtils;
import com.cib.library.utils.AndroidDeviceUtil;
import com.rnproject.base.Const;
import com.rnproject.download.BundleDiff;
import com.rnproject.download.DownloadApkUtil;
import com.rnproject.splashscreen.SplashScreen;
import com.rnproject.tools.Tools;
import com.rnproject.utils.LogUtils;
import com.rnproject.utils.SharePreferenceUtils;

import org.apache.commons.codec.digest.DigestUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;

import okhttp3.Call;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.FormBody;
import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class StartActivity extends Activity {
    private static final String TABLE_NAME = "NotificatonTable";
    private static final String TABLE_STATUS = "status";
    private static final String TABLE_DATE = "date";
    private static final String TABLE_TITLE = "title";
    private static final String TABLE_REMARK = "remark";
    private static final String TABLE_CONTENT = "content";
    private static final String TABLE_URL = "url";
    private final int BUNDLECODE = 1;
    private String TAG = "StartActivity";
    //消息的数据表字段
    private SQLUtils sqlUtils;
    private List<String> columnsList;
    //获取权限
    private String[] permission = new String[]{Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_PHONE_STATE, Manifest.permission.ACCESS_COARSE_LOCATION};
    private String apkVersion = "";
    private String bundleVersion = "";
    private String version = "";
    private SharedPreferences sp;
    private SharedPreferences.Editor editor;
    private Intent intent;
    private String channel = "";
    // private FileUtils fileUtils;
    private String appversion;
    private SPEncryptedUtils sharedPreferencesHelper;
    //是否开启hash校验啊
    private boolean isCheckIntegrity = false;
    private String addressHeard = "";
    private String serviceIp = "";
    private String port = "";
    private String baseUrl = "";
    private OkHttpClient client = null;
    private HttpsUtils.SSLParams sslParams = null;
    private OkHttpClient.Builder builder = null;
    private String ca = "";
    private int bundlesize = 0;
    private String BUNDLE = "bundle";
    private String BUNDLEIMAGE = "bundleimage";
    private String bundleversion = "";
    private String bhash = "";
    private String rhash = "";
    String deviceid = "";
    Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case BUNDLECODE:
                    String obj = (String) msg.obj;
                    if (BUNDLE.equals(obj)) bundlesize++;
                    if (BUNDLEIMAGE.equals(obj)) bundlesize++;

                    LogUtils.print("异步handle的zise" + bundlesize);
                    if (bundlesize == 2) {
                        bundlesize = 0;
                        //图片资源和bundle更新成功之后  保存bundleversion
                        LogUtils.print("保存bundleversion版本" + bundleversion);
                        // FileUtils fileUtils=new FileUtils(StartActivity.this);
                        sharedPreferencesHelper.setEncryptedData("bundleVersion", bundleversion);

                        //不为空的时候保存hash值，避免覆盖
                        if (!"".equals(bhash))
                            SharePreferenceUtils.setString(StartActivity.this, "bhash", bhash);
                        if (!"".equals(rhash))
                            SharePreferenceUtils.setString(StartActivity.this, "rhash", rhash);

                        //跳转rn页面
                        startActivity(new Intent(StartActivity.this, MainActivity.class));
                        finish();
                    }
                    break;
                case 10000:
                    Process.killProcess(Process.myPid()); //验证失败则退出程序
                    break;
            }
        }
    };


    @SuppressLint("MissingPermission")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(getParent(), true);
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_start);
        LogFiles.LogsToFile(this, LogFiles.TYPE_ANDROID, "StartActivity", "onCreate");
        //fileUtils = new FileUtils(StartActivity.this);

        //消息不存本地则无需创建数据表
//        initDdpushDb();
        sp = getSharedPreferences("agree_shell_config", Context.MODE_PRIVATE);

        deviceid = AndroidDeviceUtil.getDeviceID(StartActivity.this);
        sharedPreferencesHelper = SPEncryptedUtils.getInstance(this);
        editor = sp.edit();
        appversion = BuildConfig.VERSION_NAME;
        sharedPreferencesHelper.setEncryptedData("apkversion", appversion);
        channel = BuildConfig.channelNumber;
        apkVersion = sp.getString("apk_version", appversion);
        bundleVersion = sp.getString("bundle_Version", "");

        isCheckIntegrity = BuildConfig.isCheckIntegrity;
        if (BuildConfig.isUseIndustrialBankEncrypt.equals("true")) {
            String rsa = read("rsa_public_key.pem");
            Log.e(TAG, "rs: " + rsa + "--->" + sp.getString("isUseIndustrialBankEncrypt", "wu") + ":" + sharedPreferencesHelper.getDecryptedData("isUseIndustrialBankEncrypt") + "--->" + sharedPreferencesHelper.getDecryptedData("channelNumber"));
            LogFiles.LogsToFile(this, LogFiles.TYPE_ANDROID, "StartActivity", "onCreate使用兴业加密通道" + "rs: " + rsa + "--->" + sp.getString("isUseIndustrialBankEncrypt", "wu") + ":" + sharedPreferencesHelper.getDecryptedData("isUseIndustrialBankEncrypt") + "--->" + sharedPreferencesHelper.getDecryptedData("channelNumber"));
            sharedPreferencesHelper.setEncryptedData("rsa", rsa);
        }

        serviceIp = BuildConfig.interfaceUrl;
        if (BuildConfig.isUseHttps.equals("true")) {
            LogFiles.LogsToFile(this, LogFiles.TYPE_ANDROID, "StartActivity", "onCreate使用https");
            addressHeard = "https://";
            port = BuildConfig.httpsPort;

            ca = read("ca.crt");
            Log.e(TAG, "ca: " + ca);
            sharedPreferencesHelper.setEncryptedData("ca", ca);

            try {
                //sslParams = HttpsUtils.getSslSocketFactory(new InputStream[]{new ByteArrayInputStream(ca.getBytes())}, null, null);
                builder = new OkHttpClient().newBuilder();
                builder.connectTimeout(60, TimeUnit.SECONDS)
                        .readTimeout(60, TimeUnit.SECONDS)
                        .writeTimeout(60, TimeUnit.SECONDS);

                // Create an ssl socket factory with our all-trusting manager
//                builder.sslSocketFactory(sslParams.sSLSocketFactory, sslParams.trustManager)
//                        .hostnameVerifier(new HostnameVerifier() {
//                            @Override
//                            public boolean verify(String hostname, SSLSession session) {
//                                return true;
//                            }
//                        })
//                        .connectTimeout(60, TimeUnit.SECONDS);
//                builder.hostnameVerifier(new HostnameVerifier() {
//                    @Override
//                    public boolean verify(String hostname, SSLSession session) {
//                        return true;
//                    }
//                });
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
                client = builder.build();
            } catch (Exception e) {
                LogFiles.LogsToFile(this, LogFiles.TYPE_ANDROID, "StartActivity", "onCreate:https初始化出错" + e.getMessage());
                e.printStackTrace();
            }
        } else {
            LogFiles.LogsToFile(this, LogFiles.TYPE_ANDROID, "StartActivity", "onCreate使用http");
            client = new OkHttpClient();
            addressHeard = "http://";
            port = BuildConfig.httpPort;
        }

        if (!TextUtils.isEmpty(port)) {
            baseUrl = addressHeard + serviceIp + ":" + port;
        } else {
            baseUrl = addressHeard + serviceIp;
        }
        int networkState = IntenetUtil.getNetworkState(StartActivity.this);
        if (networkState == 1) {
            showToas("当前网络异常");
            LogFiles.LogsToFile(this, LogFiles.TYPE_ANDROID, "StartActivity", "onCreate当前网络异常");
            startActivity(new Intent(StartActivity.this, MainActivity.class));
            finish();
        } else {
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
                try {
                    if (isCheckIntegrity) {
                        //比对hash值
                        getAPKHash();
                    } else {
                        uploadDeviceInfo();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    startActivity(new Intent(StartActivity.this, MainActivity.class));
                    finish();
                }
            } else {
                //检测apk是否有更新
                PermissionUtils.checkPermission(this, TAG, permission, "", new PermissionResultInterface() {
                    @Override
                    public void PermissionSuccess() {
                        try {
                            if (isCheckIntegrity) {
                                //比对hash值
                                getAPKHash();
                            } else {
                                // 上报设备信息
                                uploadDeviceInfo();
                            }
                        } catch (Exception e) {
                            showToas("服务器地址端口设置异常");
                            LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "服务器地址端口设置异常");
                            e.printStackTrace();
                            startActivity(new Intent(StartActivity.this, MainActivity.class));
                            finish();
                        }
                    }

                    @Override
                    public void PermissionFaild() {
                        showToas("获取权限失败!");
                    }
                });
            }
        }
    }


    /**
     * 读取rsa证书和https证书
     *
     * @param filename 文件名称
     * @return
     */
    private String read(String filename) {
        String rst = "";
        InputStream inputStream = null;
        try {
            inputStream = getAssets().open(filename);
            if (inputStream == null) {
                return rst;
            }
            int size = inputStream.available();
            int len = -1;
            byte[] bytes = new byte[size];
            inputStream.read(bytes);
            inputStream.close();
            rst = new String(bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return rst;
    }

    /**
     * 上报设备信息
     */
    @SuppressLint("NewApi")
    private void uploadDeviceInfo() {
        String uploadDeviceInfoUrl = baseUrl + Const.UPLOADDEVLOADINFO;
        JSONObject jsonObject = new JSONObject();
        JSONObject jsonObject1 = new JSONObject();
        @SuppressLint("MissingPermission")
        String devicetoken = channel + deviceid;
        sharedPreferencesHelper.setEncryptedData("DEVICEID", deviceid);
        try {
            Map imeiAndMeid = null;
            String imei1 = "",imei2 = "",meid = "";
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                imeiAndMeid = AndroidDeviceUtil.getImeiAndMeid(StartActivity.this);
                imei1 = imeiAndMeid.get("imei1")+"";
                imei2 = imeiAndMeid.get("imei2")+"";
                meid = imeiAndMeid.get("meid")+"";

            }else {
                imei1 = Tools.getIMEI(StartActivity.this);
                meid = "";
            }

            String dl = "";
            if (intent != null){
                //判断它是否是为电量变化的Broadcast Action
                if(Intent.ACTION_BATTERY_CHANGED.equals(intent.getAction())){
                    //获取当前电量
                    int level = intent.getIntExtra("level", 0);
                    //电量的总刻度
                    int scale = intent.getIntExtra("scale", 100);
                    //把它转成百分比
                    dl =  ((level * 100) / scale) + "%";
                }
            }

            DisplayMetrics displayMetrics = AndroidDeviceUtil.getDisplayMetrics(StartActivity.this);
            ActivityManager.MemoryInfo memoryInfo = AndroidDeviceUtil.getMemoryInfo(StartActivity.this);
            jsonObject1.put("imei1", imei1);
            jsonObject1.put("imei2", imei2);
            jsonObject1.put("meid", meid);
            jsonObject1.put("devicetoken", devicetoken);
            jsonObject1.put("sbxh",Build.MODEL);//设备型号
//            jsonObject1.put("sbmc",Build.DEVICE);//设备名称
            jsonObject1.put("fbl",displayMetrics.widthPixels + "*" + displayMetrics.heightPixels);//分辨率
            jsonObject1.put("yy", AndroidDeviceUtil.getSystemLanguage(StartActivity.this));//语言
            jsonObject1.put("cckj", AndroidDeviceUtil.getSystemStatFs().getTotalBytes()/1024/1024/1024 + "GB");//存储空间
            if (memoryInfo != null){
                jsonObject1.put("yxlc",memoryInfo.totalMem/1024/1024/1024 + "GB");//系统内存信息
            }else {
                jsonObject1.put("yxlc","");//系统内存信息
            }
            jsonObject1.put("xtbb",Build.VERSION.RELEASE);//系统android版本
            jsonObject1.put("bbh",Build.DISPLAY);//版本号
            jsonObject1.put("shyy", AndroidDeviceUtil.isDeviceRooted() == true ? "1" : "0");//是否root
            jsonObject1.put("dl",dl);

            jsonObject.put("req_msg", jsonObject1);
            Log.e(TAG, "DEVICE: " + imei1 + ":" + imei2 + ":" + meid);
            Log.e(TAG, "DEVICEJSON: " + jsonObject.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        //post方式 需要表单提交参数
         RequestBody requestBody = RequestBody.create(MediaType.parse("application/json; charset=utf-8"),
                jsonObject.toString());
         Request request = new Request.Builder()
                .headers(NetworkService.getHeaderBuilder(jsonObject,false))
                .url(uploadDeviceInfoUrl)
                .post(requestBody)
                .build();
        Log.e(TAG, "uploadDeviceInfo: " + uploadDeviceInfoUrl);
        Log.e(TAG, "DEVICEID: " + deviceid);

        //使用异步加载，判断连接网络是否成功
        Call newCall = client.newCall(request);
        newCall.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                //连接失败
                LogUtils.print("上报设备信息失败bbbbb" + e.getMessage());

                //hash值验证通过 请求apk更新
                checkApkVersion();
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "上传设备信息接口（uploadDeviceInfo---》上报设备信息失败");
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                //hash值验证通过 请求apk更新
                checkApkVersion();
                String body = response.body().string();
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "上传设备信息接口（uploadDeviceInfo---》上报设备信息body" + body);

                JSONObject jsonObject = null;
                try {
                    jsonObject = new JSONObject(body);
                    JSONObject jsonObject2 = jsonObject.getJSONObject("header");
                    String code = jsonObject2.getString("code");
                    String message = jsonObject2.getString("msg");
                    if ("200".equals(code)) {
                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "上传设备信息接口（uploadDeviceInfo---》上报设备信息成功" + body);
                    } else {
                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "上传设备信息接口（uploadDeviceInfo---》上报设备信息失败" + body);
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }


    /**
     * 初始化ddpush
     */
    private void initDdpushDb() {
        columnsList = new ArrayList<>();
        columnsList.add(TABLE_TITLE);
        columnsList.add(TABLE_STATUS);
        columnsList.add(TABLE_REMARK);
        columnsList.add(TABLE_CONTENT);
        columnsList.add(TABLE_DATE);
        columnsList.add(TABLE_URL);
        sqlUtils = SQLUtils.getInstance(getApplication(), TABLE_NAME);
        //创建一张表
        int table = sqlUtils.createTable(TABLE_NAME, columnsList);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "onCreate:table:" + table);
    }


    /**
     * 检测更新apk
     */
    private void checkApkVersion() {
        String token = sharedPreferencesHelper.getDecryptedData("TOKEN");
        String apkUrl = baseUrl + Const.CHECK_APK_NEWVIERSION;
//        client = new OkHttpClient();
        if (bundleVersion == null || "".equals(bundleVersion)) {
            bundleVersion = appversion + "_0";
        }
        //创建请求
        //post方式 需要表单提交参数
        RequestBody requestBody = new FormBody.Builder()
                .build();
        Request request = new Request.Builder()
                .addHeader("CHANNELTYPE", "0")
                .addHeader("APPVERSION", apkVersion)
                .addHeader("BUNDLEVERSION", bundleVersion)
                .addHeader("SIGN", "100000000")
                .addHeader("APPID", channel)//渠道编号
                .addHeader("DEVICEID", deviceid)
                .addHeader("SECURITYVERSION", "1")
                .addHeader("TOKEN", token == null ? "" : token)
                .url(apkUrl)
                .post(requestBody)
                .build();

        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---》CHANNELTYPE:" + "0");
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---》APPVERSION:" + apkVersion);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---》bundleVersion:" + bundleVersion);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---》SIGN:" + "100000000");
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---》APPID:" + channel);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---》DEVICEID:" + deviceid);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---》SECURITYVERSION:" + "1");
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---》token:" + token == null ? "" : token);

        //使用异步加载，判断连接网络是否成功
        Call newCall = client.newCall(request);
        newCall.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---连接失败" + e.getMessage());
                startActivity(new Intent(StartActivity.this, MainActivity.class));
                finish();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String responses = response.body().string();
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---连接成功" + responses);
                try {
                    JSONObject object = new JSONObject(responses);
                    JSONObject header = (JSONObject) object.get("header");
                    int code = header.getInt("code");
                    if (code == 200) {
                        String bodystr = object.getString("body");
//                        String localSing = SM3Utils.SM3Encrypt(bodystr);
//                        if (localSing.equals(header.get("sign"))){
                        JSONObject body = new JSONObject(bodystr);
                        boolean ischeck = (boolean) body.get("ischeck");//是否有更新
                        if (ischeck) {
                            LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---连接成功---需要更新");

                            final String url = (String) body.get("url");
                            version = (String) body.get("version");//更新后的版本号

                            String note = (String) body.get("note");//更新提示
                            boolean isforce = (boolean) body.get("isforce");//是否强制更新
                            if (isforce) {
                                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---连接成功---强制更新");
                                Looper.prepare();
                                AlertDialog.Builder mDialog = new AlertDialog.Builder(StartActivity.this);
                                AlertDialog dialog;
                                mDialog.setTitle(R.string.app_name);
                                mDialog.setMessage(note);
                                mDialog.setPositiveButton("立即更新", new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---连接成功---下载apk");
                                        downloadApk(StartActivity.this, url, version);
                                    }
                                }).setCancelable(false);
                                dialog = mDialog.create();
                                dialog.show();
                                Looper.loop();
                            } else {
                                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---连接成功---非强制更新");
                                Looper.prepare();
                                final AlertDialog.Builder mDialog = new AlertDialog.Builder(StartActivity.this);
                                AlertDialog dialog;
                                mDialog.setTitle(R.string.app_name);
                                mDialog.setMessage(note);
                                mDialog.setPositiveButton("立即更新", new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---连接成功---非强制更新--点击更新");
                                        downloadApk(StartActivity.this, url, version);
                                    }
                                });
                                mDialog.setNegativeButton("暂不更新", new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---连接成功---非强制更新--暂不更新");
                                        startActivity(new Intent(StartActivity.this, MainActivity.class));
                                        finish();
                                    }
                                });
                                dialog = mDialog.create();
                                dialog.show();
                                Looper.loop();
                            }
                        } else {
                            LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---连接成功---不需要更新");
                            checkBundleFile(StartActivity.this);
                        }
//                        }
                    } else {
                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---连接成功---错误-code" + code);
                        startActivity(new Intent(StartActivity.this, MainActivity.class));
                        finish();
                    }
                } catch (JSONException e) {
                    LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "请求apk是否有更新（checkApkVersion---更新apk服务错误" + e.getMessage());
                    e.printStackTrace();
                    startActivity(new Intent(StartActivity.this, MainActivity.class));
                    finish();
                }
            }
        });
    }


    /**
     * Toast提示信息
     *
     * @param s
     */
    private void showToas(final String s) {
        StartActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(StartActivity.this, s, Toast.LENGTH_LONG).show();
            }
        });
    }


    /**
     * 下载apk文件
     *
     * @param context
     * @param url
     * @param versionname
     */
    private void downloadApk(Context context, String url, String versionname) {
        final ProgressDialog progressDialog = new ProgressDialog(context);
        progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        progressDialog.setTitle("正在下载apk中");
        progressDialog.setMessage("请稍后...");
        progressDialog.setProgress(0);
        progressDialog.setMax(100);
        progressDialog.show();
        progressDialog.setCancelable(false);
        DownloadApkUtil.get(context).download(url, Const.SD_PATH + "/" + "ApkDown", versionname + ".apk", new DownloadApkUtil.OnDownloadListener() {
            @Override
            public void onDownloadSuccess(File file) {
                if (progressDialog != null && progressDialog.isShowing()) {
                    progressDialog.dismiss();
                }
                //下载完成进行相关逻辑操作 安装apk
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "下载apk文件（downloadApk---下载成功---下载apk成功地址" + file.getPath());
                installApk(StartActivity.this, file);
            }

            @Override
            public void onDownloading(int progress) {
                progressDialog.setProgress(progress);
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "下载apk文件（downloadApk---下载进度:" + progress);
            }

            @Override
            public void onDownloadFailed(final Exception e) {
                //下载异常进行相关提示操作
                showToas("下载apk文件异常" + e.getMessage());
            }
        });
    }

    /**
     * 安装APK
     *
     * @param context
     * @param
     */
    public void installApk(Activity context, File file) {
        Log.e("TAG", "install() 安装");
        Intent install = new Intent(Intent.ACTION_VIEW);
        install.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (file != null && file.length() > 0 && file.exists() && file.isFile()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {//判读版本是否在7.0以上
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "安卓apk文件（installApk）--》7。0往上");
                Uri apkUri = FileProvider.getUriForFile(context, context.getPackageName() + ".provider", file);
                install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                install.setDataAndType(apkUri, "application/vnd.android.package-archive");
                context.startActivity(install);
            } else {
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "安卓apk文件（installApk）--》7。0往下");
                install.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
                context.startActivity(install);
            }
        }
    }

    /**
     * 检测apkhash值是否被篡改
     */
    private void getAPKHash() {
        String apkHashUrl = baseUrl + Const.CHECK_HASH;
        final JSONObject jsonObject = new JSONObject();
        SM3Utils sm3 = new SM3Utils();
        String sign = sm3.SM3Encrypt(jsonObject.toString());
        if (null == bundleVersion || "".equals(bundleVersion)) {
            bundleVersion = apkVersion + "_0";
        }
        String apkHash = checkApkHash();
        Log.d(TAG, "getAPKHash: " + apkHash);
        String bundleHash = checkBundleHash();
        Log.d(TAG, "getbundleHash: " + bundleHash);

        //创建请求
        //post方式 需要表单提交参数
        RequestBody requestBody = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), jsonObject.toString());
        Request request = new Request.Builder()
                .headers(NetworkService.getHeaderBuilder(jsonObject,false))
                .addHeader("ahash", apkHash)
                .addHeader("bhash", bundleHash)
                .url(apkHashUrl)
                .post(requestBody)
                .build();

        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》CHANNELTYPE:" + "0");
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》APPVERSION:" + apkVersion);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》bundleVersion:" + bundleVersion);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》APPID:" + channel);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》DEVICEID:" + deviceid);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》SECURITYVERSION:" + "1");
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》SIGN:" + sign);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》apkHash:" + apkHash);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》bundleHash:" + bundleHash);

        //使用异步加载，判断连接网络是否成功
        Call newCall = client.newCall(request);
        newCall.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                showToas("应用完整性校验接口请求失败,即将退出程序");
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》请求失败：应用完整性校验接口请求失败,即将退出程序");
                handler.sendEmptyMessageDelayed(10000, 3000);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String responseStr = response.body().string();
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》请求成功：" + responseStr);
                Log.e(TAG, "onResponse: " + responseStr);
                try {
                    JSONObject responseStrObj = new JSONObject(responseStr);
                    JSONObject header = (JSONObject) responseStrObj.get("header");
                    int code = header.getInt("code");
                    if (200 == code) {
                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》请求成功--校验成功：" + responseStr);
                        // 上报设备信息
                        uploadDeviceInfo();
                    } else {//验证失败退出程序
                        showToas("应用完整性校验失败,即将退出程序");
                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "检测apkhash值是否被篡改（getAPKHash---》请求成功--校验失败：" + responseStr);
                        handler.sendEmptyMessageDelayed(10000, 3000);
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * 获取自身APK的hash值
     *
     * @return
     */
    private String checkApkHash() {
        String packageCodePath = this.getPackageCodePath();
        Log.d(TAG, "checkApkHash: " + packageCodePath);
        File file = new File(packageCodePath);
        byte[] buffer = null;
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(file);
            ByteArrayOutputStream bos = new ByteArrayOutputStream(1024);
            byte[] b = new byte[1024];
            int n;
            while ((n = fis.read(b)) != -1) {
                bos.write(b, 0, n);
            }
            fis.close();
            bos.close();
            buffer = bos.toByteArray();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return DigestUtils.md5Hex(buffer);
    }

    /**
     * 获取bundle的hash值
     *
     * @return
     */
    private String checkBundleHash() {
        String bundlesha = "";
        try {
            InputStream is = StartActivity.this.getAssets().open("reactnative/" + Const.JS_BUNDLE_LOCAL_FILE);
            byte[] buffer = null;
            ByteArrayOutputStream bos = new ByteArrayOutputStream(1024);
            byte[] b = new byte[1024];
            int n;
            while ((n = is.read(b)) != -1) {
                bos.write(b, 0, n);
            }
            is.close();
            bos.close();
            buffer = bos.toByteArray();
            bundlesha = DigestUtils.md5Hex(buffer);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bundlesha;
    }

    public static String getTempBundle(Context context){
        try {
            File tempdirs=new File(Const.JS_PATCH_LOCAL_PATH_TEMP);
            if (!tempdirs.exists()) tempdirs.mkdirs();

            InputStream is = context.getAssets().open("reactnative/" + Const.JS_BUNDLE_LOCAL_FILE);
            byte[] buffer = new byte[is.available()];
            is.read(buffer);

            File targetFile = new File(Const.JS_BUNDLE_TEMP);
            OutputStream outStream = new FileOutputStream(targetFile);
            outStream.write(buffer);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return Const.JS_BUNDLE_TEMP;
    }

    /**
     * bundle文件检测
     *
     * @param context
     */
    private void checkBundleFile(final Context context) {
        String bundleUrl = baseUrl + Const.CHECK_BUNELD_NEWVIERSION;
//        final OkHttpClient client = new OkHttpClient();
        JSONObject jsonObject = new JSONObject();
        JSONObject jsonObject1 = new JSONObject();

        // SharedPreferencesHelper sharedPreferencesHelper = new SharedPreferencesHelper(context, "agree_shell_config");
        SM3Utils sm3 = new SM3Utils();
        String sign = sm3.SM3Encrypt(jsonObject.toString());
        String appId = sharedPreferencesHelper.getDecryptedData("channelNumber");
        String token = sharedPreferencesHelper.getDecryptedData("TOKEN");
        String secversion = sharedPreferencesHelper.getDecryptedData("secversion");
        if ("".equals(secversion)) secversion = "0";
        String deciceToken = appId + deviceid;
        String imei1 = deviceid;
        String appVersion = sharedPreferencesHelper.getDecryptedData("apkversion");
        String buildVersion = sharedPreferencesHelper.getDecryptedData("bundleVersion");
        if (null == buildVersion || "".equals(buildVersion)) {
            buildVersion = appVersion + "_0";
        }
//        String deviceId = AndroidDeviceUtil.getDeviceID(context);
        bhash = SharePreferenceUtils.getString(context, "bhash", "");
        if ("".equals(bhash)) {
            File file = new File(getTempBundle(this));
            if (file.exists()) {
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "aesset创建bundle地址" + file.getAbsolutePath());
                bhash = FileUtils.getMD5(file.getAbsolutePath());
                file.delete();
            }
        }
        rhash = SharePreferenceUtils.getString(context, "rhash", "");

        try {
            jsonObject1.put("imei1", imei1);
            jsonObject1.put("imei2", "");
            jsonObject1.put("meid", "");
            jsonObject1.put("devicetoken", deciceToken);
            jsonObject.put("req_msg", jsonObject1);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        //post方式 需要表单提交参数
        final RequestBody requestBody = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), jsonObject.toString());
        final Request request = new Request.Builder()
                .headers(NetworkService.getHeaderBuilder(jsonObject,false))
                .addHeader("bhash", bhash)
                .addHeader("rhash", rhash)
                .url(bundleUrl)
                .post(requestBody)
                .build();

        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》bundleUrl:" + bundleUrl);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》imei1:" + imei1);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》deciceToken:" + deciceToken);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》appVersion:" + appVersion);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》buildVersion:" + buildVersion);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》appId:" + appId);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》deviceId:" + deviceid);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》secversion:" + secversion);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》sign:" + sign);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》token:" + token);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》bhash:" + bhash);
        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》rhash:" + rhash);


        //使用异步加载，判断连接网络是否成功
        Call newCall = client.newCall(request);
        newCall.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                //连接失败
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》请求失败:" + e.getMessage());
                startActivity(new Intent(context, MainActivity.class));
                finish();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String responses = response.body().string();
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》请求成功:" + responses);
                try {
                    JSONObject object = new JSONObject(responses);
                    JSONObject header = (JSONObject) object.get("header");
                    final int code = header.getInt("code");
                    if (code == 200) {
                        JSONObject body = (JSONObject) object.get("body");
                        boolean ischeck = body.getBoolean("ischeck");//是否需要更新
                        if (ischeck) {
                            LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》bundle需要更新:");
                            //如果没有从apk里面拷贝过，才去拷贝
                            File filebudleimage = new File(Const.JS_PATCH_LOCAL_IMAGE_FILEPATH);
                            if (!filebudleimage.exists()) {
                                //获取drawable文件名列表，不包含扩展名 复制图片资源到本地
                                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》bundle图片资源拷贝本地对图片到sd卡:");
                                Field[] fields = R.drawable.class.getDeclaredFields();
                                for (Field field : fields) {
                                    int resID = getResources().getIdentifier(field.getName(), "drawable", BuildConfig.APPLICATION_ID);
                                    copyImage2Data(context, field.getName(), resID);
                                }
                            }

                            bundleversion = body.getString("version");//更新后版本号
                            String url = body.getString("url");         //增量bundle文件下载地址
                            String rurl = body.getString("rurl");        //bundle图片资源下载地址
                            bhash = body.getString("bhash");     //bundle文件的md5
                            rhash = body.getString("rhash");      //bundle图片资源md5
                            Looper.prepare();

                            //更新bundle文件
                            if (!"".equals(url) && null != url) {
                                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》更新bundle");
                                downBundle(context, url, bhash);
                            } else {
                                Message msg = new Message();
                                msg.what = BUNDLECODE;
                                msg.obj = BUNDLE;
                                handler.sendMessage(msg);
                            }

                            //更新bundle图片资源文件
                            if (!"".equals(rurl) && null != rurl) {
                                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》更新bundle图片资源");
                                downBundleImagesData(context, rurl, rhash);
                            } else {
                                Message msg = new Message();
                                msg.what = BUNDLECODE;
                                msg.obj = BUNDLEIMAGE;
                                handler.sendMessage(msg);
                            }

                            Looper.loop();
                        } else {
                            LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》bundle没有更新:");
                            startActivity(new Intent(context, MainActivity.class));
                            finish();
                        }
                    } else {
                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》请求失败:" + code);
                        startActivity(new Intent(context, MainActivity.class));
                        finish();
                    }
                } catch (JSONException e) {
                    LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》请求失败:" + e.getMessage());
                    startActivity(new Intent(context, MainActivity.class));
                    finish();
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * 根据图片id，把图片保存到sd卡
     *
     * @param mContent
     * @param name
     * @param PicID
     */
    public static void copyImage2Data(Context mContent, String name, Integer PicID) {
        try {
            String timeStamp = name + ".png";
            String filedir = Const.JS_PATCH_LOCAL_IMAGE_FILEPATH;
            File filedirs = new File(filedir);
            if (!filedirs.exists()) {
                filedirs.mkdirs();
            }
            File dir = new File(filedir, timeStamp);

            // 获得封装  文件的InputStream对象
            InputStream is = mContent.getResources().openRawResource(PicID);
            FileOutputStream fos = new FileOutputStream(dir);
            byte[] buffer = new byte[8192];
            int count = 0;
            // 开始复制Logo图片文件
            while ((count = is.read(buffer)) > 0) {
                fos.write(buffer, 0, count);
            }
            fos.close();
            is.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 下载bundle文件
     * * @param context
     *
     * @param url
     * @param md5
     */
    private void downBundle(final Context context, String url, final String md5) {
        DownloadApkUtil.get(context).download(url, Const.JS_PATCH_LOCAL_FOLDER, "patches.pat", new DownloadApkUtil.OnDownloadListener() {
            @Override
            public void onDownloadSuccess(final File file) {
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》downBundle文件地址:" + file.getPath());
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        BundleDiff bundleDiff = new BundleDiff();
                        String pathesStr = BundleDiff.getStringFromText(Const.JS_PATCH_LOCAL_FILE);
                        String bundlestr = "";
                        if (new File(Const.JS_BUNDLE_LOCAL_PATH).exists()) {
                            //存在第一次bundle,第二次更新
                            bundlestr = BundleDiff.getStringFromText(Const.JS_BUNDLE_LOCAL_PATH);
                            LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》downBundle--文件下载成功:-非第一次更新bundle,获取缓存里面的bundle");
                        } else {
                            //第一次bundle更新
                            bundlestr = BundleDiff.getJsBundleFromAssets(context);
                            LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》downBundle--文件下载成功:-第一次更新bundle,获取app里面的bundle");
                        }
                        boolean finsh = bundleDiff.onJSBundleLoadedFromServer(pathesStr, bundlestr);
                        if (finsh && new File(Const.JS_BUNDLE_LOCAL_PATH).exists()) {
                            String md5bundle = FileUtils.getMD5(Const.JS_BUNDLE_LOCAL_PATH);
                            if (md5bundle.equals(md5)) {
                                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》downBundle--文件下载成功:-bundle合并成功，md5比对正确");
                                Message msg = new Message();
                                msg.what = BUNDLECODE;
                                msg.obj = BUNDLE;
                                handler.sendMessage(msg);
                                //更新成功删除pat差量文件
                                if (file.exists()) file.delete();
                                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》downBundle--文件下载成功--bundle合并成功-删除pat文件");
                            } else {
                                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》downBundle--文件下载成功:-bundle合并成功，md5比对错误");
                                File file1 = new File(Const.JS_BUNDLE_LOCAL_PATH);
                                if (file1.exists()) file1.delete();
                                //更新成功删除pat差量文件
                                if (file.exists()) file.delete();
                                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》downBundle--文件下载成功--bundle合并成功-删除pat文件");
                                startActivity(new Intent(context, MainActivity.class));
                                finish();
                            }
                        } else {
                            LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》downBundle--文件下载成功--bundle合并失败,或者bundle不存在");
                            //更新成功删除pat差量文件
                            if (file.exists()) file.delete();
                            File file1 = new File(Const.JS_BUNDLE_LOCAL_PATH);
                            if (file1.exists()) file1.delete();
                            startActivity(new Intent(context, MainActivity.class));
                            finish();
                        }
                    }
                }).start();
            }

            @Override
            public void onDownloading(int progress) {
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》downBundle--文件下载进度:" + progress);
            }

            @Override
            public void onDownloadFailed(final Exception e) {
                //下载异常进行相关提示操作
                showToas("下载pat出错" + e.getMessage());
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "bundle检查更新（checkBundleFile---》downBundle--文件下载失败:" + e.getMessage());
                startActivity(new Intent(context, MainActivity.class));
                finish();
            }
        });
    }


    /**
     * 下载bundle图片资源
     *
     * @param context
     * @param url
     * @param md5
     */
    private void downBundleImagesData(final Context context, String url, final String md5) {
        DownloadApkUtil.get(context).download(url, Const.JS_PATCH_LOCAL_FOLDER_IMAGE, Const.JS_PATCH_LOCAL_IMAGE_NAME, new DownloadApkUtil.OnDownloadListener() {
            @Override
            public void onDownloadSuccess(final File file) {
                String md5bundleimage = FileUtils.getMD5(file.getPath());
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "下载bundle图片资源（downBundleImagesData---》图片资源下载成功地址：" + file.getPath());
                //如果hash不正确就跳过下面的操作
                if (!md5.equals(md5bundleimage)) {
                    LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "下载bundle图片资源（downBundleImagesData---》图片资源下载成功地址：--bundle资源图片md5不对，删除bundle文件");
                    File filebundle = new File(Const.JS_BUNDLE_LOCAL_PATH);
                    if (filebundle.exists()) filebundle.delete();
                    startActivity(new Intent(context, MainActivity.class));
                    finish();
                }

                try {
                    File file1 = new File(Const.JS_PATCH_LOCAL_IMAGE_FILEPATH);
                    if (!file1.exists()) file1.mkdirs();
                    boolean isok = FileUtils.upZipFile(file.getPath(), Const.JS_PATCH_LOCAL_IMAGE_FILEPATH);
                    if (isok) {
                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "下载bundle图片资源（downBundleImagesData---》图片资源解压失败：");
                        Message msg = new Message();
                        msg.what = BUNDLECODE;
                        msg.obj = BUNDLEIMAGE;
                        handler.sendMessage(msg);
                        if (file.exists()) file.delete();
                    } else {
                        LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "下载bundle图片资源（downBundleImagesData---》资源图片解压失败，删除本地bundle文件：");
                        File filebundle = new File(Const.JS_BUNDLE_LOCAL_PATH);
                        if (filebundle.exists()) filebundle.delete();
                        if (file.exists()) file.delete();
                        startActivity(new Intent(context, MainActivity.class));
                        finish();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "下载bundle图片资源（downBundleImagesData---》资源图片解压失败：");
                    File filebundle = new File(Const.JS_BUNDLE_LOCAL_PATH);
                    if (filebundle.exists()) filebundle.delete();
                    startActivity(new Intent(context, MainActivity.class));
                    finish();
                }
            }

            @Override
            public void onDownloading(int progress) {
                LogFiles.LogsToFile(StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "下载bundle图片资源（downBundleImagesData---》图片资源下载成功进度：" + progress);
            }

            @Override
            public void onDownloadFailed(final Exception e) {
                //下载异常进行相关提示操作
                LogFiles.LogsToFile(  StartActivity.this, LogFiles.TYPE_ANDROID, "StartActivity", "下载bundle图片资源（downBundleImagesData---》图片资源下载失败,删除本地bundle：" + e.getMessage());
                File filebundle = new File(Const.JS_BUNDLE_LOCAL_PATH);
                if (filebundle.exists()) filebundle.delete();
                startActivity(new Intent(context, MainActivity.class));
                finish();
            }
        });
    }
}
