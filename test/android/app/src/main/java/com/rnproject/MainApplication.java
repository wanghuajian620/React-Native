package com.rnproject;

import android.app.Application;
import android.content.Context;
import android.content.IntentFilter;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.util.Log;
import android.view.WindowManager;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.multidex.MultiDex;

import com.cib.library.file.LogFiles;
import com.cib.library.runlogplugin.RunLogPackage;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.rnproject.base.Const;
import com.rnproject.ddpush.DDPushPackage;
import com.rnproject.reactnative.ReactNativePreLoader;
import com.rnproject.receive.NotificationClickedReceiver;
import com.rnproject.splashscreen.SplashScreenReactPackage;
import com.rnproject.tools.Config;
import com.rnproject.utils.ActivitiesManager;
import com.rnproject.utils.CrashHandler;
import com.rnproject.utils.SharePreferenceUtils;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private static final DDPushPackage mCommPackage = new DDPushPackage();
    private static List<ReactPackage> packages = null;
    private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
//          @SuppressWarnings("UnnecessaryLocalVariable")
          packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
            packages.add(new RunLogPackage());
            packages.add(new SplashScreenReactPackage());
            packages.add(mCommPackage);
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }


          //判断使用的是本地的bundle还是accest里面的bundle文件
//          @Nullable
          @Override
          protected String getJSBundleFile() {
              File file = new File(Const.JS_BUNDLE_LOCAL_PATH);
              if (file != null && file.exists()) {
                  Log.e("cib", "sd卡的bundle");
                  return Const.JS_BUNDLE_LOCAL_PATH;
              } else {
                  Log.e("cib", "assest的bundle");
                  return super.getJSBundleFile();
              }
          }

          //默认的bundle名称
          @Nullable
          @Override
          protected String getBundleAssetName() {
              return "reactnative/index.android.bundle";
          }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
    private IntentFilter intentFilter;
    private NotificationClickedReceiver notificationClickedReceiver;
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    //initializeFlipper(this); // Remove this line if you don't want Flipper enabled

      //更新时删除旧bundle需调用此方法
      newDeleteOldBundle(this);

      //记录崩溃日志信息 调试状态下 关闭
      if (!BuildConfig.isjizuo){
          CrashHandler crashHandler = CrashHandler.getInstance();
          crashHandler.init(this);
      }

      //预加载bundle 的工具类初始化
//      ReactNativePreLoader.preLoad(this,"index");

      //关于点击通知栏消息跳转的代码
      notificationClickedReceiver = new NotificationClickedReceiver();
      intentFilter = new IntentFilter();
      intentFilter.addAction(Const.NOTICEACTION);
      this.registerReceiver(notificationClickedReceiver, intentFilter);

      // 注册 Activity 生命周期监测
      ActivitiesManager.getInstance().register(this);

      //检测设备是否root
      if (isRoot()) {
          Toast.makeText(this, R.string.app_root, Toast.LENGTH_SHORT).show();
      }
      //检测设备是否为模拟器
      if (notHasLightSensorManager(this)) {
          Toast.makeText(this, R.string.app_notdevice, Toast.LENGTH_SHORT).show();
      }

      //基座不需要，壳子需要
      if (!BuildConfig.isjizuo){
          Log.d("ld", "onCreate: " + BuildConfig.isjizuo);
          Config.saveAppConfig(this);
      }
  }


    //检测设备是否root
    private boolean isRoot() {
        boolean bool = false;
        try {
            if ((!new File("/system/bin/su").exists()) && (!new File("/system/xbin/su").exists())) {
                bool = false;
            } else {
                bool = true;
            }
        } catch (Exception e) {
        }
        return bool;
    }

    //检测设备是否为模拟器
    private boolean notHasLightSensorManager(Context context) {
        SensorManager sensorManager = (SensorManager) context.getSystemService(SENSOR_SERVICE);
        Sensor sensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);
        if (null == sensor) {
            return true;
        } else {
            return false;
        }
    }


    @Override
    public void onTerminate() {
        super.onTerminate();
        ActivitiesManager.getInstance().unregister(this);
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(base);
    }

    public static List<ReactPackage> getPackageList() {
        return packages;
    }

    public static DDPushPackage getDDPushPackage() {
        return mCommPackage;
    }
    /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

    /**
     * 删除旧的bundle
     * * @param context
     */
    private void newDeleteOldBundle(Context context) {
        String appversion = SharePreferenceUtils.getString(context, "appVersion", "");
        if (!appversion.equals(BuildConfig.VERSION_NAME) && !"".equals(appversion)) {
            SharePreferenceUtils.setString(context, "bhash", "");
            SharePreferenceUtils.setString(context, "rhash", "");
            LogFiles.deleteSDFile(new File(Const.SD_PATH_BUNDLE));
        }
        SharePreferenceUtils.setString(context, "appVersion", BuildConfig.VERSION_NAME);
    }
}
