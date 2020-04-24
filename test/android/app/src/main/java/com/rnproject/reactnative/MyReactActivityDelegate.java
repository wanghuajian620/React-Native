//package com.rnproject.reactnative;
//
//import android.annotation.TargetApi;
//import android.app.Activity;
//import android.content.Context;
//import android.content.Intent;
//import android.net.Uri;
//import android.os.Build;
//import android.os.Bundle;
//import android.provider.Settings;
//import android.util.Log;
//import android.view.KeyEvent;
//import android.widget.Toast;
//
//import androidx.fragment.app.FragmentActivity;
//import com.com.com.facebook.common.logging.FLog;
//import com.com.com.facebook.infer.annotation.Assertions;
//import com.com.com.facebook.react.ReactActivity;
//import com.com.com.facebook.react.ReactApplication;
//import com.com.com.facebook.react.ReactFragmentActivity;
//import com.com.com.facebook.react.ReactInstanceManager;
//import com.com.com.facebook.react.ReactNativeHost;
//import com.com.com.facebook.react.ReactRootView;
//import com.com.com.facebook.react.bridge.Callback;
//import com.com.com.facebook.react.common.ReactConstants;
//import com.com.com.facebook.react.devsupport.DoubleTapReloadRecognizer;
//import com.com.com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
//import com.com.com.facebook.react.modules.core.PermissionListener;
//import com.rnproject.MainApplication;
//
//import java.text.SimpleDateFormat;
//
//import javax.annotation.Nullable;
//
///**
// * 时间：2017/11/30 19:09
// */
//
//public class MyReactActivityDelegate {
//
//    // Copyright 2004-present Facebook. All Rights Reserved.
//
//
//    private static final String REDBOX_PERMISSION_GRANTED_MESSAGE =
//            "Overlay permissions have been granted.";
//    private static final String REDBOX_PERMISSION_MESSAGE =
//            "Overlay permissions needs to be granted in order for react native apps to run in dev mode";
//    /**
//     * Delegate class for {@link ReactActivity} and {@link ReactFragmentActivity}. You can subclass this
//     * to provide custom implementations for e.g. {@link #getReactNativeHost()}, if your Application
//     * class doesn't implement {@link ReactApplication}.
//     */
//
//    private final int REQUEST_OVERLAY_PERMISSION_CODE = 1111;
//    private final @Nullable
//    Activity mActivity;
//    private final @Nullable
//    FragmentActivity mFragmentActivity;
//    private final @Nullable
//    String mMainComponentName;
//
//    private @Nullable
//    ReactRootView mReactRootView;
//    private @Nullable
//    DoubleTapReloadRecognizer mDoubleTapReloadRecognizer;
//    private @Nullable
//    PermissionListener mPermissionListener;
//    private @Nullable
//    Callback mPermissionsCallback;
//    private @Nullable
//    ReactNativeHost mReactNativeHost;
//    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH:mm:ss.SSS");// HH:mm:ss
//
//    public MyReactActivityDelegate(Activity activity, @Nullable String mainComponentName) {
//        mActivity = activity;
//        mMainComponentName = mainComponentName;
//        mFragmentActivity = null;
//        getLaunchOptions();
//    }
//
//    public MyReactActivityDelegate(
//            FragmentActivity fragmentActivity,
//            @Nullable String mainComponentName) {
//        mFragmentActivity = fragmentActivity;
//        mMainComponentName = mainComponentName;
//        mActivity = null;
//    }
//
//    protected @Nullable
//    Bundle getLaunchOptions() {
//        return null;
//    }
//
//    protected ReactRootView createRootView() {
//        return new ReactRootView(getContext());
//    }
//
//    /**
//     * Get the {@link ReactNativeHost} used by this app. By default, assumes
//     * {@link Activity#getApplication()} is an instance of {@link ReactApplication} and calls
//     * {@link ReactApplication#getReactNativeHost()}. Override this method if your application class
//     * does not implement {@code ReactApplication} or you simply have a different mechanism for
//     * storing a {@code ReactNativeHost}, e.g. as a static field somewhere.
//     */
//    protected ReactNativeHost getReactNativeHost() {
////        return SampleApplicationLike.instance.getReactNativeHost();
////        return ((BaseApplication) getPlainActivity().getApplication().).getReactNativeHost();
//        if (this.mReactNativeHost != null) {
//            return this.mReactNativeHost;
//        }
//        return ((MainApplication) mActivity.getApplication()).getReactNativeHost();
//    }
//
//    public void setReactNativeHost(ReactNativeHost mReactNativeHost) {
//        this.mReactNativeHost = mReactNativeHost;
//    }
//
//    public ReactInstanceManager getReactInstanceManager() {
//
//        return getReactNativeHost().getReactInstanceManager();
//    }
//
//    protected void onCreate(Bundle savedInstanceState) {
//        boolean needsOverlayPermission = false;
//        if (getReactNativeHost().getUseDeveloperSupport() && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//            // Get permission to show redbox in dev builds.
//            if (!Settings.canDrawOverlays(getContext())) {
//                needsOverlayPermission = true;
//                Intent serviceIntent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getContext().getPackageName()));
//                FLog.w(ReactConstants.TAG, REDBOX_PERMISSION_MESSAGE);
//                Toast.makeText(getContext(), REDBOX_PERMISSION_MESSAGE, Toast.LENGTH_LONG).show();
//                ((Activity) getContext()).startActivityForResult(serviceIntent, REQUEST_OVERLAY_PERMISSION_CODE);
//
//            }
//        }
//
//        if (mMainComponentName != null && !needsOverlayPermission) {
//            loadApp(mMainComponentName);
//        }
//
//        mDoubleTapReloadRecognizer = new DoubleTapReloadRecognizer();
//    }
//
//    protected void loadApp(String appKey) {
//        if (mReactRootView != null) {
//            throw new IllegalStateException("Cannot loadApp while app is already running.");
//        }
//        mReactRootView = ReactNativePreLoader.getReactRootView(mActivity,appKey);
//        Log.e("ldtime", "show1: " + mReactRootView);
//        if(mReactRootView == null){
//            mReactRootView = createRootView();
//            mReactRootView.startReactApplication(getReactNativeHost().getReactInstanceManager(),
//                    appKey,
//                    getLaunchOptions());
//            Log.e("ldtime", "show: " + mReactRootView.toString());
//        }
//        getPlainActivity().setContentView(mReactRootView);
//    }
//
//    public void refreshPage() {
//        if (mReactRootView == null) {
//            throw new IllegalStateException("Cannot refresh while app isn't running.");
//        }
//        mReactRootView = createRootView();
//        mReactRootView.startReactApplication(
//                getReactNativeHost().getReactInstanceManager(),
//                mMainComponentName,
//                getLaunchOptions());
//        getPlainActivity().setContentView(mReactRootView);
//    }
//
//    protected void onPause() {
//        if (getReactNativeHost().hasInstance()) {
//            getReactNativeHost().getReactInstanceManager().onHostPause(getPlainActivity());
//        }
//    }
//
//    protected void onResume() {
//        if (getReactNativeHost().hasInstance()) {
//            getReactNativeHost().getReactInstanceManager().onHostResume(
//                    getPlainActivity(),
//                    (DefaultHardwareBackBtnHandler) getPlainActivity());
//        }
//
//        if (mPermissionsCallback != null) {
//            mPermissionsCallback.invoke();
//            mPermissionsCallback = null;
//        }
//    }
//
//    protected void onDestroy() {
//        if (mReactRootView != null) {
//            mReactRootView.unmountReactApplication();
//            mReactRootView = null;
//        }
//        if (getReactNativeHost().hasInstance()) {
//            getReactNativeHost().getReactInstanceManager().onHostDestroy(getPlainActivity());
//        }
//        // 清除View
//        ReactNativePreLoader.detachView(mMainComponentName);
//    }
//
//    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        if (getReactNativeHost().hasInstance()) {
//            getReactNativeHost().getReactInstanceManager()
//                    .onActivityResult(getPlainActivity(), requestCode, resultCode, data);
//        } else {
//            // Did we request overlay permissions?
//            if (requestCode == REQUEST_OVERLAY_PERMISSION_CODE && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//                if (Settings.canDrawOverlays(getContext())) {
//                    if (mMainComponentName != null) {
//                        loadApp(mMainComponentName);
//                    }
//                    Toast.makeText(getContext(), REDBOX_PERMISSION_GRANTED_MESSAGE, Toast.LENGTH_LONG).show();
//                }
//            }
//        }
//    }
//
//    public boolean onKeyUp(int keyCode, KeyEvent event) {
//        if (getReactNativeHost().hasInstance() && getReactNativeHost().getUseDeveloperSupport()) {
//            if (keyCode == KeyEvent.KEYCODE_MENU) {
//                getReactNativeHost().getReactInstanceManager().showDevOptionsDialog();
//                return true;
//            }
//            boolean didDoubleTapR = Assertions.assertNotNull(mDoubleTapReloadRecognizer)
//                    .didDoubleTapR(keyCode, getPlainActivity().getCurrentFocus());
//            if (didDoubleTapR) {
//                getReactNativeHost().getReactInstanceManager().getDevSupportManager().handleReloadJS();
//                return true;
//            }
//        }
//        return false;
//    }
//
//    public boolean onBackPressed() {
//        if (getReactNativeHost().hasInstance()) {
//            getReactNativeHost().getReactInstanceManager().onBackPressed();
//            return true;
//        }
//        return false;
//    }
//
//    public boolean onNewIntent(Intent intent) {
//        if (getReactNativeHost().hasInstance()) {
//            getReactNativeHost().getReactInstanceManager().onNewIntent(intent);
//            return true;
//        }
//        return false;
//    }
//
//    @TargetApi(Build.VERSION_CODES.M)
//    public void requestPermissions(
//            String[] permissions,
//            int requestCode,
//            PermissionListener listener) {
//        mPermissionListener = listener;
//        getPlainActivity().requestPermissions(permissions, requestCode);
//    }
//
//    public void onRequestPermissionsResult(
//            final int requestCode,
//            final String[] permissions,
//            final int[] grantResults) {
//        mPermissionsCallback = new Callback() {
//            @Override
//            public void invoke(Object... args) {
//                if (mPermissionListener != null && mPermissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults)) {
//                    mPermissionListener = null;
//                }
//            }
//        };
//    }
//
//    private Context getContext() {
//        if (mActivity != null) {
//            return mActivity;
//        }
//        return Assertions.assertNotNull(mFragmentActivity);
//    }
//
//    private Activity getPlainActivity() {
//        return ((Activity) getContext());
//    }
//}
