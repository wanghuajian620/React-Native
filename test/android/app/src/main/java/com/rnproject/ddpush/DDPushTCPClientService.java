package com.rnproject.ddpush;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.IBinder;
import android.os.PowerManager;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.cib.library.sp.SPEncryptedUtils;
import com.facebook.react.common.SystemClock;
import com.rnproject.BuildConfig;
import com.rnproject.R;
import com.rnproject.base.Const;
import com.rnproject.tools.Tools;

import org.ddpush.im.v1.client.appuser.Message;
import org.ddpush.im.v1.client.appuser.TCPClientBase;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

/**
 * DDPush推送服务类 tcp协议
 * Created by liudan on 2018/3/22.
 */

public class DDPushTCPClientService extends Service {
    private static final String TAG = "DDPushTCPClientService";
    private static final String TABLE_NAME = "NotificatonTable";
    private static final String TABLE_STATUS = "status";
    //private static final String TABLE_NOTIFICATION = "notification";
    private static final String TABLE_DATE = "date";
    private static final String TABLE_TITLE = "title";
    private static final String TABLE_REMARK = "remark";
    private static final String TABLE_CONTENT = "content";
    private static final String TABLE_URL = "url";
    private PowerManager.WakeLock wakeLock;
    private MyTcpClient myTcpClient;
    private List<String> columnsList;

    public static final String PRIMARY_CHANNEL = "default";

    @SuppressLint("InvalidWakeLockTag")
    @Override
    public void onCreate() {
        super.onCreate();
        PowerManager pm = (PowerManager) this.getSystemService(Context.POWER_SERVICE);
        wakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "OnlineTCPService");


