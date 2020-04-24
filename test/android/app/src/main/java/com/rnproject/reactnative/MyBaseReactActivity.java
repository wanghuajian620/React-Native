//package com.rnproject.reactnative;
//
//import android.app.Activity;
//import android.content.Context;
//import android.content.Intent;
//import android.content.pm.ActivityInfo;
//import android.hardware.Sensor;
//import android.hardware.SensorManager;
//import android.os.Bundle;
//import android.util.Log;
//import android.view.KeyEvent;
//import android.view.View;
//import android.view.WindowManager;
//import android.widget.Toast;
//import com.com.com.facebook.react.ReactInstanceManager;
//import com.com.com.facebook.react.ReactNativeHost;
//import com.com.com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
//import com.com.com.facebook.react.modules.core.PermissionAwareActivity;
//import com.com.com.facebook.react.modules.core.PermissionListener;
//import com.rnproject.BuildConfig;
//import com.rnproject.MainApplication;
//import com.rnproject.R;
//import com.rnproject.tools.Config;
//
//import java.io.File;
//
//import javax.annotation.Nullable;
//
///**
// * 作者：王海洋
// * 时间：2017/11/30 19:10
// */
//
//public abstract class MyBaseReactActivity extends Activity
//        implements DefaultHardwareBackBtnHandler, PermissionAwareActivity {
//
//
//    /**
//     * Base Activity for React Native applications.
//     */
//    private final MyReactActivityDelegate mDelegate;
//    private boolean immersiveMode;
//
//    protected MyBaseReactActivity() {
//        mDelegate = createReactActivityDelegate();
//    }
//
//    /**
//     * Returns the name of the main component registered from JavaScript.
//     * This is used to schedule rendering of the component.
//     * e.g. "MoviesApp"
//     */
//    protected @Nullable
//    String getMainComponentName() {
//        return null;
//    }
//
//    /**
//     * Called at construction time, override if you have a custom delegate implementation.
//     */
//    protected MyReactActivityDelegate createReactActivityDelegate() {
//        return new MyReactActivityDelegate(this, getMainComponentName());
//    }
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        //防止应用被截屏
//        if (BuildConfig.isCanScreenshot) {
//            this.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
//        }
//
//        //检测设备是否root
//        if (isRoot()) {
//            Toast.makeText(getApplicationContext(), R.string.app_root, Toast.LENGTH_SHORT).show();
//        }
//        //检测设备是否为模拟器
//        if (notHasLightSensorManager(this)) {
//            Toast.makeText(getApplicationContext(), R.string.app_notdevice, Toast.LENGTH_SHORT).show();
//        }
//
//
//        final Bundle bundle = this.getIntent().getExtras();
//        if (bundle != null && bundle.containsKey("url")) {
//            changeUrl(bundle.getString("url"));
//        }
//        mDelegate.onCreate(savedInstanceState);
//        setScreen();
//
//        //基座不需要，壳子需要
//        if (!BuildConfig.isjizuo){
//            Log.d("ld", "onCreate: " + BuildConfig.isjizuo);
//            Config.saveAppConfig(this);
//        }
//    }
//
//    //检测设备是否root
//    private boolean isRoot() {
//        boolean bool = false;
//        try {
//            if ((!new File("/system/bin/su").exists()) && (!new File("/system/xbin/su").exists())) {
//                bool = false;
//            } else {
//                bool = true;
//            }
//        } catch (Exception e) {
//        }
//        return bool;
//    }
//
//    //检测设备是否为模拟器
//    private boolean notHasLightSensorManager(Context context) {
//        SensorManager sensorManager = (SensorManager) context.getSystemService(SENSOR_SERVICE);
//        Sensor sensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);
//        if (null == sensor) {
//            return true;
//        } else {
//            return false;
//        }
//    }
//
//
//    protected void changeUrl(final String changeUrlStr) {
//        //迁移代码先注释掉
////        ((MainApplication) this.getApplication()).setChangeUrlStr(changeUrlStr);
//        mDelegate.setReactNativeHost(((MainApplication) this.getApplication()).getReactNativeHost());
//    }
//
//    @Override
//    protected void onPause() {
//        super.onPause();
//        mDelegate.onPause();
//    }
//
//    @Override
//    protected void onResume() {
//        super.onResume();
//        mDelegate.onResume();
//    }
//
//    @Override
//    protected void onDestroy() {
//        super.onDestroy();
//        mDelegate.onDestroy();
//
//    }
//
//    @Override
//    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        mDelegate.onActivityResult(requestCode, resultCode, data);
//    }
//
//    @Override
//    public boolean onKeyUp(int keyCode, KeyEvent event) {
//        return mDelegate.onKeyUp(keyCode, event) || super.onKeyUp(keyCode, event);
//    }
//
//    @Override
//    public void onBackPressed() {
//        if (!mDelegate.onBackPressed()) {
//            super.onBackPressed();
//        }
//    }
//
//    @Override
//    public void invokeDefaultOnBackPressed() {
//        super.onBackPressed();
//    }
//
//    @Override
//    public void onNewIntent(Intent intent) {
//        if (!mDelegate.onNewIntent(intent)) {
//            super.onNewIntent(intent);
//        }
//    }
//
//    @Override
//    public void requestPermissions(
//            String[] permissions,
//            int requestCode,
//            PermissionListener listener) {
//        mDelegate.requestPermissions(permissions, requestCode, listener);
//    }
//
//    @Override
//    public void onRequestPermissionsResult(
//            int requestCode,
//            String[] permissions,
//            int[] grantResults) {
//        mDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
//    }
//
//    protected final ReactNativeHost getReactNativeHost() {
//        return mDelegate.getReactNativeHost();
//    }
//
//    protected final ReactInstanceManager getReactInstanceManager() {
//        return mDelegate.getReactInstanceManager();
//    }
//
//    protected final void loadApp(String appKey) {
//        mDelegate.loadApp(appKey);
//    }
//
//    private void setScreen() {
//        //设置横竖屏
//        if ("landscape" == BuildConfig.SCREEN_ORIENTATION) {
//            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
//        } else if ("portrait" == BuildConfig.SCREEN_ORIENTATION) {
//            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
//        } else if ("unspecified" == BuildConfig.SCREEN_ORIENTATION) {
//            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
//        }
//        //设置全屏
//        // if (BuildConfig.FULL_SCREEN) {
//        //     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
//        //         immersiveMode = true;
//        //     } else {
//        //         getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
//        //                 WindowManager.LayoutParams.FLAG_FULLSCREEN);
//        //     }
//        // } else {
//        //     getWindow().setFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN,
//        //             WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
//        // }
//    }
//
//    @Override
//    public void onWindowFocusChanged(boolean hasFocus) {
//        super.onWindowFocusChanged(hasFocus);
//        if (hasFocus && immersiveMode) {
//            int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
//
//            getWindow().getDecorView().setSystemUiVisibility(uiOptions);
//        }
//    }
//
//}
