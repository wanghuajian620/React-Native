package com.cib.library.http;

import java.io.IOException;

import okhttp3.CacheControl;
import okhttp3.Headers;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

/**
 * 作者：王海洋
 * 时间：2016/7/6 17:36
 */
public class RequestInterceptor implements Interceptor {
    @Override
    public Response intercept(Chain chain) throws IOException {
        Request oldRequest = chain.request();
        Request.Builder requestBuilder = oldRequest.newBuilder();

        // 添加head
        Headers.Builder headBuilder = oldRequest.headers().newBuilder();
        headBuilder.add("DvcToken", "imei");
        requestBuilder.headers(headBuilder.build());

        CacheControl.Builder builder = new CacheControl.Builder();
        builder.noCache();//不使用缓存，全部走网络
        builder.noStore();//不使用缓存，也不存储缓存
        CacheControl cache = builder.build();
        // 重新组成新的请求
        Request newRequest = null;
        newRequest = requestBuilder
                .cacheControl(cache)
                .build();
        Response response = chain.proceed(newRequest);
        return response;
    }
}
