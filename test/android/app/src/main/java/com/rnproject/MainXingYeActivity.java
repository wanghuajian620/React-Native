package com.rnproject;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.preference.PreferenceManager;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.core.app.ActivityCompat;

import com.cib.library.encrypt.sm3.SM3Utils;
import com.cib.library.permission.PermissionResultInterface;
import com.cib.library.permission.PermissionUtils;
import com.cib.library.sp.SPEncryptedUtils;
import com.cib.library.utils.AndroidDeviceUtil;
import com.rnproject.base.BaseActivity;
import com.rnproject.base.Const;
import com.rnproject.tools.Tools;
import com.rnproject.utils.LogUtils;
import com.rnproject.utils.SharePreferenceUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;

import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class MainXingYeActivity extends BaseActivity implements ActivityCompat.OnRequestPermissionsResultCallback {

    private final int BUNDLECODE = 1;
    private String TAG = "MainXingYeActivity";
    private LinearLayout ll_usb;
    private Intent intent;
    private TextView textView,setting_all,tv_usb1;
    private SPEncryptedUtils spUtils;
    private String[] REQUEST_PERMISSIONS = new String[]{Manifest.permission.READ_PHONE_STATE, Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION};
    private int bundlesize = 0;
    private String BUNDLE = "bundle";
    private String BUNDLEIMAGE = "bundleimage";
    private String bundleversion = "";
    private String bhash = "";
    private String rhash = "";
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
                        spUtils.setEncryptedData("bundleVersion", bundleversion);

                        //不为空的时候保存hash值，避免覆盖
                        if (!"".equals(bhash))
                            SharePreferenceUtils.setString(MainXingYeActivity.this, "bhash", bhash);
                        if (!"".equals(rhash))
                            SharePreferenceUtils.setString(MainXingYeActivity.this, "rhash", rhash);

                        //跳转rn页面
                        startActivity(new Intent(MainXingYeActivity.this, MainActivity.class));
                    }
                    break;
            }
        }
    };
//    private SharedPreferencesHelper sharedPreferencesHelper;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        this.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
        initView(R.layout.activity_main1);

        //设置竖屏
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

        textView = (TextView) findViewById(R.id.version);
        textView.setText("版本号 V" + BuildConfig.VERSION_NAME);
        setting_all = findViewById(R.id.setting_all);
        spUtils = SPEncryptedUtils.getInstance(MainXingYeActivity.this);

        //跳转设置页面
        setting_all.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainXingYeActivity.this, SettingActivity.class));
            }
        });


        findViewById(R.id.tv_usb1).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                startActivity(new Intent(MainXingYeActivity.this, WebCordovaActivity.class));
            }
        });

//        this.runOnUiThread(new Runnable() {
//            @Override
//            public void run() {
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.M) {
            PermissionUtils.checkPermission(this, TAG, REQUEST_PERMISSIONS, "为向您提供更加安全，便捷，优质的服务。我们在您使用相关功能时申请以下设备权限:\n" +
                    "1.存储权限:需要将资源文件存储在手机端。\n" +
                    "2.电话权限:需要获取您手机的设备号，来完成安全性校验。", new PermissionResultInterface() {
                @Override
                public void PermissionSuccess() {
                    //获取偏好设置
                    getShareFile();
                }

                @Override
                public void PermissionFaild() {
                    showToas("获取权限失败!");
                }
            });
        }else {
            //获取偏好设置
            getShareFile();
        }
