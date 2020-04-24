package com.cib.library.exception.bussiness;


import com.cib.library.exception.BaseException;

/**
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/5/22
 */
public class BussinessException extends BaseException {


    public BussinessException(int code, String message) {
        super(code, message);
    }
}
