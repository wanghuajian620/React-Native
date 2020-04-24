package com.cib.library.encrypt.sm4;

import android.os.Build;
import android.util.Base64;

import androidx.annotation.RequiresApi;

import com.cib.library.encrypt.Util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by liudan on 2018/6/1.
 */

public class SM4Utils {
    private String secretKey = "";
    private String iv = "";
    private boolean hexString = false;

    public SM4Utils()
    {
    }

    @RequiresApi(api = Build.VERSION_CODES.FROYO)
    public String encryptData_ECB(String plainText)
    {
        try
        {
            SM4_Context ctx = new SM4_Context();
            ctx.isPadding = true;
            ctx.mode = SM4.SM4_ENCRYPT;

            byte[] keyBytes;
            if (hexString)
            {
                keyBytes = Util.hexStringToBytes(secretKey);
            }
            else
            {
                keyBytes = secretKey.getBytes();
            }

            SM4 sm4 = new SM4();
            sm4.sm4_setkey_enc(ctx, keyBytes);
            byte[] encrypted = sm4.sm4_crypt_ecb(ctx, plainText.getBytes("UTF-8"));
            String cipherText = Base64.encodeToString(encrypted,0);
            if (cipherText != null && cipherText.trim().length() > 0)
            {
                Pattern p = Pattern.compile("\\s*|\t|\r|\n");
                Matcher m = p.matcher(cipherText);
                cipherText = m.replaceAll("");
            }
            return cipherText;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    public String decryptData_ECB(String cipherText)
    {
        try
        {
            SM4_Context ctx = new SM4_Context();
            ctx.isPadding = true;
            ctx.mode = SM4.SM4_DECRYPT;

            byte[] keyBytes;
            if (hexString)
            {
                keyBytes = Util.hexStringToBytes(secretKey);
            }
            else
            {
                keyBytes = secretKey.getBytes();
            }

            SM4 sm4 = new SM4();
            sm4.sm4_setkey_dec(ctx, keyBytes);
            byte[] decrypted = sm4.sm4_crypt_ecb(ctx, Base64.decode(cipherText,0));
            return new String(decrypted, "UTF-8");
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    public String encryptData_CBC(String plainText)
    {
        try
        {
            SM4_Context ctx = new SM4_Context();
            ctx.isPadding = true;
            ctx.mode = SM4.SM4_ENCRYPT;

            byte[] keyBytes;
            byte[] ivBytes;
            if (hexString)
            {
                keyBytes = Util.hexStringToBytes(secretKey);
                ivBytes = Util.hexStringToBytes(iv);
            }
            else
            {
                keyBytes = secretKey.getBytes();
                ivBytes = iv.getBytes();
            }

            SM4 sm4 = new SM4();
            sm4.sm4_setkey_enc(ctx, keyBytes);
            byte[] encrypted = sm4.sm4_crypt_cbc(ctx, ivBytes, plainText.getBytes("UTF-8"));
            String cipherText = Base64.encodeToString(encrypted,0);
            if (cipherText != null && cipherText.trim().length() > 0)
            {
                Pattern p = Pattern.compile("\\s*|\t|\r|\n");
                Matcher m = p.matcher(cipherText);
                cipherText = m.replaceAll("");
            }
            return cipherText;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    public String decryptData_CBC(String cipherText)
    {
        try
        {
            SM4_Context ctx = new SM4_Context();
            ctx.isPadding = true;
            ctx.mode = SM4.SM4_DECRYPT;

            byte[] keyBytes;
            byte[] ivBytes;
            if (hexString)
            {
                keyBytes = Util.hexStringToBytes(secretKey);
                ivBytes = Util.hexStringToBytes(iv);
            }
            else
            {
                keyBytes = secretKey.getBytes();
                ivBytes = iv.getBytes();
            }

            SM4 sm4 = new SM4();
            sm4.sm4_setkey_dec(ctx, keyBytes);
            byte[] decrypted = sm4.sm4_crypt_cbc(ctx, ivBytes, Base64.decode(cipherText,0));
            return new String(decrypted, "UTF-8");
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    /*
     *
     * SM4加密
     * content 加密内容
     * number 加密秘钥
    */
    public static String SM4Encrypt(String content, String number)
    {
        SM4Utils sm4 = new SM4Utils();
        sm4.secretKey = number;
        sm4.hexString = false;
        String cipherText = sm4.encryptData_ECB(content);;
        return cipherText;
    }

    /*
    *
    * SM4解密
    */
    public static String SM4Decrypt(String content,String number)
    {
        SM4Utils sm4 = new SM4Utils();
        sm4.secretKey = number;
        sm4.hexString = false;
        String cipherText = sm4.decryptData_ECB(content);;
        return cipherText;
    }
}