        columnsList = new ArrayList<>();
        columnsList.add(TABLE_STATUS);
        columnsList.add(TABLE_TITLE);
        columnsList.add(TABLE_REMARK);
        columnsList.add(TABLE_CONTENT);
        columnsList.add(TABLE_DATE);
        columnsList.add(TABLE_URL);
        init();
    }

    private void init() {
        if (this.myTcpClient != null) {
            try {
                myTcpClient.stop();
            } catch (Exception e) {
            }
        }
        try {
            /**
             * 启动service 时 uuid是需要获取手机唯一标示 的
             * */

            //String msgip = Tools.getObjectFromShare(this, Tools.MSGIP).toString();
            //String msgport = Tools.getObjectFromShare(this, Tools.MSGPORT).toString();

            SPEncryptedUtils sharedPreferencesHelper = SPEncryptedUtils.getInstance(this);
            String appId = sharedPreferencesHelper.getDecryptedData("channelNumber");
            String msgip = sharedPreferencesHelper.getDecryptedData("ddpushIP");
            if (appId == null || "".equals(appId)) {
                appId = BuildConfig.channelNumber;
            }
            if (msgip == null || "".equals(msgip)) {
                msgip = BuildConfig.ddpushIP;
            }
            if (!TextUtils.isEmpty(msgip)) {
                Log.e(TAG, "appId:" + appId);
                byte[] md5 = NetUtil.md5Byte(appId + Tools.getIMEI(DDPushTCPClientService.this));
                try {
                    if (msgip.split(":") != null && msgip.split(":").length == 2) {
                        String ddpuship = msgip.split(":")[0];
                        int ddpushport = Integer.valueOf(msgip.split(":")[1]);
                        myTcpClient = new MyTcpClient(md5, 1, ddpuship, ddpushport);
                        myTcpClient.setHeartbeatInterval(50);
                        myTcpClient.start();
                        //Toast.makeText(this.getApplicationContext(), "TcpClient初始化,服务启动成功：", Toast.LENGTH_LONG).show();
                        Log.e(TAG, "TcpClient初始化,服务启动成功:" + appId + Tools.getIMEI(DDPushTCPClientService.this));
                    }
                } catch (Exception e) {
                    Log.e(TAG, "TcpClient初始化,服务启动失败:");
                }
            }
        } catch (Exception e) {
            Toast.makeText(this.getApplicationContext(), "推送服务启动失败：" + e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }


    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    public void notifyUser(int id, String str,JSONObject object) {
        NotificationManager notificationManager = (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);
        NotificationCompat.Builder mBuilder;
        //判断是否是8.0Android.O
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel chan1 = new NotificationChannel(PRIMARY_CHANNEL,
                    "Primary Channel", NotificationManager.IMPORTANCE_DEFAULT);
            chan1.setLightColor(Color.GREEN);
            chan1.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
            notificationManager.createNotificationChannel(chan1);
            mBuilder = new NotificationCompat.Builder(this, PRIMARY_CHANNEL);
        } else {
            mBuilder = new NotificationCompat.Builder(this);
        }
        try {
            if (object == null)return;
            mBuilder.setContentText(object.getString("content"));
            mBuilder.setTicker(object.has("ticker")?object.getString("ticker"):"");
            mBuilder.setContentTitle(object.getString("title"));
            mBuilder.setWhen(SystemClock.currentTimeMillis());
            //DateTimeUtil.parseDate(object.has("xxsj")?object.getString("xxsj"): System.currentTimeMillis()

            //消息显示大图片的代码
//            NotificationCompat.BigPictureStyle bigTextStyle = new NotificationCompat.BigPictureStyle();
//            bigTextStyle.setBigContentTitle("")
//                    .setSummaryText("")
//                .bigLargeIcon(BitmapFactory.decodeResource(this.getResources(),R.drawable.ic_logo))
//
//                    .bigPicture(BitmapFactory.decodeFile(object.getString("xxtp")));
//            mBuilder.setStyle(bigTextStyle);
            mBuilder.setSmallIcon(R.mipmap.ic_launcher);
        } catch (JSONException e) {
            e.printStackTrace();
        }


        Notification n = mBuilder.build();
        Intent intent = new Intent();
        intent.setAction(Const.NOTICEACTION);
        intent.putExtra("message", str);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        PendingIntent pi = PendingIntent.getBroadcast(this, 1, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        n.contentIntent = pi;
        n.defaults = Notification.DEFAULT_ALL;
        n.flags |= Notification.FLAG_SHOW_LIGHTS;
        n.flags |= Notification.FLAG_AUTO_CANCEL;
        notificationManager.notify(id, n);
    }

    protected void tryReleaseWakeLock() {
        if (wakeLock != null && wakeLock.isHeld() == true) {
            wakeLock.release();
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        cancelNotifyRunning();
        this.tryReleaseWakeLock();
    }

    protected void cancelNotifyRunning() {
        NotificationManager notificationManager = (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.cancel(0);
    }

    public class MyTcpClient extends TCPClientBase {

        public MyTcpClient(byte[] uuid, int appid, String serverAddr, int serverPort) throws Exception {
            super(uuid, appid, serverAddr, serverPort, connectTimeout);
        }

        @Override
        public boolean hasNetworkConnection() {
            return NetUtil.hasNetwork(DDPushTCPClientService.this);
        }

        @Override
        public void trySystemSleep() {
            tryReleaseWakeLock();
        }

        @Override
        public void onPushMessage(Message message) {
            if (message == null) {
                return;
            }
            if (message.getData() == null || message.getData().length == 0) {
                return;
            }

            if (message.getCmd() == 16) {// 0x10 通用推送信息
                notifyUser(16, message.toString(), null);
            }
            if (message.getCmd() == 17) {// 0x11 分组推送信息
                long msg = ByteBuffer.wrap(message.getData(), 5, 8).getLong();
                try {
                    notifyUser(17, new String(message.getData(), 5, message.getContentLength(), "UTF-8"), null);
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            }
            if (message.getCmd() == 32) {// 0x20 自定义推送信息
                String str = null;
                try {
                    str = new String(message.getData(), 5, message.getContentLength(), "UTF-8");
                    Log.e(TAG, "dd" + str);
                } catch (Exception e) {
                    str = NetUtil.convert(message.getData(), 5, message.getContentLength());
                }
                if (!TextUtils.isEmpty(str)) {
                    try {
                        notifyUser(message.getCmd(), str,new JSONObject(str));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
