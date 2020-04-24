package com.rnproject.utils;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import java.util.ArrayList;
import java.util.List;

/**
 * Activity 管理类
 * Created by fgq on 2017/4/4.
 * Copyright ©2017 juziwl, All Rights Reserved.
 */

public class ActivitiesManager {

    // 应用 Activity 记录
    public static List<Activity> activities = new ArrayList<>();
    // 当前 Activity 是否在前台展示（用户是否可以看到展示的界面）
    private static boolean appIsFront = false;
    private static ActivitiesManager g_instance = new ActivitiesManager();
    // 当前 Activity
    private Activity currentActivity = null;
    // Activity 状态锁
    private Object activityLocker = new Object();
    // Activity 任务类
    private List<ActivityTask> tasks = new ArrayList<>();
    private Application.ActivityLifecycleCallbacks callbacks = new Application.ActivityLifecycleCallbacks() {

        @Override
        public void onActivityCreated(Activity activity, Bundle bundle) {
            activities.add(activity);
        }

        @Override
        public void onActivityStarted(Activity activity) {
        }

        @Override
        public void onActivityResumed(Activity activity) {
            synchronized (activityLocker) {
                currentActivity = activity;
                appIsFront = true;
            }

            takeTask();
        }

        @Override
        public void onActivityPaused(Activity activity) {
            synchronized (activityLocker) {
                currentActivity = null;
                appIsFront = false;
            }
        }

        @Override
        public void onActivityStopped(Activity activity) {
        }

        @Override
        public void onActivitySaveInstanceState(Activity activity, Bundle bundle) {
        }

        @Override
        public void onActivityDestroyed(Activity activity) {
            activities.remove(activity);
        }
    };

    public static ActivitiesManager getInstance() {
        return g_instance;
    }

    /**
     * 当前应用状态是否为前台展示
     *
     * @return
     */
    public static boolean isAppIsFront() {
        return appIsFront;
    }

    /**
     * 关闭其它所有的 Activity
     *
     * @param activity 此 Activity 不关闭
     */
    public static void closeOtherActivities(Activity activity) {

        for (int i = 0; i < activities.size(); i++) {
            Activity temp = activities.get(i);
            if (temp == activity) {
                continue;
            }
            temp.finish();
            activities.remove(i);
            i--;
        }
    }

    /**
     * 注册 Activity 生命周期监听
     * 注册当前 Activity 管理到指定的 Application
     *
     * @param application
     */
    public void register(Application application) {
        application.registerActivityLifecycleCallbacks(callbacks);
    }

    /**
     * 注销 Activity 生命周期监听
     *
     * @param application
     */
    public void unregister(Application application) {
        application.unregisterActivityLifecycleCallbacks(callbacks);
    }

    /**
     * 检测执行 Activity 任务类
     */
    private void takeTask() {

        if (tasks.isEmpty()) return;
        synchronized (activityLocker) {
            // 检测当前是否存在活动的 Activity
            if (currentActivity == null) return;

            ActivityTask task = tasks.get(0);
            if (task == null) return;
            task.onExecuteActivityTask(currentActivity);
            tasks.remove(task);
        }

        takeTask();
    }

    /**
     * 添加一个 Activity 任务类到当前 Activity 中
     *
     * @param task
     */
    public void addActivityTask(ActivityTask task) {

        tasks.add(task);


    }

    /**
     * 当前活动的 Activity
     *
     * @return
     */
    public Activity getCurrentActivity() {
        return currentActivity;
    }

    /**
     * 清空 Activity 任务队列
     */
    public void clearActivityTask() {
        tasks.clear();
    }

    /**
     * 释放所有的 Activity
     */
    public void closeAllActivities() {
        for (int i = 0; i < activities.size(); i++) {
            Activity temp = activities.get(i);
            temp.finish();
        }
    }

    /**
     * 关闭指定的Activity
     *
     * @param clazz
     */
    public void closeActivity(Class clazz) {
        for (Activity activity : activities) {
            if (clazz == activity.getClass()) {
                activity.finish();
            }
        }
    }

    /**
     * 声明一个在当前用户看到的 Activity 执行的任务类
     */
    public interface ActivityTask {

        /**
         * 执行 Activity 任务类回调
         *
         * @param currentActiveActivity 当前活动的 Activity
         */
        void onExecuteActivityTask(Activity currentActiveActivity);
    }
}
