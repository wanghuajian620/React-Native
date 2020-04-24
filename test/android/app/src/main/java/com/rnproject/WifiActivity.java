package com.rnproject;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import com.facebook.common.logging.FLog;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.modules.systeminfo.AndroidInfoHelpers;
import com.rnproject.base.BaseActivity;
import com.rnproject.utils.LogUtils;

public class WifiActivity extends BaseActivity {
    private static String TAG = "wifiActivity";
    private String PREFS_DEBUG_SERVER_HOST_KEY = "debug_http_host";
    private EditText et_address, et_num;
    private SharedPreferences sp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initView(R.layout.activity_wifi);
        findViewById(R.id.setting_back_ll).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        et_address = ((EditText) findViewById(R.id.et_address));
        et_num = ((EditText) findViewById(R.id.et_num));
        sp = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        getDebugServerHost(this);
    }

    /**
     * 获取debug调试的地址
     *
     * @return
     */
    public String getDebugServerHost(Context context) {
//        String hostFromSettings = sp.getString(PREFS_DEBUG_SERVER_HOST_KEY,"");

        String hostFromSettings = sp.getString(PREFS_DEBUG_SERVER_HOST_KEY, "");
        if (!"".equals(hostFromSettings)) {
            String[] hostStr = hostFromSettings.split(":");
            et_address.setText(hostStr[0]);
            et_num.setText(hostStr[1]);
        }

        LogUtils.print("hostFromSettings" + hostFromSettings);

        if (!TextUtils.isEmpty(hostFromSettings)) {
            return Assertions.assertNotNull(hostFromSettings);
        }

        String host = AndroidInfoHelpers.getServerHost(context);
        LogUtils.print("host      " + host + "AndroidInfoHelpers.DEVICE_LOCALHOST    " + AndroidInfoHelpers.DEVICE_LOCALHOST);
        if (host.equals(AndroidInfoHelpers.DEVICE_LOCALHOST)) {
            FLog.w(TAG, "You seem to be running on device. Run 'adb reverse tcp:8081 tcp:8081' to forward the debug server's port to the device.");
        }
        return host;
    }

    /**
     * 确定点击事件
     *
     * @param view
     */
    public void SureClick(View view) {
        String strAddress = et_address.getText().toString();
        String strnum = et_num.getText().toString();
        if ("".equals(strAddress) || "".equals(strnum)) {
            Toast.makeText(this, "ip或端口号不能为空", Toast.LENGTH_SHORT).show();
            return;
        }

//        SharePreferenceUtils.setString(this,PREFS_DEBUG_SERVER_HOST_KEY,strAddress+":"+strnum);
        sp.edit().putString(PREFS_DEBUG_SERVER_HOST_KEY, strAddress + ":" + strnum).commit();

        //跳转到rn页面
        startActivity(new Intent(this, MainActivity.class));
        finish();
    }
}
