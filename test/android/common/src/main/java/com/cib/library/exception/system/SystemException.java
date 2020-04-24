package com.cib.library.exception.system;

import com.cib.library.exception.BaseException;
import com.cib.library.exception.ExceptionCode;

/**
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/5/22
 */
public class SystemException extends BaseException {


    public SystemException(@ExceptionCode.SystemExcptionCode int code, String message) {
        super(code, message);
    }
}
