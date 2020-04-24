package com.cib.library.utils;

import android.app.ActivityManager;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Rect;
import android.os.Environment;
import android.util.Base64;
import android.util.Log;

import com.cib.library.BaseConstant;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by liujun002 on 2019/7/1.
 */

public class ToolClass {
        private static byte[] result;
        /**
         * 保存图片到相册
         * @param context  上下文
         * @param bmp 保存的图片
         */
        public static String saveImage(Context context, Bitmap bmp) {
            File appDir = new File(Environment.getExternalStorageDirectory(), "cib/"+getAppProcessName(context) + "/default/");

            if (!appDir.exists()) {

                String tmpPath = "cib/"+ getAppProcessName(context) + "/default/";

                /*创建文件夹路径*/
                String creatFilePath=tmpPath.substring(0,tmpPath.lastIndexOf("/"));
                 /*字符串转换成数组*/
                String[] folder = creatFilePath.split("/");
                /*创建多级文件夹*/
                crSDFile(folder);
            }
            String fileName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())+ ".jpg";
            File file = new File(appDir, fileName);
            try {
                FileOutputStream fos = new FileOutputStream(file);
                bmp.compress(Bitmap.CompressFormat.JPEG, 100, fos);
                fos.flush();
                fos.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return file.toString();
        }

    /**
     * 创建保存得到的图片的文件
     *
     * @return
     * @throws IOException
     */
    public static String createImageFile() throws IOException {
        String imagePath = null;
        File mediaStorageDir = new File(Environment.getExternalStorageDirectory(), "camera_photos");
        if (!mediaStorageDir.exists()) {
            mediaStorageDir.mkdirs();
        }
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

        String suffix = ".jpg";
        imagePath= mediaStorageDir + File.separator + timeStamp + suffix;
        return imagePath;

    }
    public static byte[] bitmapToByte(Bitmap bitmap, final boolean needRecycle) {
        ByteArrayOutputStream bos = null;
        try {
            if (bitmap == null) {
                return null;
            }
            bos = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, bos);
            return bos.toByteArray();

        } catch (Exception e) {
            return null;
        } catch (OutOfMemoryError e) {
            return null;
        } finally {
            try {
                if (bos != null)
                    bos.close();
            } catch (IOException e) {
                return null;
            }
        }
    }

    // 需要对图片进行处理，否则微信会在log中输出thumbData检查错误
        public static byte[] getBitmapBytes(Bitmap bitmap, boolean paramBoolean) {

            if(bitmap == null){
                return null;
            }
            Bitmap localBitmap = Bitmap.createBitmap(80, 80, Bitmap.Config.RGB_565);
            Canvas localCanvas = new Canvas(localBitmap);
            int i;
            int j;
            if (bitmap.getHeight() > bitmap.getWidth()) {
                i = bitmap.getWidth();
                j = bitmap.getWidth();
            } else {
                i = bitmap.getHeight();
                j = bitmap.getHeight();
            }
            while (true) {
                localCanvas.drawBitmap(bitmap, new Rect(0, 0, i, j), new Rect(0, 0,80, 80), null);
                if (paramBoolean) {
                    bitmap.recycle();
                }
                ByteArrayOutputStream localByteArrayOutputStream = new ByteArrayOutputStream();
                localBitmap.compress(Bitmap.CompressFormat.JPEG, 100,
                        localByteArrayOutputStream);
                localBitmap.recycle();
                byte[] arrayOfByte = localByteArrayOutputStream.toByteArray();
                try {
                    localByteArrayOutputStream.close();
                    return arrayOfByte;
                } catch (Exception e) {
                }
                i = bitmap.getHeight();
                j = bitmap.getHeight();
            }
        }

        /**
         * 根据当前数组路径创建多级文件夹
         *
         * @param folder 创建文件路径截取数组
         * @return 返回包名
         */
        public static File crSDFile(String... folder) {
            int length = folder.length;
            File file = null;
            String sdPath = Environment.getExternalStorageDirectory().toString();
            String str = sdPath;
            for (int i = 0; i < length; i++) {
                str = str+"/"+folder[i];
                file = new File(str);
                if (!file.exists()) {
                    file.mkdir();
                }

            }
            return file;
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
     * base64转为bitmap
     *
     * @param url
     * @return
     */
    public static Bitmap stringtoBitmap(String url) {
        // 将字符串转换成Bitmap类型
        Bitmap bitmap = null;
        try {
            byte[] bitmapArray;
            bitmapArray = Base64.decode(url, Base64.DEFAULT);
            bitmap = BitmapFactory.decodeByteArray(bitmapArray, 0,
                    bitmapArray.length);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return bitmap;
    }

    /**
     * 读取文件路径并组合五种路径
     * @param mContext 上下文
     * @param filePath 文件路径
     */
    public static String Read_FilePath_Format(Context mContext,String filePath) {
        String FilePath = null;
        if (filePath.startsWith("project://")) {
            FilePath = mContext.getCacheDir() + "/" + BaseConstant.project_address + filePath.substring(filePath.indexOf("//") + 2);
        } else if (filePath.startsWith("home://")) {
            FilePath = getAppProcessName(mContext) + "/" + BaseConstant.home_address + filePath.substring(filePath.indexOf("//") + 2);
        } else if (filePath.startsWith("defaults://") || filePath.startsWith("document://")) {
            FilePath = getAppProcessName(mContext) + "/" + BaseConstant.defaults_address + filePath.substring(filePath.indexOf("//") + 2);
        } else if (filePath.startsWith("caches://")) {
            FilePath = getAppProcessName(mContext) + "/" + BaseConstant.caches_address + filePath.substring(filePath.indexOf("//") + 2);
        } else if (filePath.startsWith("temp://")) {
            FilePath = getAppProcessName(mContext) + "/" + BaseConstant.temp_address + filePath.substring(filePath.indexOf("//") + 2);
        }else {
            FilePath = "";
        }
        return FilePath;
    }

    /**
     * 公共文件路径检测方法
     *
     * @param srcPath
     */
    public static String Method(Context context, String srcPath){
        String path = "";
        if(srcPath.startsWith("/storage/emulated")){
            path = srcPath;
        }
        if(srcPath.startsWith("file://")){
            path = srcPath.substring(7);
        }
        if(!ToolClass.Read_FilePath_Format(context,srcPath).equals("")){
            path = BaseConstant.SdPath +ToolClass.Read_FilePath_Format(context,srcPath);

        }
        return path;
    }

    /**
     * 公共路径截取方法

     * @param desPath
     * @return
     */
    public static String InterceptPath(String desPath) {
        String sdPath = Environment.getExternalStorageDirectory().getAbsolutePath();
        if(!sdPath.endsWith("/")){
            sdPath = sdPath + "/";
        }
        desPath = desPath.substring(sdPath.length());
        return desPath;
    }
}
