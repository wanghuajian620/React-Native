package com.cib.library.exception;
/**
 * Created by admin on 2019/6/6.
 */

import androidx.annotation.IntDef;

import com.cib.library.BaseApplication;

import java.util.HashMap;
import java.util.Map;

/**
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/6/6
 */

public class ExceptionCode {
    public static final int CODE_ADD_VIEW = 8010;
    public static final int CODE_ZIP_ZERROR = 8000;
    public static final int CODE_IO = 8001;
    public static final int CODE_CONNECT_TIMEOUT = 8002;
    public static final int CODE_CONNECT = 8003;
    public static final int CODE_MATH = 8004;
    public static final int CODE_ARRAY_OUT_OF_BOUND = 8005;
    public static final int CODE_FORMAT_STRING = 8006;
    public static final int CODE_CLASS_NOT_FOUND = 8007;
    public static final int CODE_DATABASE = 8008;
    public static final int CODE_NULL_POINT = 8009;
    public static final int CODE_ACTIVITY_NOT_FOUND = 8011;
    public static final int CODE_FILE_NOT_FOUND = 8012;
    public static final int CODE_PROPERTY_NOT_FOUND = 8013;
    public static final int CODE_METHOD_NOT_FOUND = 8014;
    public static final int CODE_MD5 = 8015;
    public static final int SECURITY_NO_SUCH_ALGOTHIME = 8016;
    public static Map<Integer, Integer> map = new HashMap<>();

    /**
     * 根据错误码返回错误消息
     *
     * @param code 错误码
     * @return 错误消息，
     */
    public static String getErrorMessage(int code) {
        Integer integer = map.get(code);
        if (integer == null) {
            return "";
        }
        return BaseApplication.getInstance().getString(integer);

    }

    @IntDef(value = {CODE_ZIP_ZERROR, CODE_IO, CODE_CONNECT_TIMEOUT,
            CODE_CONNECT, CODE_MATH, CODE_ARRAY_OUT_OF_BOUND,
            CODE_FORMAT_STRING, CODE_CLASS_NOT_FOUND, CODE_DATABASE,
            CODE_NULL_POINT, CODE_ADD_VIEW, CODE_ACTIVITY_NOT_FOUND,
            CODE_PROPERTY_NOT_FOUND, CODE_METHOD_NOT_FOUND, CODE_MD5
            , SECURITY_NO_SUCH_ALGOTHIME
    })
    public @interface SystemExcptionCode {

    }
}
