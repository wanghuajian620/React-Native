package com.cib.library.exception.system;


import com.cib.library.R;
import com.cib.library.exception.ExceptionCode;


/**
 * 系统异常码和异常信息描述配置管理
 *
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/5/24
 */
public class SystemExceptionConfig {

    static {
        ExceptionCode.map.put(ExceptionCode.CODE_ZIP_ZERROR, R.string.exception_zip_error);
        ExceptionCode.map.put(ExceptionCode.CODE_IO, R.string.exception_io);
        ExceptionCode.map.put(ExceptionCode.CODE_CONNECT_TIMEOUT, R.string.exception_connect_timeout);
        ExceptionCode.map.put(ExceptionCode.CODE_CONNECT, R.string.exception_connect);
        ExceptionCode.map.put(ExceptionCode.CODE_MATH, R.string.exception_math);
        ExceptionCode.map.put(ExceptionCode.CODE_ARRAY_OUT_OF_BOUND, R.string.exception_array_out_of_bound);
        ExceptionCode.map.put(ExceptionCode.CODE_FORMAT_STRING, R.string.exception_string_format);
        ExceptionCode.map.put(ExceptionCode.CODE_CLASS_NOT_FOUND, R.string.exception_class_not_found);
        ExceptionCode.map.put(ExceptionCode.CODE_DATABASE, R.string.exception_database_error);
        ExceptionCode.map.put(ExceptionCode.CODE_NULL_POINT, R.string.exception_null_point);
        ExceptionCode.map.put(ExceptionCode.CODE_ADD_VIEW, R.string.exception_add_view);
        ExceptionCode.map.put(ExceptionCode.CODE_ACTIVITY_NOT_FOUND, R.string.exception_activity_not_fount);
        ExceptionCode.map.put(ExceptionCode.CODE_FILE_NOT_FOUND, R.string.exception_file_not_found);
        ExceptionCode.map.put(ExceptionCode.CODE_PROPERTY_NOT_FOUND, R.string.exception_property_not_found);
        ExceptionCode.map.put(ExceptionCode.CODE_METHOD_NOT_FOUND, R.string.exception_method_not_found);
        ExceptionCode.map.put(ExceptionCode.CODE_MD5, R.string.exception_md5);
        ExceptionCode.map.put(ExceptionCode.SECURITY_NO_SUCH_ALGOTHIME, R.string.exception_security);
    }



}
