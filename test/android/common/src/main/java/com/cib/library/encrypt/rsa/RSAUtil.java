package com.cib.library.encrypt.rsa;

/**
 * Created by liujun002 on 2018/4/19.
 */

import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

import com.cib.library.sp.SPEncryptedUtils;

import org.apache.commons.codec.binary.Base64;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;


/**
 * 加密接口实现类
 *
 * @author wot_zhaomingming
 */
public class RSAUtil {
    final private String ENCRUPTION_TYPE = "RSA";
    final private String seed;
    private static PublicKey publicKey = null;
    public PrivateKey privateKey;

    public RSAUtil() throws Exception {
        //读取数据库，初始化seed
        seed = "hello world";
        genKeyPair(1024);
    }

    public String encrypt(String content) throws Exception {
        return encryptWithBase64(content, privateKey);
    }

    public String decrypt(String encrypted) throws Exception {
        return decryptWithBase64(encrypted, privateKey);
    }

    private void genKeyPair(int keyLength) throws Exception {
        SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
        if (TextUtils.isEmpty(getSeed())) {
            throw new Exception("RSA seed is null");
        }
        secureRandom.setSeed(getSeed().getBytes());
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(ENCRUPTION_TYPE);
        keyPairGenerator.initialize(keyLength, secureRandom);
        KeyPair keypair = keyPairGenerator.generateKeyPair();
        publicKey = keypair.getPublic();
        privateKey = keypair.getPrivate();
    }

    private String getSeed() {
        return seed;
    }

    //私钥加密
    private byte[] encrypt(byte[] content, PrivateKey privateKey) throws Exception {
        if (privateKey == null) {
            throw new NullPointerException("Publickey is null!");
        }
        Cipher cipher = Cipher.getInstance(ENCRUPTION_TYPE);

        cipher.init(Cipher.ENCRYPT_MODE, privateKey);
        return cipher.doFinal(content);
    }

    //公钥加密
    private byte[] encrypt(byte[] content, PublicKey publicKey) throws Exception {
        if (publicKey == null) {
            throw new Exception("Publickey is null!");
        }
        Cipher cipher = Cipher.getInstance(ENCRUPTION_TYPE);
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        return cipher.doFinal(content);
    }

    //公钥解密
    private byte[] decrypt(byte[] content, PublicKey publicKey) throws Exception {
        if (publicKey == null) {
            throw new Exception("PublicKey is null!");
        }
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        return cipher.doFinal(content);
    }

    //私钥解密
    private byte[] decrypt(byte[] content, PrivateKey privateKey) throws Exception {
        if (privateKey == null) {
            throw new Exception("PrivateKey is null!");
        }
        Cipher cipher = Cipher.getInstance(ENCRUPTION_TYPE);
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        return cipher.doFinal(content);
    }


    //私钥加密
    public byte[] encryptWithBase64(byte[] content, PrivateKey privateKey) throws Exception {
        return Base64.encodeBase64(encrypt(content, privateKey));
    }

    //公钥加密
    public byte[] encryptWithBase64(byte[] content, PublicKey publicKey) throws Exception {
        return Base64.encodeBase64(encrypt(content, publicKey));
    }

    //公钥解密
    public byte[] decryptWithBase64(byte[] content, PublicKey publicKey) throws Exception {
        return decrypt(Base64.decodeBase64(content), publicKey);
    }

    //私钥解密
    public byte[] decryptWithBase64(byte[] content, PrivateKey privateKey) throws Exception {
        return decrypt(Base64.decodeBase64(content), privateKey);
    }

    //私钥加密
    public String encryptWithBase64(String content, PrivateKey privateKey) throws Exception {
        return new String(encryptWithBase64(content.getBytes(), privateKey));
    }

    //公钥加密
    public String encryptWithBase64(String content, PublicKey publicKey) throws Exception {
        return new String(encryptWithBase64(content.getBytes(), publicKey));
    }

    //公钥解密
    public String decryptWithBase64(String content, PublicKey publicKey) throws Exception {
        return new String(decryptWithBase64(content.getBytes(), publicKey));
    }

    //私钥解密
    public String decryptWithBase64(String content, PrivateKey privateKey) throws Exception {
        return new String(decryptWithBase64(content.getBytes(), privateKey));
    }

    public String publicKey2String() {
        return publicKey2String(publicKey);
    }

    ;

    public String privateKey2String() {
        return privateKey2String(privateKey);
    }

    ;

    public String getPublicKey() {
        return publicKey2String(publicKey);
    }

    ;

    public String getPrivateKey() {
        return privateKey2String(privateKey);
    }

    ;


    private String publicKey2String(PublicKey publicKey) {
        return new String(Base64.encodeBase64(publicKey.getEncoded()));
    }

    private String privateKey2String(PrivateKey privateKey) {
        return new String(Base64.encodeBase64(privateKey.getEncoded()));
    }

    private PublicKey intPublicKey(String publicKey) throws Exception {
        byte[] temp = Base64.decodeBase64(publicKey.getBytes());
        X509EncodedKeySpec priPSCS8 = new X509EncodedKeySpec(temp);
        KeyFactory keyf = KeyFactory.getInstance(ENCRUPTION_TYPE);
        PublicKey pubKey = keyf.generatePublic(priPSCS8);
        return pubKey;
    }

