package com.cib.library.encrypt;

import java.io.IOException;
import java.security.Key;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.SecretKeySpec;


/**
 * Created by liujun002 on 2018/4/2.
 */

public class EncryptorTool {
    /**
     * ALGORITHM 算法 <br>
     * 可替换为以下任意一种算法，同时key值的size相应改变。
     *
     * <pre>
     * DES                  key size must be equal to 56
     * DESede(TripleDES)    key size must be equal to 112 or 168
     * AES                  key size must be equal to 128, 192 or 256,but 192 and 256 bits may not be available
     * Blowfish             key size must be multiple of 8, and can only range from 32 to 448 (inclusive)
     * RC2                  key size must be between 40 and 1024 bits
     * RC4(ARCFOUR)         key size must be between 40 and 1024 bits
     * </pre>
     *
     * 在Key toKey(byte[] key)方法中使用下述代码
     * <code>SecretKey secretKey = new SecretKeySpec(key, ALGORITHM);</code> 替换
     * <code>
     * DESKeySpec dks = new DESKeySpec(key);
     * SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(ALGORITHM);
     * SecretKey secretKey = keyFactory.generateSecret(dks);
     * </code>
     */
    public static String ALGORITHM = "DES";
    /**
     * 转换密钥<br>
     *
     * @param key
     * @return
     * @throws Exception
     */
    private static Key toKey(byte[] key) throws Exception {
        SecretKey secretKey = null;
        if (ALGORITHM.equalsIgnoreCase("des")) {
            DESKeySpec dks = new DESKeySpec(key);
            SecretKeyFactory keyFactory = SecretKeyFactory
                    .getInstance(ALGORITHM);
            secretKey = keyFactory.generateSecret(dks);
        } else {
            // 当使用其他对称加密算法时，如AES、Blowfish等算法时，用下述代码替换上述三行代码
            secretKey = new SecretKeySpec(key, ALGORITHM);
        }
        return secretKey;
    }

    /**
     * 解密
     * @param data
     * @param key
     * @return
     * @throws Exception
     */
    public static byte[] decrypt(byte[] data, String key) throws Exception {
        Key k = toKey(decryptBASE64(key));
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, k);
        return cipher.doFinal(data);
    }

    /**
     * 加密
     *
     * @param data
     * @param key
     * @return
     * @throws Exception
     */
    public static byte[] encrypt(byte[] data, String key) throws Exception {
        Key k = toKey(decryptBASE64(key));
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, k);
        return cipher.doFinal(data);
    }

    /**
     * 生成密钥
     *
     * @return
     * @throws Exception
     */
    public static String getKey() throws Exception {
        return initKey(null);
    }

    /**
     * 生成密钥
     *
     * @param seed
     * @return
     * @throws Exception
     */
    public static String initKey(String seed) throws Exception {
        SecureRandom secureRandom = null;
        if (seed != null) {
            secureRandom = new SecureRandom(decryptBASE64(seed));
        } else {
            secureRandom = new SecureRandom();
        }
        KeyGenerator kg = KeyGenerator.getInstance(ALGORITHM);
        kg.init(secureRandom);
        SecretKey secretKey = kg.generateKey();
        return encryptBASE64(secretKey.getEncoded());
    }

    public static byte[] decryptBASE64(String data) throws IOException {
        byte[] datas = new byte[0];
        return datas;
    }

    public static String encryptBASE64(byte[] data) {
        return new String(data);
    }

    /**
     * 测试AES加密-->对称加密
     */
    public static String encryptData(String ALGORITHM,String inputStr) {
        Long startTime=System.currentTimeMillis();
        inputStr = "是多少发士大夫撒旦发射;";
        EncryptorTool.ALGORITHM = "DESede";
        String key = null;
        try {
            key = EncryptorTool.getKey();
            System.err.println("原文:\t" + inputStr);
            System.err.println("密钥:\t" + key);
            byte[] inputData = inputStr.getBytes();
            inputData = EncryptorTool.encrypt(inputData, key);
            System.err.println("加密后:\t" + EncryptorTool.encryptBASE64(inputData));



            byte[] outputData = EncryptorTool.decrypt(inputData, key);
            String outputStr = new String(outputData);
            System.err.println("解密后:\t" + outputStr);


        } catch (Exception e) {
            e.printStackTrace();
        }
        return EncryptorTool.encryptBASE64(inputStr.getBytes());
    }

    /**
     * 测试AES加密-->对称加密
     */
    public static String encryptData(String ALGORITHM) {

        EncryptorTool.ALGORITHM = ALGORITHM;
        String key = null;
        try {
            key = EncryptorTool.getKey();
            System.err.println("密钥:\t" + key);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return  key;
    }
}
