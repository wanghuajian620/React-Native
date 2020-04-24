package com.rnproject.tools;

import android.content.Context;

import com.cib.library.sp.SPEncryptedUtils;
import com.rnproject.BuildConfig;

public class Config {
    private static SPEncryptedUtils fileUtils = null;
    public static void saveAppConfig(Context context) {
        fileUtils = SPEncryptedUtils.getInstance(context);
        fileUtils.setEncryptedData("channelNumber", BuildConfig.channelNumber);
        fileUtils.setEncryptedData("satrtPage", BuildConfig.satrtPage);
        fileUtils.setEncryptedData("startComponent", BuildConfig.startComponent);
        fileUtils.setEncryptedData("resetSatrtPageKey", BuildConfig.resetSatrtPageKey);
        fileUtils.setEncryptedData("resetStartComponentKey", BuildConfig.resetStartComponentKey);
        fileUtils.setEncryptedData("isUseIndustrialBankEncrypt", BuildConfig.isUseIndustrialBankEncrypt);
        fileUtils.setEncryptedData("IndustrialBankClientCertificate", BuildConfig.IndustrialBankClientCertificate);
        fileUtils.setEncryptedData("isUseHttps", BuildConfig.isUseHttps);
        fileUtils.setEncryptedData("ClientCertificate", BuildConfig.ClientCertificate);
        fileUtils.setEncryptedData("ClientCertificatePass", BuildConfig.ClientCertificatePass);
        fileUtils.setEncryptedData("serverAddress", BuildConfig.serverAddress);
        fileUtils.setEncryptedData("messageServerAddress", BuildConfig.messageServerAddress);

        //新增
        fileUtils.setEncryptedData("ddpushIP", BuildConfig.ddpushIP);
        fileUtils.setEncryptedData("httpPort", BuildConfig.httpPort);
        fileUtils.setEncryptedData("httpsPort", BuildConfig.httpsPort);
        fileUtils.setEncryptedData("interfaceUrl", BuildConfig.interfaceUrl);

        //新增bY FGQ
        fileUtils.setEncryptedData("QQShareID", BuildConfig.QQShareID);
        fileUtils.setEncryptedData("WXShareID", BuildConfig.WXShareID);
        fileUtils.setEncryptedData("WBShareKey", BuildConfig.WBShareKey);
        fileUtils.setEncryptedData("MapKey", BuildConfig.MapKey);
    }
}