    private PrivateKey intPrivateKey(String privateKey) throws Exception {
        byte[] temp = Base64.decodeBase64(privateKey.getBytes());
        PKCS8EncodedKeySpec priPSCS8 = new PKCS8EncodedKeySpec(temp);
        KeyFactory keyf = KeyFactory.getInstance(ENCRUPTION_TYPE);
        PrivateKey priKey = keyf.generatePrivate(priPSCS8);
        return priKey;
    }

    public static PrivateKey getPrivateKeyFromFile(String file, String keyStorePass, String aliaesName, String keyPass) throws KeyStoreException, UnrecoverableKeyException, NoSuchAlgorithmException, CertificateException, IOException {
        FileInputStream fis = new FileInputStream(file);
        KeyStore keyStore = KeyStore.getInstance("JKS");
        keyStore.load(fis, keyStorePass.toCharArray());
        PrivateKey priKey = (PrivateKey) keyStore.getKey(aliaesName, keyPass.toCharArray());
        return priKey;
    }

    /**
     * 使用私钥解密过程
     * @param privateKey 私钥
     * @param cipherData 密文数据
     * @return 明文
     * @throws Exception 解密过程中的异常信息
     */
    public byte[] decrypt(RSAPrivateKey privateKey, byte[] cipherData) throws Exception {
        if (privateKey== null){
            throw new Exception("解密私钥为空, 请设置");
        }
        Cipher cipher= null;
        try {
            cipher= Cipher.getInstance("RSA/ECB/PKCS1Padding");//, new BouncyCastleProvider());
            cipher.init(Cipher.DECRYPT_MODE, privateKey);
            byte[] output= cipher.doFinal(cipherData);
            return output;
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("无此解密算法");
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
            return null;
        }catch (InvalidKeyException e) {
            throw new Exception("解密私钥非法,请检查");
        } catch (IllegalBlockSizeException e) {
            throw new Exception("密文长度非法");
        } catch (BadPaddingException e) {
            throw new Exception("密文数据已损坏");
        }
    }

    /**************************** RSA 公钥加密解密**************************************/
    /**
     * 从字符串中加载公钥,从服务端获取
     *
     *            公钥数据字符串
     * @throws Exception
     *             加载公钥时产生的异常
     */
    public static void loadPublicKey(String pubKey) {
        try {
            byte[] buffer = android.util.Base64.decode(pubKey, android.util.Base64.DEFAULT);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(buffer);
            publicKey = keyFactory.generatePublic(keySpec);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 公钥加密过程
     *
     *  @param publicKey          公钥
     * @param plainData
     *            明文数据
     * @return
     * @throws Exception
     *             加密过程中的异常信息
     */
    public static String encryptWithRSA(RSAPublicKey publicKey, String plainData) throws Exception {
        if (publicKey == null) {
            throw new NullPointerException("encrypt PublicKey is null !");
        }

        Cipher cipher = null;
        cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");// 此处如果写成"RSA"加密出来的信息JAVA服务器无法解析
        System.out.println("密文 = " + cipher);
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] output = cipher.doFinal(plainData.getBytes("utf-8"));
        // 必须先encode成 byte[]，再转成encodeToString，否则服务器解密会失败
        byte[] encode = android.util.Base64.encode(output, android.util.Base64.DEFAULT);
        return new String(encode);
    }

    /**
     * 公钥解密过程
     *  @param publicKey  公钥
     * @param encryedData
     *            明文数据
     * @return
     * @throws Exception
     *             加密过程中的异常信息
     */
    public static String decryptWithRSA(RSAPublicKey publicKey, String encryedData) throws Exception {
        if (publicKey == null) {
            throw new NullPointerException("decrypt PublicKey is null !");
        }

        Cipher cipher = null;
        cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");// 此处如果写成"RSA"解析的数据前多出来些乱码
        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        byte[] output = cipher.doFinal(android.util.Base64.decode(encryedData, android.util.Base64.DEFAULT));
        return new String(output);
    }
    /**************************** RSA 公钥加密解密**************************************/

    /*
    * RSA加密
    */
    public static String RASencrypt(Context context, String content) {
        RSAEncryptor rSAEncryption = new RSAEncryptor();
        String encryptedwithpublic = null;
        try {
//			InputStream inPrivate = ReadFromFileUtils.getPriKey();
//			t.loadPrivateKey(inPrivate);
            //公钥由手动拷贝到设备，基座每次启动获取一次，并存入偏好文件
//            InputStream inPubl = ReadFromFileUtils.getPubKey();
            SPEncryptedUtils share = SPEncryptedUtils.getInstance(context);
            String rsa = share.getDecryptedData("rsa");
            Log.e("pfy", "RASencrypt: 加密证书" + rsa);
            InputStream inPublic   =   new ByteArrayInputStream(rsa.getBytes("UTF-8"));
            rSAEncryption.loadPublicKey(inPublic);
            //私钥加密
            //公钥解密
            //	String encryptedwithprivite=new String(Base64.encodeBase64(t.privateEncrypt(str)));
//			String decryptedwithpublic=new String(t.publicDecrypt(Base64.decodeBase64(encryptedwithprivite.getBytes())));
//			System.out.println("1111公钥解密内容 ："+decryptedwithpublic);
            //公钥加密
            encryptedwithpublic = new String(Base64.encodeBase64(rSAEncryption.publicEncrypt(content.getBytes())));

//            String decryptedwhiteprivite=new String(t.priviteDecrypt(Base64.decodeBase64(encryptedwithpublic.getBytes())));
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return encryptedwithpublic;
    }
}
