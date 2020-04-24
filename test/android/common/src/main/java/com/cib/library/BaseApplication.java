package com.cib.library;

import android.app.Application;

/**
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/5/24
 */
public class BaseApplication extends Application {
    private static BaseApplication application;

    public static BaseApplication getInstance() {
        return application;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        application = this;
    }
}
