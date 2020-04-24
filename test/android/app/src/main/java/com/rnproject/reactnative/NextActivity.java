package com.rnproject.reactnative;


import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewParent;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactInstanceManagerBuilder;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.facebook.react.uimanager.UIImplementationProvider;
import com.rnproject.BuildConfig;
import com.rnproject.MainApplication;
import com.rnproject.R;
import com.rnproject.ddpush.DDPushPackage;

import java.io.File;

public class NextActivity extends Activity implements DefaultHardwareBackBtnHandler, PermissionAwareActivity {
    private static final DDPushPackage mCommPackage = new DDPushPackage();
    private String JSMAIN_MOUDLE_NAME = "index";
    private String JS_BUNDLE_LOCAL_PATH = "";
    //初始化rn环境
    private ReactInstanceManager reactInstanceManager;
    //动态赋值的项 包括 子bundle的name moudle 的name
    private String bundleName;
    private String moudleName;
    private String mainjsName;
    private String bundleFilePath;
    private int style = 0;
    private PermissionListener permissionListener;
    private ReactRootView rootView;

    private View inflate;
    private TextView bt_close;
    private TextView bt_more;
    private Dialog dialog;
    private View menuContainer;
    private ImageView dialogView;
    private View lineView;


    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    private void setScreen() {
        //设置横竖屏
        if ("landscape" == BuildConfig.SCREEN_ORIENTATION) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        } else if ("portrait" == BuildConfig.SCREEN_ORIENTATION) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        } else if ("unspecified" == BuildConfig.SCREEN_ORIENTATION) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
        }

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (BuildConfig.isCanScreenshot) {
            this.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
        }
        setScreen();
        Intent intent = getIntent();
        if (null != intent) {
            bundleName = intent.getStringExtra("bundleName");
            moudleName = intent.getStringExtra("moduleName");
            bundleFilePath = intent.getStringExtra("bundlePath");
            style = intent.getIntExtra("style", 0);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        }
        setContentView(R.layout.activity_multi_bundle);
        rootView = (ReactRootView) findViewById(R.id.react_root_view);
        menuContainer = findViewById(R.id.menu_container);
        dialogView = (ImageView) findViewById(R.id.open_dialog_view);

        lineView = findViewById(R.id.line_view);
        ImageView closeView = (ImageView) findViewById(R.id.close_view);
        closeView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        dialogView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                show();
            }
        });

        if (style == 0) {
            lineView.setBackgroundColor(Color.WHITE);
            dialogView.setImageResource(R.mipmap.more_white);
            closeView.setImageResource(R.mipmap.close_white);

            menuContainer.setBackgroundResource(R.drawable.bg_multi_bundle_menu);
        } else {
            lineView.setBackgroundColor(Color.BLACK);
            dialogView.setImageResource(R.mipmap.more_black);
            closeView.setImageResource(R.mipmap.close_black);
            menuContainer.setBackgroundResource(R.drawable.bg_multi_bundle_menu_white);

        }

        ReactInstanceManagerBuilder builder = ReactInstanceManager.builder();

        builder.setApplication(this.getApplication());
        if (bundleFilePath == null) {
            builder.setBundleAssetName(bundleName);
        } else {
//            String s = ToolClass.Read_FilePath_Format(this, bundleFilePath);
//            int i = s.lastIndexOf('/');
//            if (i != s.length() - 1) {
//                s += "/";
//            }
            if (bundleName == null) {
                bundleName = "index.android.bundle";
            }

            builder.setJSBundleFile(bundleFilePath + File.separator + bundleName);
        }
        builder.setJSMainModulePath(mainjsName == null ? "index.android" : mainjsName)//"index"
                .addPackages(MainApplication.getPackageList())
                .setUIImplementationProvider(new UIImplementationProvider())
                .setDefaultHardwareBackBtnHandler(this)
                .setInitialLifecycleState(LifecycleState.RESUMED);
        reactInstanceManager = builder.build();
        rootView.startReactApplication(reactInstanceManager, moudleName == null ? "RNProject" : moudleName, null);//"RNProject"

    }

    private void show() {
        dialog = new Dialog(this, R.style.ActionSheetDialogStyle);
        //填充对话框的布局
        inflate = LayoutInflater.from(this).inflate(R.layout.menu_dialog, null);
        //初始化控件
        bt_close = (TextView) inflate.findViewById(R.id.bt_close);
        bt_more = (TextView) inflate.findViewById(R.id.bt_more);
        bt_close.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.cancel();
            }
        });
        bt_more.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                Toast.makeText(NextActivity.this,"这是小程序",Toast.LENGTH_LONG).show();
                Intent intent = new Intent(NextActivity.this, AboutActivity.class);
                intent.putExtra("appid", getIntent().getStringExtra("appid"));
                startActivity(intent);
                dialog.cancel();
            }
        });
        //将布局设置给Dialog
        dialog.setContentView(inflate);
        //获取当前Activity所在的窗体
        Window dialogWindow = dialog.getWindow();
        //设置Dialog从窗体底部弹出
        dialogWindow.setGravity(Gravity.BOTTOM);
        //获得窗体的属性
        WindowManager.LayoutParams lp = dialogWindow.getAttributes();
        lp.y = 20;//设置Dialog距离底部的距离
//       将属性设置给窗体
        dialogWindow.setAttributes(lp);
        dialog.show();//显示对话框
    }


    @Override
    protected void onPause() {
        super.onPause();
        if (reactInstanceManager != null) {
            reactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (reactInstanceManager != null) {
            reactInstanceManager.onActivityResult(this, requestCode, resultCode, data);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (reactInstanceManager != null) {
            reactInstanceManager.onHostResume(this, this);
        }

    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (reactInstanceManager != null){
            reactInstanceManager.onHostDestroy(this);
            reactInstanceManager.destroy();
        }

        if (rootView != null){
            ViewParent parent = rootView.getParent();
            if (parent != null) {
                ((android.view.ViewGroup) parent).removeView(rootView);
            }
            rootView.unmountReactApplication();
            rootView = null;
        }
    }

    @Override
    public void onBackPressed() {
        if (reactInstanceManager != null) {
            reactInstanceManager.onBackPressed();
            super.onBackPressed();
        } else {
            super.onBackPressed();
        }


    }


    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        permissionListener = listener;
        this.requestPermissions(permissions, requestCode);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (permissionListener != null && permissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults)) {
            permissionListener = null;
        }
    }


}
