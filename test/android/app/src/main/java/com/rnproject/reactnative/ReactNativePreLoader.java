package com.rnproject.reactnative;

import android.app.Activity;
import android.content.Context;
import android.content.MutableContextWrapper;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.rnproject.MainApplication;

import java.util.HashMap;
import java.util.Map;

/**
 * 预加载工具类
 * Created by Song on 2017/5/10.
 */
public class ReactNativePreLoader {

    private static final Map<String, ReactRootView> CACHE = new HashMap<String, ReactRootView>();

    /**
     * 初始化ReactRootView，并添加到缓存
     *
     * @param context   上下文对象
     * @param componentName 加载的组件名
     */
    public static void preLoad(Context context, String componentName) {

        if (CACHE.get(componentName) != null) {
            return;
        }
        ReactRootView rootView = new ReactRootView(new MutableContextWrapper(context.getApplicationContext()));
        rootView.startReactApplication(
                ((MainApplication) context.getApplicationContext()).getReactNativeHost().getReactInstanceManager(),
                componentName,
                null);

        CACHE.put(componentName, rootView);
    }

    /**
     * 获取ReactRootView
     *
     * @param componentName 加载的组件名
     * @return ReactRootView
     */
    public static ReactRootView getReactRootView(Activity activity, String componentName) {
        ReactRootView rootView = CACHE.get(componentName);
        if(rootView == null){
            return rootView;
        }
        if (rootView.getContext() instanceof MutableContextWrapper) {
            ((MutableContextWrapper) rootView.getContext()).setBaseContext(
                    activity
            );
        }
        return rootView;
    }

    /**
     * 从当前界面移除 ReactRootView
     *
     * @param componentName 加载的组件名
     */
    public static void detachView(String componentName) {
        try {
            ReactRootView rootView = CACHE.get(componentName);
            if (rootView == null)
                return;
            ViewGroup parent = (ViewGroup) rootView.getParent();
            if (parent != null) {
                parent.removeView(rootView);
            }
            if (rootView.getContext() instanceof MutableContextWrapper) {
                ((MutableContextWrapper) rootView.getContext()).setBaseContext(
                        rootView.getContext().getApplicationContext()
                );
            }
        } catch (Throwable e) {
            Log.e("RNRootViewPreLoader", e.getMessage());
        }
    }


    public static ReactRootView startReactApplication(Activity plainActivity, ReactInstanceManager reactInstanceManager, String componentName, Bundle launchOptions) {
        ReactRootView rootView = new ReactRootView(plainActivity);
        rootView.startReactApplication(
                reactInstanceManager,
                componentName,
                launchOptions);
        CACHE.put(componentName, rootView);
        return rootView;
    }

    public static void refreshRootView(String componentName) {
        ReactRootView rootView = CACHE.get(componentName);
        if (rootView == null)
            return;
        // 如果不为空,重新生成ReactContext
        rootView.getReactInstanceManager().recreateReactContextInBackground();
    }
}
