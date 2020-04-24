package com.rnproject.ddpush;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

/**
 * 通信Module类
 * Created by Song on 2017/2/17.
 */
public class DDPushModule extends ReactContextBaseJavaModule {

    public static final String MODULE_NAME = "TokenManager";
    public static final String EVENT_NAME = "RecivedPushNotification";
    private ReactApplicationContext mContext;

    /**
     * 构造方法必须实现
     *
     * @param reactContext
     */
    public DDPushModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    /**
     * 在rn代码里面是需要这个名字来调用该类的方法
     *
     * @return
     */
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    /**
     * Native调用RN
     *
     * @param msg
     */
    public void nativeCallRn(String msg) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(EVENT_NAME, msg);
    }

    /**
     * 向RN传递常量
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> params = new HashMap<>();
        params.put("pushNotification", EVENT_NAME);
        return params;
    }
}
