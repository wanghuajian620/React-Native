package com.cib.library.encrypt.des;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;

/**
 * 3DES加密工具类
 *
 * @author liufeng
 * @date 2012-10-11
 */
public class Des3 {
    private static boolean isDecode = true;
    // 向量
    private final static String iv = "01234567";
    // 加解密统一使用的编码方式
    private final static String encoding = "utf-8";

    /**
     * 3DES加密
     *
     * @param plainText 普通文本
     * @return
     * @throws Exception
     */
    public static String encode(String plainText, String secretKey){
        String encodeStr = "";
        try {
            Key deskey = null;
            DESedeKeySpec spec = new DESedeKeySpec(secretKey.getBytes());
            SecretKeyFactory keyfactory = SecretKeyFactory.getInstance("desede");
            deskey = keyfactory.generateSecret(spec);

            Cipher cipher = Cipher.getInstance("desede/CBC/PKCS5Padding");
            IvParameterSpec ips = new IvParameterSpec(iv.getBytes());
            cipher.init(Cipher.ENCRYPT_MODE, deskey, ips);
            byte[] encryptData = cipher.doFinal(plainText.getBytes(encoding));
            encodeStr = BaseUtil64.encode(encryptData);
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeySpecException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (InvalidAlgorithmParameterException e) {
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
        } catch (BadPaddingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return encodeStr;
    }

    /**
     * 3DES解密
     *
     * @param encryptText 加密文本
     * @return
     * @throws Exception
     */
    public static String decode(String encryptText, String secretKey){
        String strDecode = encryptText;
        try {
            if(isDecode){
                Key deskey = null;
                DESedeKeySpec spec = new DESedeKeySpec(secretKey.getBytes());
                SecretKeyFactory keyfactory = SecretKeyFactory.getInstance("desede");
                deskey = keyfactory.generateSecret(spec);
                Cipher cipher = Cipher.getInstance("desede/CBC/PKCS5Padding");
                IvParameterSpec ips = new IvParameterSpec(iv.getBytes());
                cipher.init(Cipher.DECRYPT_MODE, deskey, ips);
                byte[] decryptData = cipher.doFinal(BaseUtil64.decode(encryptText));
                strDecode = new String(decryptData, encoding);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return strDecode;
    }
}
