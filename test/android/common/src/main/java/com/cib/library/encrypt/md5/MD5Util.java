package com.cib.library.encrypt.md5;

import com.cib.library.exception.BaseException;
import com.cib.library.exception.ExceptionCode;
import com.cib.library.exception.system.SystemException;

import java.security.MessageDigest;

/**
 * md5生成工具类
 *
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/5/24
 */
public class MD5Util {


    /**
     * 生成MD5摘要，以数组形式返回
     *
     * @param text 消息文本
     */
    public static byte[] md5Bytes(String text) throws BaseException {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(text.getBytes("UTF-8"));
            return md.digest();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException(ExceptionCode.CODE_MD5, ExceptionCode.getErrorMessage(ExceptionCode.CODE_MD5));
        }
    }

    /**
     * 生成MD5摘要
     *
     * @param text 消息文本
     */
    public static String md5(String text) throws BaseException {
        byte[] digest = md5Bytes(text);
        StringBuffer md5 = new StringBuffer();
        for (int i = 0; i < digest.length; i++) {
            md5.append(Character.forDigit((digest[i] & 0xF0) >> 4, 16));
            md5.append(Character.forDigit((digest[i] & 0xF), 16));
        }
        text = md5.toString();
        return text;
    }

      /*
     * MD5加密
     */
//    public static String md5(String content) {
//        byte[] hash;
//        try {
//            hash = MessageDigest.getInstance("MD5").digest(content.getBytes("UTF-8"));
//        } catch (NoSuchAlgorithmException e) {
//            throw new RuntimeException("NoSuchAlgorithmException",e);
//        } catch (UnsupportedEncodingException e) {
//            throw new RuntimeException("UnsupportedEncodingException", e);
//        }
//
//        StringBuilder hex = new StringBuilder(hash.length * 2);
//        for (byte b : hash) {
//            if ((b & 0xFF) < 0x10){
//                hex.append("0");
//            }
//            hex.append(Integer.toHexString(b & 0xFF));
//        }
//        return hex.toString();
//    }
}
