package com.rnproject.receive;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.rnproject.MainActivity;
import com.rnproject.MainApplication;
import com.rnproject.base.Const;
import com.rnproject.utils.ActivitiesManager;


/**
 * 通知栏消息点击处理接收器
 * Created by chengpengfei on 2017/8/10.
 * Copyright ©2017 juziwl, All Rights Reserved.
 */

public class NotificationClickedReceiver extends BroadcastReceiver {

    /**
     * 处理接收数据
     *
     * @param context
     * @param intent
     */
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        String message = intent.getStringExtra("message");

        if (action.equals(Const.NOTICEACTION)) {
            if (ActivitiesManager.isAppIsFront()) {
                String currentActivityName = ActivitiesManager.getInstance().getCurrentActivity().getClass().getSimpleName();
                if ("AgreeReactActivity".equals(currentActivityName)) {
                    MainApplication.getDDPushPackage().getPushModule().nativeCallRn(message);
                    return;
                }
                Intent attendanceIntent = new Intent(context, MainActivity.class);
                attendanceIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                attendanceIntent.putExtra(MainActivity.ONCLICKENENT, message);
                context.startActivity(attendanceIntent);
            } else {
                Intent attendanceIntent = new Intent(context, MainActivity.class);
                // attendanceIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP| Intent.FLAG_ACTIVITY_SINGLE_TOP);
                attendanceIntent.putExtra(MainActivity.ONCLICKENENT, message);
                context.startActivity(attendanceIntent);
            }
        }
    }
}
