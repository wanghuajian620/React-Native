package com.cib.library.utils;

import android.text.TextUtils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * List 相关处理工具类
 * Created by ChengPengFei on 2016/12/30 0030.
 */

public final class ListUtil {

    private ListUtil(){}
    /**
     * 将源数据 dataSource 分隔到 List 集合中
     * @param source 源数据
     * @param sign 分隔符
     * @return List 结果集合
     */
    public static List<String> spiltToListString(String source, String sign){
        List<String> result = new ArrayList<>();
        if(!TextUtils.isEmpty(sign) && !TextUtils.isEmpty(source)){
            append(result,source.split(sign));
        }
        return result;
    }

    /**
     * 将源数据 dataSource 分隔到 List 集合中
     * @param source 源数据
     * @param sign 分隔符
     * @return List 结果集合
     */
    public static List<Long> spiltToListLong(String source, String sign){
        List<Long> result = new ArrayList<>();
        if(!TextUtils.isEmpty(sign) && !TextUtils.isEmpty(source)){
            String[] temp = source.split(sign);
            for(String t : temp){
                Long l = Long.parseLong(t);
                result.add(l);
            }
        }
        return result;
    }

    /**
     * 将源数据 dataSource 分隔到 List 集合中
     * @param source 源数据
     * @param sign 分隔符
     * @return List 结果集合
     */
    public static String[] spiltToArray(String source, String sign){
        List<String> temp = new ArrayList<>();
        if(!TextUtils.isEmpty(sign) && !TextUtils.isEmpty(source)){
            append(temp,source.split(sign));
        }
        String[] result = new String[temp.size()];
        temp.toArray(result);
        return result;
    }

    /**
     * 将数组添加到 List 集合中
     * @param dst List 集合
     * @param source 待添加的对象数组
     * @param <T>
     */
    public static <T> void  append(List<T> dst,T[] source){
        if(source == null || dst == null) return;

        for (T t : source){
            dst.add(t);
        }
    }

    /**
     * 将子对象 dataSource 中的集合数据添加到父对象 dst 集合中
     * @param dst 目标集合
     * @param source 源数据集合
     * @param <E> 父对象
     * @param <T> 子对象
     */
    public static <E,T extends E> void append(List<E> dst,List<T> source){
        if(dst == null || source == null) return;

        for (T t : source){
            dst.add(t);
        }
    }

    /**
     * 将 Map 集合中的数据值输出到 List 集合中
     * @param map Map 集合
     * @param <E> 值类型对象
     * @param <K> 键类型对象
     * @return List 集合
     */
    public static <E,K> List<E> outputMapValue(Map<K,E> map){
        Iterator<K> it = map.keySet().iterator();
        List<E> result = new ArrayList<>();
        while (it.hasNext()){
            result.add(map.get(it.next()));
        }
        return result;
    }

    /**
     * 将 Map 集合中的数据键输出到 List 集合中
     * @param map Map 集合
     * @param <E> 值类型对象
     * @param <K> 键类型对象
     * @return List 集合
     */
    public static <E,K> List<K> outputMapKey(Map<K,E> map){
        Iterator<K> it = map.keySet().iterator();
        List<K> result = new ArrayList<>();
        while (it.hasNext()){
            result.add(it.next());
        }
        return result;
    }

    /**
     * 将 Object 转换到 List 字符串数组
     * @param params
     * @return List<String>
     */
    public static List<String> valueOf(Object... params){
        List<String> result = new ArrayList<>();
        if(params != null){
            for(Object object : params){
                result.add(String.valueOf(object));
            }
        }
        return result;
    }

    /**
     * 获取集合中的第一个元素
     * @param source 集合
     * @param <E> 数据对象
     * @return 集合首个元素
     */
    public static <E> E getFirstElement(List<E> source){
        if(source != null && !source.isEmpty()){
            return source.get(0);
        }
        return null;
    }

    /**
     * 获取集合中的前面指定个数元素
     * @param source 集合
     * @param <E> 数据对象
     * @return 前面指定个数元素
     */
    public static <E> List<E> getHeadElement(List<E> source,int headCount){

        List<E> result = new ArrayList<>();
        if(source != null && !source.isEmpty()){
            for(int i = 0;i < headCount && i < source.size();i++){
                result.add(source.get(i));
            }
        }
        return result;
    }

    /**
     * 获取集合中的最后一个元素
     * @param source 集合
     * @param <E> 数据对象
     * @return 集合首个元素
     */
    public static <E> E getLastElement(List<E> source){
        if(source != null && !source.isEmpty()){
            return source.get(source.size() - 1);
        }
        return null;
    }

    /**
     * 输出到数组
     * @param source
     * @return
     */
    public static Long[] outputToLong(List<Long> source){
        Long[] result = new Long[source.size()];
        if(null != source)
            source.toArray(result);
        return result;
    }

    /**
     * 输出到数组
     * @param source
     * @return
     */
    public static String[] outputToString(List<String> source){
        String[] result = new String[source.size()];
        if(null != source)
            source.toArray(result);
        return result;
    }

    /**
     * 将数据输出到 List 集合中
     * @param data
     * @param <V>
     * @return
     */
    public static <V> List<V> outputToList(V[] data){
        List<V> result = new ArrayList<>();
        if(data != null && data.length > 0){
            for(V v : data){
                result.add(v);
            }
        }
        return result;
    }

    /**
     * List 集合的长度
     * @param data
     * @return
     */
    public static int sizeOf(List data){
        return null == data ? 0 : data.size();
    }

    /**
     * 是否为空
     * @param data
     * @return
     */
    public static boolean isEmpty(List data){
        return null == data  || data.isEmpty();
    }


    /**
     * 将 List 包装到 ArrayList
     * @param source
     * @param <T>
     * @return
     */
    public static <T> ArrayList<T> wrapper(List<T> source){
        ArrayList<T> dst = new ArrayList<>();
        dst.addAll(source);
        return dst;
    }


    /**
     * 是否不为空
     * @param data
     * @return
     */
    public static boolean isNotEmpty(List data){
        return !isEmpty(data);
    }


    /**
     * 循环回调
     * @param <T>
     */
    public interface OnForeach<T>{
        void onItem(T item);
    }

    /**
     * 循环集合
     * @param data
     * @param it
     * @param <T>
     */
    public static <T> void foreach(List<T> data,OnForeach<T> it){
        if(isEmpty(data) || null == it) return;
        for(int i = 0;i < data.size();i++){
            if (null!=data&&null!=data.get(i)){
                it.onItem(data.get(i));
            }
        }
    }

    /**
     * 将 From 中的数据添加到 Dest 中去
     * @param dest
     * @param from
     * @param <T>
     */
    public static <T> void addAll(List<T> dest,List<T> from){
        if(null == dest || null == from)return;
        dest.addAll(from);
    }
}
