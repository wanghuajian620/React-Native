package com.cib.library.webviewutil;

import android.content.Context;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.view.View;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

import com.cib.library.file.LogFiles;

/**
 * Created by liudan on 2019/11/29.
 */

public class MyWebViewClient  extends WebViewClient {
    private boolean mLoadingError = false;
    private Context context;
    private ProgressBar progressBar;
    private WebView webView;
    public MyWebViewClient(Context context, ProgressBar progressBar,WebView webView) {
        this.context = context;
        this.progressBar = progressBar;
        this.webView = webView;
    }


    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,"Webview","开始加载了");
        progressBar.setVisibility(View.VISIBLE);
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,"Webview","加载完成了");
        progressBar.setVisibility(View.GONE);
    }

    @Override
    public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
        super.onReceivedError(view, errorCode, description, failingUrl);
        mLoadingError = true;
        LogFiles.LogsToFile(context,LogFiles.TYPE_ANDROID,"Webview","加载错误");
    }


    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if(null!=url&&url.startsWith("http")){webView.loadUrl(url);}
        return true;
    }

    @Override
    public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
        super.onReceivedHttpError(view, request, errorResponse);
    }

    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        // 接受所有网站的证书，忽略SSL错误，执行访问网页
        handler.proceed();
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
        // 正常加载
        return super.shouldInterceptRequest(view, url);
    }

    @Override
    public void onLoadResource(WebView view, String url) {
        super.onLoadResource(view, url);
    }
}
