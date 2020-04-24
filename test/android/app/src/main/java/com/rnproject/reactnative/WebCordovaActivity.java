package com.rnproject.reactnative;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.JsPromptResult;
import android.webkit.JsResult;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import com.cib.library.utils.NetUtils;
import com.rnproject.BuildConfig;
import com.rnproject.R;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewImpl;
import org.apache.cordova.engine.SystemWebChromeClient;
import org.apache.cordova.engine.SystemWebView;
import org.apache.cordova.engine.SystemWebViewEngine;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * 加载index.html页面的activity
 * */
public class WebCordovaActivity extends CordovaActivity {
    private View inflate,menuContainer,lineView;
    private TextView bt_close,bt_more;
    private Dialog dialog;
    private ImageView dialogView;
    private int style = 0;
    private String loadurl = "";
    private SystemWebView webview;
    private ProgressBar myProgressBar;
    private SystemWebViewEngine systemWebViewEngine;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
        super.init();
        initWebview(webview);
        Intent intent = getIntent();
        if (intent != null){
            loadurl = intent.getStringExtra("bundlePath");
        }
        initView();
    }

    private void initView() {
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
        String launchUrls = "";
        if (!TextUtils.isEmpty(loadurl)){
            if (loadurl.startsWith("http://") || loadurl.startsWith("https://")){
                launchUrls = loadurl;
            }else {
                launchUrls = "file://" + loadurl + "/index.html";
            }
        }else {
            launchUrls = "file:///android_asset/www/index.html";
        }
        loadUrl(launchUrls);
    }

    @Override
    protected CordovaWebView makeWebView() {
        //自定义webview
        webview = (SystemWebView) findViewById(R.id.cordova_webview);
        myProgressBar = (ProgressBar) findViewById(R.id.cor_progress);
        systemWebViewEngine = new SystemWebViewEngine(webview);
        return new CordovaWebViewImpl(systemWebViewEngine);
    }

    @Override
    protected void createViews() {
//        super.createViews();
        appView.getView().requestFocusFromTouch();
    }

    private void initWebview(SystemWebView mWebview) {
        WebSettings mWebSettings = mWebview.getSettings();
        mWebSettings.setJavaScriptEnabled(true);
        mWebSettings.setAppCacheMaxSize(1024*1024*8);//设置缓冲大小，我设的是8M
        mWebSettings.setRenderPriority(WebSettings.RenderPriority.HIGH);
//        isNetDo(this,mWebview);
            // 开启 DOM storage API 功能
        mWebSettings.setDomStorageEnabled(true);
            //开启 database storage API 功能
        mWebSettings.setDatabaseEnabled(true);
            String cacheDirPath = getApplicationContext().getDir("cache", Context.MODE_PRIVATE).getPath();
            Log.i(TAG, "cacheDirPath="+cacheDirPath);
            //设置数据库缓存路径
        mWebSettings.setDatabasePath(cacheDirPath);
            //设置  Application Caches 缓存目录
        mWebSettings.setAppCachePath(cacheDirPath);
            //开启 Application Caches 功能
        mWebSettings.setAppCacheEnabled(true);
        mWebSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        mWebSettings.setDisplayZoomControls(false);
        mWebSettings.setUseWideViewPort(true);//适应分辨率
        mWebSettings.setLoadWithOverviewMode(true);
        mWebSettings.setTextZoom(100); // 防止H5的文字大小被系统字体大小影响
        mWebSettings.setLoadsImagesAutomatically(true);  //支持自动加载图片
        mWebSettings.setAllowFileAccess(true);  //设置可以访问文件
        mWebSettings.setNeedInitialFocus(true); //当webview调用requestFocus时为webview设置节点
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            mWebSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }

        //解决webView的跨域问题
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            mWebSettings.setAllowUniversalAccessFromFileURLs(true);
        } else {
            try {
                Class<?> clazz = mWebSettings.getClass();
                Method method = clazz.getMethod("setAllowUniversalAccessFromFileURLs", boolean.class);
                if (method != null) {
                    method.invoke(mWebSettings, true);
                }
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        //设置progress
        mWebview.setWebChromeClient(new MyWebChromeClient(systemWebViewEngine));

            //实现禁止长按复制的效果 add liudan
        mWebview.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View view) {
                    return true;
                }
            });
    }

    public void isNetDo(Context context, SystemWebView mWebview){
        if (NetUtils.getNetStatus(context) == 0){
            //没网
            if(BuildConfig.isjizuo){
                //缓存
                mWebview.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);  //设置 缓存模式
            }else{
                //不缓存
                mWebview.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);  //设置 缓存模式
            }
        }else {
            //有网
            mWebview.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);  //设置 缓存模式
        }
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
                Intent intent = new Intent(WebCordovaActivity.this, AboutActivity.class);
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
    public void onDestroy() {
        super.onDestroy();
        if (dialog != null){
            dialog = null;
        }

        if (webview != null){
            webview.destroyDrawingCache();
            webview.destroy();
        }
    }

//    @Override
//    public boolean onKeyDown(int keyCode, KeyEvent event) {
//        if (keyCode == KeyEvent.KEYCODE_BACK && !webview.canGoBack()){
//            return true;
//        }
//        return super.onKeyDown(keyCode, event);
//    }


    class MyWebChromeClient extends SystemWebChromeClient {
        public MyWebChromeClient(SystemWebViewEngine parentEngine) {
            super(parentEngine);
        }

        @Override
        public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
            Log.e(TAG, "onJsAlert " + message);
            Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
            result.confirm();
            return true;
        }

        @Override
        public boolean onJsConfirm(WebView view, String url, String message, JsResult result) {
            Log.e(TAG, "onJsConfirm " + message);
            return super.onJsConfirm(view, url, message, result);
        }

        @Override
        public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
            Log.e(TAG, "onJsPrompt " + url);
            return super.onJsPrompt(view, url, message, defaultValue, result);
        }

        @Override
        public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
            Log.e(TAG, consoleMessage.message() + "aa" + consoleMessage.sourceId() + "aa");
            return super.onConsoleMessage(consoleMessage);
        }

        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            Log.e(TAG, "aa" + newProgress + "aa");
            if (newProgress == 100) {
                myProgressBar.setVisibility(View.GONE);
            } else {
                if (View.INVISIBLE == myProgressBar.getVisibility()) {
                    myProgressBar.setVisibility(View.VISIBLE);
                }
                myProgressBar.setProgress(newProgress);
            }
            super.onProgressChanged(view, newProgress);
        }
    }
}
