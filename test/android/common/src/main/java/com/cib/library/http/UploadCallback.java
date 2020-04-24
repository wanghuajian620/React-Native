package com.cib.library.http;

/**
 * Created by liudan on 2019/7/9.
 */

public interface UploadCallback {
    void success(Object o);
    void failed(Integer object,Object result);
}
