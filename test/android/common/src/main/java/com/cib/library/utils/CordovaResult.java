package com.cib.library.utils;


import android.content.Context;

import androidx.annotation.StringRes;

import com.cib.library.BaseResultCode;

import org.apache.cordova.CallbackContext;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @author
 * @version 1.0.0
 * @create 2019/7/24
 */
public class CordovaResult {
    /**
     * cd成功的返回值回调统一方法
     * */
    public static void successResult(CallbackContext callback, Object resultvalue){
        callback.success(getSuccessWritableMap(resultvalue));
    }
//
//    /**
//     * cd失败的返回值回调统一方法
//     * */
    public static void failedResults(CallbackContext callback, int code, Object message){
        JSONObject jsonObject  = new JSONObject();
        try {
            jsonObject.put(BaseResultCode.RESULT_CODE,code);
            jsonObject.put(BaseResultCode.RESULT_MESSAGE,message);
        } catch (JSONException e) {
            e.printStackTrace();
        }
//        if(message instanceof WritableMap){
//            result.putMap(BaseResultCode.RESULT_MESSAGE, (WritableMap) message);
//        }else if(message instanceof String){
//            result.putString(BaseResultCode.RESULT_MESSAGE, (String) message);
//        }else if (message instanceof Integer){
//            result.putString(BaseResultCode.RESULT_MESSAGE, StringUtils.getString((Integer) message));
//        }else if(message instanceof WritableArray){
//            result.putArray(BaseResultCode.RESULT_MESSAGE, (WritableArray) message);
//        }
        callback.error(jsonObject);
    }
//
//    /**
//     * cd失败的返回值回调统一方法
//     * */
    public static void failedResult(CallbackContext callback, int code, @StringRes int messageStringId){
        callback.error(getErrorWritableMap(code,messageStringId));
    }



    /**
     * 回调cd数据错误原因
     *@param key: 错误码
     *@param value:错误原因
     **/
    public static JSONObject getErrorWritableMap(int key, int value) {
        JSONObject jsonObject  = new JSONObject();
        try {
            jsonObject.put(BaseResultCode.RESULT_CODE,key);
            jsonObject.put(BaseResultCode.RESULT_MESSAGE, StringUtils.getString(value));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    /**
     * 回调cd成功数据
     *@param : 成功码
     *@param :WritableMap型 成功原因
     **/
    public static JSONObject getSuccessWritableMap(Object resultvalue) {

        JSONObject jsonObject  = new JSONObject();
        try {
            jsonObject.put(BaseResultCode.RESULT_CODE, BaseResultCode.RESULT_CODE_VALUE);
            if(resultvalue instanceof  Integer){
                jsonObject.put(BaseResultCode.RESULT_MESSAGE, StringUtils.getString((Integer) resultvalue));
            }else {
                jsonObject.put(BaseResultCode.RESULT_MESSAGE, resultvalue);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}
