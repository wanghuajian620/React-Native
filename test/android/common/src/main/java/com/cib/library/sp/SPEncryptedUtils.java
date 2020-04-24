package com.cib.library.sp;

import android.app.ActivityManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Environment;
import android.text.TextUtils;


import com.cib.library.encrypt.sm4.SM4Utils;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.List;
import java.util.Map;
import java.util.Random;


/**
 * Created liudan
 * 此类主要用于一些数据的持久化到sp文件中，在存入时进行加解密的动作的一个工具类
 */

public class SPEncryptedUtils {
    public static final String SP_NAME = "agree_shell_config";
    private static SharedPreferences.Editor editor;
    private static SharedPreferences sp;
    private static SPEncryptedUtils sInstance;
    private static boolean sdCardExist = true;
    private Context mContext;
    private SM4Utils sm4Utils = new SM4Utils();
    private String secretKey = "";

    public SPEncryptedUtils(Context mContext) {
        this.mContext = mContext;
        this.sp = mContext.getSharedPreferences(SP_NAME, Context.MODE_PRIVATE);
        secretKey = sp.getString("secretkey","");
        this.editor = this.sp.edit();
    }

    public static SPEncryptedUtils getInstance(Context context) {
        sdCardExist = Environment.getExternalStorageState()
                .equals(Environment.MEDIA_MOUNTED); //判断sd卡是否存在

        if (sInstance == null) {
            sInstance = new SPEncryptedUtils(context);
        }
        return sInstance;
    }

    /**
     * 保存加密数据
     *
     * @param key
     * @param value
     */
    public int setEncryptedData(String key, String value) {
        String keyY = getRandomString(16);
        if (TextUtils.isEmpty(key) || TextUtils.isEmpty(value) || TextUtils.isEmpty(keyY)) {
            return -1;
        }
        String pKey = key + "pKey";
        String kValue = SM4Utils.SM4Encrypt(value, keyY);
        put(pKey, keyY);
        put(key, kValue);
        return 1;
    }

    /**
     * 获取解密后数据
     *
     * @param key
     * @return
     */
    public String getDecryptedData(String key) {
        String result = sp.getString(key, "");
        String sec = sp.getString(key + "pKey", "");
        if (null != sec && !sec.equals("")) {
            result = SM4Utils.SM4Decrypt(result, sec);
        }
        return result;
    }


    /**
     * 存放数据到偏好文件
     *
     * @param key    存放key
     * @param object 存放到内容
     */
    public static void put(String key, Object object) {
        if (object instanceof Integer) {
            editor.putInt(key, (Integer) object);
        } else if (object instanceof Boolean) {
            editor.putBoolean(key, (Boolean) object);
        } else if (object instanceof Float) {
            editor.putFloat(key, (Float) object);
        } else if (object instanceof Long) {
            editor.putLong(key, (Long) object);
        } else {
            editor.putString(key, (String) object);
        }
        editor.commit();
    }

    /**
     * 获取保存到偏好文件中的内容
     *
     * @param key           偏好文件的key
     * @param defaultObject 获取到的默认值
     * @return
     */
    public static Object get(String key, Object defaultObject) {
        if (defaultObject instanceof String) {
            return sp.getString(key, (String) defaultObject);
        } else if (defaultObject instanceof Integer) {
            return sp.getInt(key, (Integer) defaultObject);
        } else if (defaultObject instanceof Boolean) {
            return sp.getBoolean(key, (Boolean) defaultObject);
        } else if (defaultObject instanceof Float) {
            return sp.getFloat(key, (Float) defaultObject);
        } else if (defaultObject instanceof Long) {
            return sp.getLong(key, (Long) defaultObject);
        } else {
            return sp.getString(key, null);
        }
    }

    /**
     * 移除某个key值已经对应的值
     *
     * @param key
     */
    public static void remove(String key) {
        editor.remove(key);
        editor.commit();
    }


    /**
     * 获取未解密数据
     *
     * @param key
     * @return
     */
    public String getUnencryptedData(String key) {
        return this.sp.getString(key, "");
    }

    /**
     * 清除所有配置
     */
    public void clear() {
        this.editor.clear();
        this.editor.commit();
    }

    /**
     * 保存文件
     *
     * @param filename
     * @param base64Str base64
     * @return
     */
    public int saveFile(String filename, String base64Str) {
        if (!sdCardExist) {
            return -1;
        }
        String filePath = Environment.getExternalStorageDirectory() + "/cib/" + getAppProcessName(mContext) + "/default/";
        File fileP = new File(filePath);
        //如果文件不存在则创建
        if (!fileP.exists()){
            fileP.mkdirs();
        }
        //如果文件存在则删除
        File file = new File(filePath,filename);
        if (file.exists()){
            file.delete();
        }
        try {
             /*写入文件*/
            RandomAccessFile raf = new RandomAccessFile(file, "rwd");
            raf.seek(file.length());
            raf.write(base64Str.getBytes());
            raf.close();
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    /**
     * 获取当前应用程序的包名
     *
     * @param context 上下文对象
     * @return 返回包名
     */
    public static String getAppProcessName(Context context) {
        //当前应用pid
        int pid = android.os.Process.myPid();
        //任务管理类
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        //遍历所有应用
        List<ActivityManager.RunningAppProcessInfo> infos = manager.getRunningAppProcesses();
        for (ActivityManager.RunningAppProcessInfo info : infos) {
            if (info.pid == pid)//得到当前应用
                return info.processName;//返回包名
        }
        return "";
    }

    /**
     * type:0 返回文件路径；1 返回base64字符串
     *
     * @param filename
     * @param type
     * @return
     */
    public String readFile(String filename, int type) {
        FileInputStream in = null;
        ByteArrayOutputStream bout = null;
        String res = "";
        File f = new File(Environment.getExternalStorageDirectory() + "/cib/" + getAppProcessName(mContext) + "/default/" , filename);
        if (type == 0) {
            return f.getAbsolutePath();
        } else if (type == 1) {

            try{
                StringBuilder sBuilder = new StringBuilder();
                BufferedReader bufferedReader = new BufferedReader(new FileReader(f));
                String line = null;
                while ((line = bufferedReader.readLine()) != null) {
                    sBuilder.append(line);
                }
                bufferedReader.close();

                res = sBuilder.toString();
                return res;
            }catch(Exception e){
                e.printStackTrace();
                res = "";
            }finally {
                if (in != null){
                    try {
                        in.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return res;
    }

    /**
     *
     * 删除偏好
     *
     * */
    public int deleteDefaults(String key) {
        this.editor.remove(key);
        this.editor.remove(key + "pKey");
        this.editor.commit();
        return 1;
    }

    /*
    * 随机数生成
    */
    public static String getRandomString(int length){
        String str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random=new Random();
        StringBuffer sb=new StringBuffer();
        for(int i=0;i<length;i++){
            int number=random.nextInt(62);
            sb.append(str.charAt(number));
        }
        return sb.toString();
    }

    /**
     * 查询某个key是否存在
     */
    public static Boolean contain(String key) {
        return sp.contains(key);
    }

    /**
     * 返回所有的键值对
     */
    public static Map<String, ?> getAll() {
        return sp.getAll();
    }
}
