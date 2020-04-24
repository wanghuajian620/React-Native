package com.cib.library.webviewutil;

import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.ProgressBar;

/**
 * Created by liudan on 2019/11/29.
 */

public class XUIWebChromeClient extends WebChromeClient {
    private ProgressBar progressBar;
    public XUIWebChromeClient(ProgressBar progressBar) {
        this.progressBar = progressBar;
    }

    @Override
    public void onReceivedTitle(WebView view, String title) {
    }

    @Override
    public void onProgressChanged(WebView view, int newProgress) {
        super.onProgressChanged(view, newProgress);
        if (newProgress < 100) {
            progressBar.setProgress(newProgress);
        } else if (newProgress == 100) {
            progressBar.setProgress(newProgress);
        }
    }
}
