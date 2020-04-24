package com.cib.library.utils;

import androidx.annotation.Nullable;
import androidx.annotation.StringRes;

import com.cib.library.BaseApplication;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @author
 * @version 1.0.0
 * @create 2019/5/27
 */
public class StringUtils {
    public static boolean isEmpty(String text) {
        if (text == null) {
            return true;
        }
        return text.trim().length() == 0;

    }

    /**
     * 通过字符串的资源id获取字符串的内容
     *
     * @param stringResId 字符串的资源id
     * @return
     */
    public static @Nullable
    String getString(@StringRes int stringResId) {
        //BaseApplication.getInstance() 可能为null
        return BaseApplication.getInstance() == null ? "Application is null" : BaseApplication.getInstance().getString(stringResId);
    }

    /**
     * 拼接电话号码
     * @param list
     * @param separator
     * @return
     */
    public static String listToString(List list, char separator) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            sb.append(list.get(i));
            if (i < list.size() - 1) {
                sb.append(separator);
            }
        }
        return sb.toString();
    }

    /*
     *切割字符串组成数组
    */
    public static String[] split(String args){
        String[] arrayStr = new String[] {};// 字符数组
        arrayStr = args.split(",");// 字符串转字符数组
        return arrayStr;
    }

    //json转map
    public static Map<String, Object> jsonObjToMap(JSONObject jsonResult) throws JSONException {

        Map<String, Object> result = new HashMap<String, Object>();

        Iterator<String> keyIt = jsonResult.keys();

        while (keyIt.hasNext()) {
            String key = keyIt.next();
            Object val = jsonResult.get(key);
            if (!(val instanceof JSONObject) && !(val instanceof JSONArray)) {
                if(null == val || val.equals("null") || JSONObject.NULL == val){
                    result.put(key, null);
                }else{
                    result.put(key, val);
                }
                continue;
            }
            if (val instanceof JSONObject) {
                Map<String, Object> valMap = jsonObjToMap((JSONObject) val);
                result.put(key, valMap);
                continue;
            }
            if (val instanceof JSONArray) {
                JSONArray ja = (JSONArray) val;
                result.put(key, jsonArrToList(ja));
            }
        }
        return result;
    }

    //json转list
    public static List<Object> jsonArrToList(JSONArray jsonArray) throws JSONException {
        List<Object> list = new ArrayList<Object>();
        for (int i = 0; i < jsonArray.length(); i++) {
            Object val = jsonArray.get(i);
            if (!(val instanceof JSONObject) && !(val instanceof JSONArray)) {
                list.add(val);
                continue;
            }
            if (val instanceof JSONObject) {
                Map<String, Object> map = jsonObjToMap((JSONObject) val);
                list.add(map);
                continue;
            }
            if (val instanceof JSONArray) {
                list.add(jsonArrToList((JSONArray) val));
                continue;
            }
        }
        return list;
    }



}
