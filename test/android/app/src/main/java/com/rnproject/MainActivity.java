package com.rnproject;

import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.rnproject.ddpush.DDPushModule;
import com.rnproject.ddpush.DDPushTCPClientService;

public class MainActivity extends ReactActivity {
  public static String ONCLICKENENT = "onclickEvent";
  private Intent intent;
  private boolean needAlarm = true;
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RNProject";
  }

  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    super.onCreate(savedInstanceState, persistentState);
    //防止应用被截屏
    if (BuildConfig.isCanScreenshot) {
      this.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
    }

    //处理通知栏点击事件
        String eventStr = getIntent().getStringExtra(ONCLICKENENT);
        if (null != eventStr && !"".equals(eventStr)) {
            DDPushModule ddPushModule = MainApplication.getDDPushPackage().getPushModule();
            if (null == ddPushModule) {
                return;
            }
            ddPushModule.nativeCallRn(eventStr);
        }
        intent = new Intent(this, DDPushTCPClientService.class);
//        this.startService(intent);
  }

  @Override
  protected void onPause() {
    super.onPause();
    if (needAlarm) {
      Toast.makeText(getApplicationContext(), R.string.app_act, Toast.LENGTH_SHORT).show();
    }
  }


  @Override
  public boolean onKeyDown(int keyCode, KeyEvent event) {
    if (keyCode == KeyEvent.KEYCODE_BACK || keyCode == KeyEvent.KEYCODE_HOME && event.getRepeatCount() == 0) {
      needAlarm = false;
    }
    return super.onKeyDown(keyCode, event);
  }

      @Override
    protected void onDestroy() {
        super.onDestroy();
        if (null != intent){
            this.stopService(intent);
        }
    }
}
