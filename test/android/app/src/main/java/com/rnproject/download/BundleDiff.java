package com.rnproject.download;

import android.content.Context;
import android.util.Log;

import com.rnproject.base.Const;
import com.rnproject.diff.diff_match_patch;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.Writer;
import java.util.LinkedList;

/**
 * Created by nicolaszhang on 2018/7/13.
 * 合并bundle文件
 */

public class BundleDiff {
    private static final String TAG = "BundleDiff";

    //读取assect中的bundle内容
    public static String getJsBundleFromAssets(Context context) {
        String result = "";
        try {
            InputStream is = context.getAssets().open("reactnative/" + Const.JS_BUNDLE_LOCAL_FILE);
            int size = is.available();

            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();

            result = new String(buffer, "UTF-8");

            Log.i(TAG, "get JS_BUNDLE_LOCAL_FILE success!!!");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    //读取下载的bundle差量文件的pat文件内容
    public static String getStringFromText(String path) {
        String result = "";
        try {
            Reader reader = new FileReader(path);
            int ch = reader.read();
            StringBuffer sb = new StringBuffer();
            while (ch != -1) {
                sb.append((char) ch);
                ch = reader.read();
            }
            reader.close();
            result = sb.toString();

            Log.i(TAG, "get JS_BUNDLE_LOCAL_FILE success!!!" + path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    public boolean onJSBundleLoadedFromServer(String pathesStr, String bundlestr) {
        //使用Google的diff类进行一个合并
        diff_match_patch dmp = new diff_match_patch();
        LinkedList<diff_match_patch.Patch> pathes = (LinkedList<diff_match_patch.Patch>) dmp.patch_fromText(pathesStr);
        if (!"".equals(bundlestr) && !"".equals(pathesStr)) {
            Object[] bundle2 = dmp.patch_apply(pathes, bundlestr);
            try {
                File dir = new File(Const.JS_PATCH_LOCAL_PATH);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                //合并完之后的bundle文件写入到一个位置
                Writer w = new FileWriter(Const.JS_BUNDLE_LOCAL_PATH);
                String newJsBundle = (String) bundle2[0];
                w.write(newJsBundle);
                w.close();
                return true;
            } catch (Exception e) {
                e.getMessage();
                return false;
            }
        }
        return true;
    }
}
