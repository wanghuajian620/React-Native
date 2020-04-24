package com.cib.library.exception;

/**
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/5/22
 */
public class BaseException extends RuntimeException  {
    private int code;

    public BaseException() {
        super();
    }

    public BaseException(String message) {
        super(message);
    }

    public BaseException(int code, String message) {
        super(message);
        this.code = code;
    }


    public BaseException(Throwable cause) {
        super(cause);
    }

    public BaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public BaseException(int code, String message, Throwable cause) {

        super(message, cause);
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
