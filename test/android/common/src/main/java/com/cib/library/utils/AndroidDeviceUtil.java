package com.cib.library.utils;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.res.Resources;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Environment;
import android.os.StatFs;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.util.Log;

import com.cib.library.BaseApplication;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import static android.Manifest.permission.READ_PHONE_STATE;

/**
 * @author
 * @version 1.0.0
 * @create 2019/5/27
 */
public class AndroidDeviceUtil {

    /**
     * @return
     */
    public static String getExternalDataPath() {
        return Environment.getExternalStorageDirectory().getAbsolutePath();
    }

    /**
     * 返回SD卡根路径 / ，完整路径：/storage/emulated/0
     *
     * @return
     */
    public static String getSdCardDataPath() {
        return Environment.getExternalStorageDirectory().getAbsolutePath();
    }

    /**
     * 设备是否root
     * */
    public static boolean isDeviceRooted() {
        String su = "su";
        String[] locations = {"/system/bin/", "/system/xbin/", "/sbin/", "/system/sd/xbin/",
                "/system/bin/failsafe/", "/data/local/xbin/", "/data/local/bin/", "/data/local/",
                "/system/sbin/", "/usr/bin/", "/vendor/bin/"};
        for (String location : locations) {
            if (new File(location + su).exists()) {
                return true;
            }
        }
        return false;
    }

    /**
     * 获取系统语言
     * @return
     */
    public static String getSystemLanguage(Context context) {
        String language = null;
        try{
            language = context.getResources().getConfiguration().locale.getLanguage();
        }catch (Exception e){
            e.printStackTrace();
        }
        return language;
    }


    /*
    * 获取电池电量信息
    * **/
    public class BatteryReceiver extends BroadcastReceiver {

        public void registerBatteryReceiver(Context context){
            IntentFilter intentFilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
            context.registerReceiver(this, intentFilter);
        }

        /**
         * 是否处于充电状态
         */
        private boolean isBatteryCharging;
        /**
         * 电池温度
         */
        private int batteryTemp;

        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (action.equals(Intent.ACTION_BATTERY_CHANGED)) {
                //电池电量，数字
                Log.d("Battery", "" + intent.getIntExtra(BatteryManager.EXTRA_LEVEL, 0));
                //电池最大容量
                Log.d("Battery", "" + intent.getIntExtra(BatteryManager.EXTRA_SCALE, 0));
                //电池伏数
                Log.d("Battery", "" + intent.getIntExtra(BatteryManager.EXTRA_VOLTAGE, 0));
                //电池温度
                batteryTemp = intent.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, 0);
                Log.d("Battery", "" + batteryTemp);

                //电池状态，返回是一个数字
                // BatteryManager.BATTERY_STATUS_CHARGING 表示是充电状态
                // BatteryManager.BATTERY_STATUS_DISCHARGING 放电中
                // BatteryManager.BATTERY_STATUS_NOT_CHARGING 未充电
                // BatteryManager.BATTERY_STATUS_FULL 电池满
                int batteryStatus = intent.getIntExtra(BatteryManager.EXTRA_STATUS, BatteryManager.BATTERY_STATUS_UNKNOWN);
                Log.d("Battery", "" + batteryStatus);
                if(batteryStatus == BatteryManager.BATTERY_STATUS_CHARGING){
                    isBatteryCharging = true;
                }else{
                    isBatteryCharging = false;
                }

                //充电类型 BatteryManager.BATTERY_PLUGGED_AC 表示是充电器，不是这个值，表示是 USB
                Log.d("Battery", "" + intent.getIntExtra(BatteryManager.EXTRA_PLUGGED, 0));