//        });
    }

    /**
     * 获取偏好设置
     */
    private void getShareFile() {
        //读取本地配置文件
        String s = showInfo();//读取app.conf
        Const.appconf = s;
        if (s.isEmpty()) {
            spUtils.setEncryptedData("channelNumber", "14eadc3bf53740baad4825962b1f0b35");//渠道编号
            spUtils.setEncryptedData("apkversion", "1.0.0");
            spUtils.setEncryptedData("bundleVersion", "1.0.0_0");
            spUtils.setEncryptedData("isUseIndustrialBankEncrypt", "true");
            spUtils.setEncryptedData("isUseHttps", "false");
            spUtils.setEncryptedData("isUseGzip", "false");
            spUtils.setEncryptedData("interfaceUrl", "192.168.1.168");
            spUtils.setEncryptedData("httpPort", "8080");
            spUtils.setEncryptedData("httpsPort", "8442");
            spUtils.setEncryptedData("ddpushIP", "192.168.1.168:8081");
            spUtils.setEncryptedData("isCanScreenshot", "false");
            spUtils.setEncryptedData("isCheckIntegrity", "false");
            spUtils.setEncryptedData("splashUrl", "");
            spUtils.setEncryptedData("QQShareID", "1107923792");
            spUtils.setEncryptedData("WXShareID", "wx3f32af5f32318b1e");
            spUtils.setEncryptedData("WBShareKey", "1495691434");
            spUtils.setEncryptedData("isAutoReload", "false");

        } else {
            try {
                JSONObject jsonObject = new JSONObject(s);
                spUtils.setEncryptedData("channelNumber", (String) jsonObject.get("id"));//渠道编号

                String appversion = (String) jsonObject.get("version");//app版本号
                spUtils.setEncryptedData("apkversion", appversion);

                String bundversion = appversion + "_0";//bundle版本号
                spUtils.setEncryptedData("bundleVersion", bundversion);

                JSONObject IndustrialBankHTTPChannel = (JSONObject) jsonObject.get("IndustrialBankHTTPChannel");
                String isUseIndustrialBankEncrypt = (String) IndustrialBankHTTPChannel.get("isUseIndustrialBankEncrypt");//是否使用兴业通道加密
                spUtils.setEncryptedData("isUseIndustrialBankEncrypt", isUseIndustrialBankEncrypt);

                JSONObject HTTPChannel = (JSONObject) jsonObject.get("HTTPChannel");//是否使用https
                String isUseHttps = (String) HTTPChannel.get("isUseHttps");
                String isUseGzip = HTTPChannel.getString("isUseGzip");
                spUtils.setEncryptedData("isUseHttps", isUseHttps);
                spUtils.setEncryptedData("isUseGzip", isUseGzip);

                String interfaceUrl = (String) jsonObject.get("interfaceUrl");//服务接口地址
                spUtils.setEncryptedData("interfaceUrl", interfaceUrl);

                String httpPort = (String) jsonObject.get("httpPort");//http端口
                spUtils.setEncryptedData("httpPort", httpPort);

                String httpsPort = (String) jsonObject.get("httpsPort");//https端口
                spUtils.setEncryptedData("httpsPort", httpsPort);

                String ddpushIP = (String) jsonObject.get("ddpushIP");//消息推送服务IP地址
                spUtils.setEncryptedData("ddpushIP", ddpushIP);

                String QQShareID = (String) jsonObject.get("QQShareID");//qq分享id
                spUtils.setEncryptedData("QQShareID", QQShareID);

                String WXShareID = (String) jsonObject.get("WXShareID");//微信分享id
                spUtils.setEncryptedData("WXShareID", WXShareID);

                String WBShareKey = (String) jsonObject.get("WBShareKey");//微博分享id
                spUtils.setEncryptedData("WBShareKey", WBShareKey);

//                String isAutoReload = (String) jsonObject.get("isAutoReload");//是否自动reload
//                spUtils.setEncryptedData("isAutoReload", isAutoReload);

                String isCanScreenshot = (String) jsonObject.get("isCanScreenshot");
                spUtils.setEncryptedData("isCanScreenshot",isCanScreenshot);

                String isCheckIntegrity = (String) jsonObject.get("isCheckIntegrity");
                spUtils.setEncryptedData("isCheckIntegrity",isCheckIntegrity);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        String CAStr = showCAInfo();//读取CA证书
        if (CAStr.isEmpty()) {
            spUtils.setEncryptedData("ca", "MIIC2DCCAkGgAwIBAgIJAN2WeZfS+GcbMA0GCSqGSIb3DQEBCwUAMIGEMQswCQYD\n" +
                    "VQQGEwJDTjERMA8GA1UECAwIU2hhbmdIYWkxDzANBgNVBAcMBlBvRG9uZzEOMAwG\n" +
                    "A1UECgwFYWdyZWUxCzAJBgNVBAsMAml0MRYwFAYDVQQDDA0xOTIuMTY4LjEuMTY4\n" +
                    "MRwwGgYJKoZIhvcNAQkBFg10ZXN0QHRlc3QuY29tMB4XDTE4MDcyNDA2MzA1N1oX\n" +
                    "DTE5MDcyNDA2MzA1N1owgYQxCzAJBgNVBAYTAkNOMREwDwYDVQQIDAhTaGFuZ0hh\n" +
                    "aTEPMA0GA1UEBwwGUG9Eb25nMQ4wDAYDVQQKDAVhZ3JlZTELMAkGA1UECwwCaXQx\n" +
                    "FjAUBgNVBAMMDTE5Mi4xNjguMS4xNjgxHDAaBgkqhkiG9w0BCQEWDXRlc3RAdGVz\n" +
                    "dC5jb20wgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBANW/2Dr6gQJV8+k1GQtN\n" +
                    "Q+lS9LcAD3wVJ6kF7fnQotXrJJyPwe+Cikf+RzBys8rZXTyXdYA2wfOXFrkEDIte\n" +
                    "pr1bwvMdp5/1mO4S2BJXqwmw2atJVjeE89BW+7WpAOvlbAlOcc4mBrzLq4JmUD2s\n" +
                    "C/V/ri8OGBltJ4mcTLjd4Ua5AgMBAAGjUDBOMB0GA1UdDgQWBBT7cm3Xw6JVyJ2F\n" +
                    "GLqdKBHzns599jAfBgNVHSMEGDAWgBT7cm3Xw6JVyJ2FGLqdKBHzns599jAMBgNV\n" +
                    "HRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4GBAEsBFfQ8p967x7QzInyJZYpjXmv7\n" +
                    "6SqeFcdGKnAnnVp1mXPKj6TCewukCb3AZXPXJgwB3ZspBkg0CDAi2MGkfIR7s5PK\n" +
                    "JsoTBy9PO4vz1pr9bEJgi51ikSOwPzMrvSgTos4o8RXG+XOdNG/fCAUAfOmF42JC\n" +
                    "ziXzhPJHOnMpLLBa");
        } else {
            spUtils.setEncryptedData("ca", CAStr);
        }
        String RSAStr = showRSAInfo();//读取RSA证书
//        String RSAStr = read("rsa_public_key.pem");
        if (RSAStr.isEmpty()) {
            Log.e("fgq", "RSAStr===11" + RSAStr);
            spUtils.setEncryptedData("rsa", "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAweDgHjma3V/XE6Dswat9\n" +
                    "0scLerL0JbZzthU8s1BXD1K15nEHltAXtvi1ztnExY+NzMico+UGLZ599fhBrG6K\n" +
                    "qmJuHs26zlzpNhQa6INekGcKqEaAmzb/GbiAtClecX0r6U2K0GVigrKt2exlNRga\n" +
                    "0FcJbMwPH1/vGKCtldP0jyUyAfpIU57NMdfgJml/UGjCDtQ1WHHt51oBZYewRUIl\n" +
                    "iCptnQcqtnjowvAtNfxGDZ1Pb+U75PX/qyx5eRsopTduylHD4O/xWTRB3kP2VkYw\n" +
                    "DQH026RK//Xzra9d3mGmwSnlwq17UZXKzghof7Ze9rApRFjfrmF5OWLy1D3GHFXI\n" +
                    "92ObGFV/S9Pc8Rc0T4vsQXmWizaHz5hu8x+V4cYqsq/JCH2J+Z3BzNcNDbW8ouIj\n" +
                    "vKHBdIBLhdZ5L3AgdGa6GwjqRiWFZIZzjjY30veNeuo9hbPMb4FGlgLrZyzB7Rnn\n" +
                    "/40H80WeOpxvYmVyPUWtWFrrW/Y1Wu/NuI0mkCa5sa0SMjZkaV9a/xlROC277Q0P\n" +
                    "ucO+P+vmkgEVjaSqOuPcKF+MffMJqUxOEcwHrKPkmlgvGWe3GgzOGWwk35WtD40v\n" +
                    "d+vrOwVL3Kn2Mk0EHtjrhumDMbsZdyU/pBrmcWKOk7KMMxE8pwJoTo4wDT/DaSWz\n" +
                    "g6FpyIF7fp9tK5YSiSBX92MCAwEAAQ==");
        } else {
            Log.e("fgq", "RSAStr===22" + RSAStr);
            spUtils.setEncryptedData("rsa", RSAStr);
        }

        // 上报设备信息
        uploadDeviceInfo();

        intoReload();
    }

    /**
     * 上传设备信息
     */
    @SuppressLint("NewApi")
    private void uploadDeviceInfo() {
        final OkHttpClient client = new OkHttpClient();
        JSONObject jsonObject = new JSONObject();
        JSONObject jsonObject1 = new JSONObject();
        Intent intent = registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));


        SM3Utils sm3 = new SM3Utils();
        String sign = sm3.SM3Encrypt(jsonObject.toString());
        String appId = spUtils.getDecryptedData("channelNumber");
        String token = spUtils.getDecryptedData("TOKEN");
        String secversion = spUtils.getDecryptedData("secversion");
        if ("".equals(secversion)) secversion = "0";
        String deciceToken = appId + Tools.getIMEI(MainXingYeActivity.this);

        String appVersion = spUtils.getDecryptedData("apkversion");
        String buildVersion = spUtils.getDecryptedData("bundleVersion");
        String httpurl = spUtils.getDecryptedData("interfaceUrl");
        if (TextUtils.isEmpty(httpurl)){
            showToas("服务接口地址为空!");
            return;
        }
        if (null == buildVersion || "".equals(buildVersion)) {
            buildVersion = appVersion + "_0";
        }
        @SuppressLint("MissingPermission")
        String deviceId = AndroidDeviceUtil.getDeviceID(MainXingYeActivity.this);
        try {
            Map imeiAndMeid = null;
            String imei1 = "",imei2 = "",meid = "";
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                imeiAndMeid = AndroidDeviceUtil.getImeiAndMeid(MainXingYeActivity.this);
                imei1 = imeiAndMeid.get("imei1")+"";
                imei2 = imeiAndMeid.get("imei2")+"";
                meid = imeiAndMeid.get("meid")+"";

            }else {
                imei1 = Tools.getIMEI(MainXingYeActivity.this);
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

            DisplayMetrics displayMetrics = AndroidDeviceUtil.getDisplayMetrics(MainXingYeActivity.this);
            ActivityManager.MemoryInfo memoryInfo = AndroidDeviceUtil.getMemoryInfo(MainXingYeActivity.this);
            jsonObject1.put("imei1", imei1);
            jsonObject1.put("imei2", imei2);
            jsonObject1.put("meid", meid);
            jsonObject1.put("devicetoken", deciceToken);
            jsonObject1.put("sbxh",Build.MODEL);//设备型号
//            jsonObject1.put("sbmc",Build.DEVICE);//设备名称
            jsonObject1.put("fbl",displayMetrics.widthPixels + "*" + displayMetrics.heightPixels);//分辨率
            jsonObject1.put("yy", AndroidDeviceUtil.getSystemLanguage(MainXingYeActivity.this));//语言
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

        String ishttps = spUtils.getDecryptedData("isUseHttps");
        //post方式 需要表单提交参数
        final RequestBody requestBody = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), jsonObject.toString());
        final Request request = new Request.Builder()
                .addHeader("CHANNELTYPE", "0")
                .addHeader("APPVERSION", appVersion)
                .addHeader("BUNDLEVERSION", buildVersion)
                .addHeader("APPID", appId)
                .addHeader("DEVICEID", deviceId)
                .addHeader("SECURITYVERSION", secversion)
                .addHeader("SIGN", sign)
                .addHeader("TOKEN", token)
                .url("true".equals(ishttps) ? ("https://" + httpurl + ":" + spUtils.getDecryptedData("httpsPort")) + Const.UPLOADDEVLOADINFO :
                        ("http://" + httpurl + ":" + spUtils.getDecryptedData("httpPort")) + Const.UPLOADDEVLOADINFO)
                .post(requestBody)
                .build();
        Log.e(TAG, "checkBundleFile: " + Const.UPLOADDEVLOADINFO);
        Log.e(TAG, "DEVICEID: " + Tools.getIMEI(MainXingYeActivity.this));


        //使用异步加载，判断连接网络是否成功
        Call newCall = client.newCall(request);
        newCall.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                //连接失败
                showToas("上报设备信息失败!");
                LogUtils.print("上报设备信息失败" + e.getMessage());
