//package com.rnproject.reactnative;
//
//import android.content.Intent;
//import android.os.Bundle;
//import android.view.KeyEvent;
//import android.widget.Toast;
//
//import androidx.annotation.Nullable;
//
//import com.rnproject.R;
////import com.cib.android.ddpush.DDPushTCPClientService;
//
///**
// * 作者：王海洋
// * 时间：2017/11/27 13:22
// */
//
//public class MyReactActivity extends MyBaseReactActivity {
//    public static String ONCLICKENENT = "onclickEvent";
//    private static String TAG = "MyReactActivity";
//    private boolean needAlarm = true;
//    private Intent intent;
//
//
//    @Nullable
//    @Override
//    protected String getMainComponentName() {
//        return "RNProject";
//    }
//
//    @Override
//    protected void onCreate(Bundle saveInstanceState) {
//        super.onCreate(saveInstanceState);
//        //处理通知栏点击事件
//        String eventStr = getIntent().getStringExtra(ONCLICKENENT);
//        //todo 推送还未集成
////        if (null != eventStr && !"".equals(eventStr)) {
////            DDPushModule ddPushModule = MainApplication.getDDPushPackage().getPushModule();
////            if (null == ddPushModule) {
////                return;
////            }
////            ddPushModule.nativeCallRn(eventStr);
////        }
//
////        intent = new Intent(MyReactActivity.this, DDPushTCPClientService.class);
////        this.startService(intent);
//    }
//
//
//    @Override
//    protected void onPause() {
//        if (needAlarm) {
//            Toast.makeText(getApplicationContext(), R.string.app_act, Toast.LENGTH_SHORT).show();
//        }
//        super.onPause();
//    }
//
//    @Override
//    public boolean onKeyDown(int keyCode, KeyEvent event) {
//        if (keyCode == KeyEvent.KEYCODE_BACK || keyCode == KeyEvent.KEYCODE_HOME && event.getRepeatCount() == 0) {
//            needAlarm = false;
//        }
//        // Intent intent = new Intent(Intent.ACTION_MAIN,null);
//        // intent.addCategory(Intent.CATEGORY_HOME);
//        // startActivity(intent);
//        return super.onKeyDown(keyCode, event);
//    }
//
//    @Override
//    protected void onDestroy() {
//        super.onDestroy();
//        if (null != intent){
//            this.stopService(intent);
//        }
//    }
//
//    @Override
//    public void onNewIntent(Intent intent) {
//        //  super.onNewIntent(intent);
//        if (intent != null) {
//            String eventStr = intent.getStringExtra(ONCLICKENENT);
//            //todo 推送还未集成先注释
////            if (null != eventStr && !"".equals(eventStr)) {
////                DDPushModule ddPushModule = MainApplication.getDDPushPackage().getPushModule();
////                if (null == ddPushModule) return;
////                ddPushModule.nativeCallRn(eventStr);
////            }
//        }
//    }
//}
