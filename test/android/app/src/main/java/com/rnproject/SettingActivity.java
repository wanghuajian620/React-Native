package com.rnproject;

import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Switch;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.rnproject.base.BaseActivity;

import com.cib.library.sp.SPEncryptedUtils;
import com.rnproject.base.Const;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;

/**
 * Created by liudan on 2019/9/19.
 * 应用基础设置页面
 */

public class SettingActivity extends BaseActivity implements View.OnClickListener, CompoundButton.OnCheckedChangeListener {
    private LinearLayout settingback;
    private TextView settingsave,channelNumber,settingqqshare,settingweixinshare,settingweiboshare;
    private EditText ddpuship,serviceip,servicehttpport,servicehttpsport;
    private Switch xyencry,swhttps,swinterceptscreen,swintegrity,swisautoreload,swusegzip;
    private String isUseIndustrialBankEncrypt = "false",isUseHttps = "false",isUseGzip = "fasle"
            ,isCanScreenshot = "false",isCheckIntegrity = "false",isAutoReload = "false";
    private SPEncryptedUtils spUtils;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initView(R.layout.setting_acitivity);
        spUtils = SPEncryptedUtils.getInstance(SettingActivity.this);

        //初始化控件
        initviews();
        //获取已设置参数
        getSaveSettings();
    }

    //设置的数据回显
    private void getSaveSettings() {
        isUseIndustrialBankEncrypt = spUtils.getDecryptedData("isUseIndustrialBankEncrypt");
        if ("true".equals(isUseIndustrialBankEncrypt)){
            xyencry.setChecked(true);
        }else {
            xyencry.setChecked(false);
        }

        isUseHttps = spUtils.getDecryptedData("isUseHttps");
        if ("true".equals(isUseHttps)){
            swhttps.setChecked(true);
        }else {
            swhttps.setChecked(false);
        }

        isUseGzip = spUtils.getDecryptedData("isUseGzip");
        if ("true".equals(isUseGzip)){
            swusegzip.setChecked(true);
        }else {
            swusegzip.setChecked(false);
        }

        isCanScreenshot = spUtils.getDecryptedData("isCanScreenshot");
        if ("true".equals(isCanScreenshot)){
            swinterceptscreen.setChecked(true);
        }else {
            swinterceptscreen.setChecked(false);
        }

        isCheckIntegrity = spUtils.getDecryptedData("isCheckIntegrity");
        if ("true".equals(isCheckIntegrity)){
            swintegrity.setChecked(true);
        }else{
            swintegrity.setChecked(false);
        }

        isAutoReload = spUtils.getDecryptedData("isAutoReload");
        if ("true".equals(isAutoReload)){
            swisautoreload.setChecked(true);
        }else {
            swisautoreload.setChecked(false);
        }
        String ddip = spUtils.getDecryptedData("ddpushIP");
        ddpuship.setText(ddip);
        String service = spUtils.getDecryptedData("interfaceUrl");
        serviceip.setText(service);
        String httpport = spUtils.getDecryptedData("httpPort");
        servicehttpport.setText(httpport);
        String httpsport = spUtils.getDecryptedData("httpsPort");
        servicehttpsport.setText(httpsport);
        String channel = spUtils.getDecryptedData("channelNumber");
        channelNumber.setText(channel);
    }

    private void initviews() {
        settingback = findViewById(R.id.setting_back);
        settingsave = findViewById(R.id.setting_save_tv);

        channelNumber = findViewById(R.id.setting_channelNumber);
        ddpuship = findViewById(R.id.setting_ddpush_ip);
        serviceip = findViewById(R.id.setting_main_ip);
        servicehttpport = findViewById(R.id.setting_main_port);
        xyencry = findViewById(R.id.sw_xyencry);
        swhttps = findViewById(R.id.sw_https);
        swinterceptscreen = findViewById(R.id.sw_interceptscreen);
        swintegrity = findViewById(R.id.sw_integrity);
        swisautoreload = findViewById(R.id.sw_isautoreload);
        swusegzip = findViewById(R.id.sw_isusegzip);
        servicehttpsport = findViewById(R.id.setting_https_port);
        settingqqshare = findViewById(R.id.setting_qqshare);
        settingweixinshare = findViewById(R.id.setting_weixinshare);
        settingweiboshare = findViewById(R.id.setting_weiboshare);

        settingsave.setOnClickListener(this);
        settingback.setOnClickListener(this);
        xyencry.setOnCheckedChangeListener(this);
        swusegzip.setOnCheckedChangeListener(this);
        swhttps.setOnCheckedChangeListener(this);
        swisautoreload.setOnCheckedChangeListener(this);
        swinterceptscreen.setOnCheckedChangeListener(this);
        swintegrity.setOnCheckedChangeListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.setting_back:
                finish();
                break;
            case R.id.setting_save_tv:
                saveallsettings();
                break;
        }
    }

    //保存所有设置的值
    private void saveallsettings() {
        int bankeccrypt = spUtils.setEncryptedData("isUseIndustrialBankEncrypt", isUseIndustrialBankEncrypt);
        int useHttps = spUtils.setEncryptedData("isUseHttps",isUseHttps);
        int usegzip = spUtils.setEncryptedData("isUseGzip",isUseGzip);
        int canScreenshot = spUtils.setEncryptedData("isCanScreenshot",isCanScreenshot);
        int checkIntegrity = spUtils.setEncryptedData("isCheckIntegrity",isCheckIntegrity);
//        int autoReload = spUtils.setEncryptedData("isAutoReload",isAutoReload);
        int saveDdpuship = spUtils.setEncryptedData("ddpushIP",ddpuship.getText().toString().trim());
        int saveServiceip = spUtils.setEncryptedData("interfaceUrl",serviceip.getText().toString().trim());
        int saveServicehttpport = spUtils.setEncryptedData("httpPort",servicehttpport.getText().toString().trim());
        int saveServicehttpsport = spUtils.setEncryptedData("httpsPort",servicehttpsport.getText().toString().trim());

        try {
            if ("".equals(Const.appconf)){return;}
            JSONObject jsonObject =  new JSONObject(Const.appconf);
            JSONObject jsonObject1 = new JSONObject();
            jsonObject1.put("isUseIndustrialBankEncrypt",isUseIndustrialBankEncrypt);
            jsonObject1.put("IndustrialBankClientCertificate","");
            JSONObject jsonObject2 = new JSONObject();
            jsonObject2.put("isUseGzip",isUseGzip);
            jsonObject2.put("isUseHttps",isUseHttps);
            jsonObject2.put("ClientCertificate","");
            jsonObject2.put("ClientCertificatePass","");


            jsonObject.put("HTTPChannel",jsonObject2);
            jsonObject.put("IndustrialBankHTTPChannel",jsonObject1);
            jsonObject.put("isCanScreenshot",isCanScreenshot);
            jsonObject.put("isCheckIntegrity",isCheckIntegrity);
            jsonObject.put("ddpushIP",ddpuship.getText().toString().trim());
            jsonObject.put("interfaceUrl",serviceip.getText().toString().trim());
            jsonObject.put("httpPort",servicehttpport.getText().toString().trim());
            jsonObject.put("httpsPort",servicehttpsport.getText().toString().trim());
            writeappconf(jsonObject.toString(4));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (bankeccrypt ==1 && useHttps == 1 && usegzip == 1 && canScreenshot == 1 && checkIntegrity ==1){
            finish();
        }
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        switch (buttonView.getId()){
            case R.id.sw_xyencry:
                if (isChecked){
                    isUseIndustrialBankEncrypt = "true";
                }else {
                    isUseIndustrialBankEncrypt = "false";
                }
            break;
            case R.id.sw_https:
                if (isChecked){
                    isUseHttps = "true";
                }else {
                    isUseHttps = "false";
                }
                break;
            case R.id.sw_isusegzip:
                if (isChecked){
                    isUseGzip = "true";
                }else {
                    isUseGzip = "false";
                }
                break;
            case R.id.sw_interceptscreen:
                if (isChecked){
                    isCanScreenshot = "true";
                }else {
                    isCanScreenshot = "false";
                }
                break;
            case R.id.sw_integrity:
                if (isChecked){
                    isCheckIntegrity = "true";
                }else {
                    isCheckIntegrity = "false";
                }
                break;

            case R.id.sw_isautoreload:
                if (isChecked){
                    isAutoReload = "true";
                }else {
                    isAutoReload = "false";
                }
                break;
        }
    }

    private void writeappconf(String s){
        try {
            File file = new File(Environment.getExternalStorageDirectory(),"/sharefile/app.conf");
            //向文件中写入数据 这里采用覆盖写入方式
            FileOutputStream fos = new FileOutputStream(file);
            byte[] bytes = s.getBytes();
            fos.write(bytes);
            fos.close();
            Log.d("liudan","写入成功");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