//                 startActivity(new Intent(MainXingYeActivity.this,AgreeReactActivity.class));
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String body = response.body().string();
                LogUtils.print("上报设备信息body" + body);
                JSONObject jsonObject = null;
                try {
                    jsonObject = new JSONObject(body);
                    JSONObject jsonObject2 = jsonObject.getJSONObject("header");
                    String code = jsonObject2.getString("code");
                    String message = jsonObject2.getString("msg");
                    if ("200".equals(code)) {
                        showToas("上报设备信息成功!");
                        LogUtils.print("上报设备信息uploadDeviceInfo成功");
                    } else {
                        LogUtils.print("上报设备信息uploadDeviceInfo失败");
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
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
        MainXingYeActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(MainXingYeActivity.this, s, Toast.LENGTH_LONG).show();
            }
        });
    }

    /**
     * 显示信息
     *
     * @return
     */
    private String showInfo() {
        File file = new File(Environment.getExternalStorageDirectory() + "/sharefile/app.conf");
        String result = "";
        String str = "";
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
            while ((str = reader.readLine()) != null) {
                result += str;
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 读取CA证书
     *
     * @return
     */
    private String showCAInfo() {
        File file = new File(Environment.getExternalStorageDirectory() + "/sharefile/ca.crt");
        String result = "";
        String str = "";
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
            while ((str = reader.readLine()) != null) {
                result += str;
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 读取RSA证书
     *
     * @return
     */
    private String showRSAInfo() {
        File file = new File(Environment.getExternalStorageDirectory() + "/sharefile/rsa_public_key.pem");
        String result = "";
        String str = "";
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
            while ((str = reader.readLine()) != null) {
                result += str;
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    protected void onResume() {
        super.onResume();
        //启动推送服务注册
//        intent = new Intent(this, DDPushTCPClientService.class);
//        this.startService(intent);

        //bundle更新
//        initDownloadManager();
//        updateBundle();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }


    /**
     * UsbTestClick直接进入rn页面
     *
     * @param view
     */
    public void UsbTestClick(View view) {
        //暂时注释
        clearWifiData();
        startActivity(new Intent(this, MainActivity.class));
        //MainApplication.getDDPushPackage().mModule.nativeCallRn("ddpush的推送消息");
    }

    /**
     * wifi调试页面
     *
     * @param view
     */
    public void WifiTestClick(View view) {
        startActivity(new Intent(this, WifiActivity.class));
    }

    /**
     * 清除wifi数据
     */
    public void clearWifiData() {
        String PREFS_DEBUG_SERVER_HOST_KEY = "debug_http_host";
        SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(this);
        sp.edit().putString(PREFS_DEBUG_SERVER_HOST_KEY, "").commit();
    }

    /**
     * intoReload
     */
    public void intoReload() {
        String isAutoReload = spUtils.getDecryptedData("isAutoReload");
        if (!"true".equals(isAutoReload)) return;
        SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        String PREFS_DEBUG_SERVER_HOST_KEY = "debug_http_host";

        String hostFromSettings = sp.getString(PREFS_DEBUG_SERVER_HOST_KEY, "");
        if (!"".equals(hostFromSettings)) {
            String[] hostStr = hostFromSettings.split(":");
            String strAddress = hostStr[0];
            String strnum = hostStr[1];
            Log.e("fgq", "strAddress==" + strAddress + "strnum===" + strnum);
            sp.edit().putString(PREFS_DEBUG_SERVER_HOST_KEY, strAddress + ":" + strnum).commit();
            //跳转到rn页面
            startActivity(new Intent(this,MainActivity.class));
        }
    }

    /**
     * 读取rsa证书和https证书
     *
     * @param filename
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
}
