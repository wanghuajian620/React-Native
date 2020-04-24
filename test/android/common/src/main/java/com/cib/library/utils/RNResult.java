package com.cib.library.utils;

import androidx.annotation.StringRes;

import com.cib.library.BaseResultCode;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

/**
 * @author
 * @version 1.0.0
 * @create 2019/5/27
 */
public class RNResult {
    /**
     * rn成功的返回值回调统一方法
     * */
    public static void successResult(Callback callback,Object resultvalue){
        callback.invoke(getSuccessWritableMap(resultvalue));
    }

    /**
     * rn失败的返回值回调统一方法
     * */
    public static void failedResults(Callback callback,int code, Object message){
        WritableMap result = Arguments.createMap();
        result.putInt(BaseResultCode.RESULT_CODE,code);
        if(message instanceof WritableMap){
            result.putMap(BaseResultCode.RESULT_MESSAGE, (WritableMap) message);
        }else if(message instanceof String){
            result.putString(BaseResultCode.RESULT_MESSAGE, (String) message);
        }else if (message instanceof Integer){
            result.putString(BaseResultCode.RESULT_MESSAGE, StringUtils.getString((Integer) message));
        }else if(message instanceof WritableArray){
            result.putArray(BaseResultCode.RESULT_MESSAGE, (WritableArray) message);
        }
        callback.invoke(result);
    }

    /**
     * rn失败的返回值回调统一方法
     * */
    public static void failedResult(Callback callback,int code, @StringRes int messageStringId){
        callback.invoke(getErrorWritableMap(code,messageStringId));
    }


    /**
     * 回调RN数据错误原因
     *@param key: 错误码
     *@param value:错误原因
     **/
    public static WritableMap getErrorWritableMap(int key, int value) {
        WritableMap result = Arguments.createMap();
        result.putInt(BaseResultCode.RESULT_CODE,key);
        result.putString(BaseResultCode.RESULT_MESSAGE, StringUtils.getString(value));
        return result;
    }

    /**
     * 回调RN成功数据
     *@param : 成功码
     *@param :WritableMap型 成功原因
     **/
    public static WritableMap getSuccessWritableMap(Object resultvalue) {
        WritableMap result = Arguments.createMap();
        result.putInt(BaseResultCode.RESULT_CODE, BaseResultCode.RESULT_CODE_VALUE);
        if(resultvalue instanceof WritableMap){
            result.putMap(BaseResultCode.RESULT_MESSAGE, (WritableMap) resultvalue);
        }else if(resultvalue instanceof String){
            result.putString(BaseResultCode.RESULT_MESSAGE, (String) resultvalue);
        }else if (resultvalue instanceof Integer){
            result.putString(BaseResultCode.RESULT_MESSAGE, StringUtils.getString((Integer) resultvalue));
        }else if(resultvalue instanceof WritableArray){
            result.putArray(BaseResultCode.RESULT_MESSAGE, (WritableArray) resultvalue);
        }
        return result;
    }
}