                //电池健康情况，返回也是一个数字
                //BatteryManager.BATTERY_HEALTH_GOOD 良好
                //BatteryManager.BATTERY_HEALTH_OVERHEAT 过热
                //BatteryManager.BATTERY_HEALTH_DEAD 没电
                //BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE 过电压
                //BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE 未知错误
                Log.d("Battery", "" + intent.getIntExtra(BatteryManager.EXTRA_HEALTH, BatteryManager.BATTERY_HEALTH_UNKNOWN));
            }
        }
    }



    /**
     * 获取系统存储空间信息
     * @return
     */
    public static StatFs getSystemStatFs(){
        String state = Environment.getExternalStorageState();
        if(Environment.MEDIA_MOUNTED.equals(state)) {
            File sdcardDir = Environment.getExternalStorageDirectory();
            StatFs sf = new StatFs(sdcardDir.getPath());
            long blockSize = sf.getBlockSize();
            long blockCount = sf.getBlockCount();
            long availCount = sf.getAvailableBlocks();
            Log.i("", "block大小:"+ blockSize+",block数目:"+ blockCount+",总大小:"+blockSize*blockCount/1024+"KB");
            Log.i("", "可用的block数目：:"+ availCount+",剩余空间:"+ availCount*blockSize/1024+"KB");
            return sf;
        }
        return null;
    }


    /**
     * 获取状态栏高度
     * @param context
     * @return
     */
    public static int getStatusBarHeight(Context context) {
        Resources resources = context.getResources();
        int resourceId = resources.getIdentifier("status_bar_height", "dimen", "android");
        int height = resources.getDimensionPixelSize(resourceId);
        return height;
    }

    /**
     * 获取当前内存信息对象
     *
     * @return 当前内存信息对象。
     */
    public static ActivityManager.MemoryInfo getMemoryInfo(Context context) {
        ActivityManager.MemoryInfo mi = new ActivityManager.MemoryInfo();
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        activityManager.getMemoryInfo(mi);
        return mi;
    }

    /**
     * 基带版本
     * @return
     */
    public static String getBasebandVer() {
        String Version = "";
        try {
            Class cl = Class.forName("android.os.SystemProperties");
            Object invoker = cl.newInstance();
            Method m = cl.getMethod("get", new Class[] { String.class,String.class });
            Object result = m.invoke(invoker, new Object[]{"gsm.version.baseband", "no message"});
            Version = (String)result;
        } catch (Exception e) {
        }
        return Version;
    }

    /**
     * 获取设备modle
     * */
    public static String getModel() {
        String model = Build.MODEL;
        if (model != null) {
            model = model.trim().replaceAll("\\s*", "");
        } else {
            model = "";
        }
        return model;
    }

    private static TelephonyManager getTelephonyManager() {
        return (TelephonyManager) BaseApplication.getInstance().getSystemService(Context.TELEPHONY_SERVICE);
    }

    //获取设备的唯一标示
    @SuppressLint({"HardwareIds", "MissingPermission"})
    public static String getDeviceID(Context context) {
        String deviceid;
        try {
            TelephonyManager telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            deviceid = telephonyManager.getDeviceId();
        } catch (Exception e) {
            deviceid = "";
        }
        return deviceid;
    }

    //获取设备的唯一MEID
    @SuppressLint({"MissingPermission", "NewApi"})
    public static String getMEID(Context context){
        String meid;
        try {
            TelephonyManager telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            meid = telephonyManager.getMeid();
        } catch (Exception e) {
            meid = "";
        }
        return meid;
    }

    /**
     * 获取IMEI IMEI2 MEID
     * @param ctx
     * @return
     */
    @SuppressLint({"MissingPermission", "NewApi"})
    public static Map getImeiAndMeid(Context ctx) {
        Map<String, String> map = new HashMap<String, String>();
        TelephonyManager mTelephonyManager = (TelephonyManager) ctx.getSystemService(Activity.TELEPHONY_SERVICE);
        Class<?> clazz = null;
        Method method = null;//(int slotId)

        try {
            clazz = Class.forName("android.os.SystemProperties");
            method = clazz.getMethod("get", String.class, String.class);
            String gsm = (String) method.invoke(null, "ril.gsm.imei", "");


            String meid = mTelephonyManager.getMeid();
            map.put("meid", meid);
            if (!TextUtils.isEmpty(gsm)) {
                //the value of gsm like:xxxxxx,xxxxxx
                String imeiArray[] = gsm.split(",");
                if (imeiArray != null && imeiArray.length > 0) {
                    map.put("imei1", imeiArray[0]);

                    if (imeiArray.length > 1) {
                        map.put("imei2", imeiArray[1]);
                    } else {
                        map.put("imei2", mTelephonyManager.getImei(1));
                    }
                } else {
                    map.put("imei1", mTelephonyManager.getImei(0));
                    map.put("imei2", mTelephonyManager.getImei(1));
                }
            } else {
                map.put("imei1", mTelephonyManager.getImei(0));
                map.put("imei2", mTelephonyManager.getImei(1));

            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        return map;
    }

    /**
     * 验证手机格式
     */
    public static boolean isMobile(String number) {
    /*
    移动：134、135、136、137、138、139、150、151、152、157(TD)、158、159、178(新)、182、184、187、188
    联通：130、131、132、152、155、156、185、186
    电信：133、153、170、173、177、180、181、189、（1349卫通）
    总结起来就是第一位必定为1，第二位必定为3或5或8，其他位置的可以为0-9
    */
        String num = "[1][34578]\\d{9}";//"[1]"代表第1位为数字1，"[34578]"代表第二位可以为3、4、5、7、8中的一个，"\\d{9}"代表后面是可以是0～9的数字，有9位。
        if (TextUtils.isEmpty(number)) {
            return false;
        } else {
            //matches():字符串是否在给定的正则表达式匹配
            return number.matches(num);
        }
    }

    /**
     *
     * 调用屏幕分辨率
     *
     */
    public static WritableMap getScreenResolv(Activity activity){
        WritableMap mMap = Arguments.createMap();
        DisplayMetrics metrics = getDisplayMetrics(activity);
        int width = metrics.widthPixels;
        int height = metrics.heightPixels;
        mMap.putInt("widthObj",width);
        mMap.putInt("heightObj",height);
        return mMap;
    }

    public static DisplayMetrics getDisplayMetrics(Activity activity) {
        DisplayMetrics metrics = new DisplayMetrics();
        activity.getWindowManager().getDefaultDisplay().getMetrics(metrics);
        return metrics;
    }

    /**
     *
     * 调用屏幕分辨率
     *
     */
    public static HashMap<String,Object> getCordovaScreenResolv(Activity activity){
        HashMap<String,Object> mMap = new HashMap<>();
        DisplayMetrics metrics = getDisplayMetrics(activity);
        int width = metrics.widthPixels;
        int height = metrics.heightPixels;
        mMap.put("widthObj",width);
        mMap.put("heightObj",height);
        return mMap;
    }

    /**
     * 获取设备ip
     * */
    public static String getPhoneIp(Context context) {
        String phoneIp = NetUtils.getPhontIP(context);
        if (TextUtils.isEmpty(phoneIp)) {
            phoneIp = "0.0.0.0";
        }
        return phoneIp;
    }
}
