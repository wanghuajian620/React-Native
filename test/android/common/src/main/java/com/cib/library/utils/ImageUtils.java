package com.cib.library.utils;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.media.ThumbnailUtils;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;


import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by liujun002 on 2018/4/3.
 */

public class ImageUtils {
    /**
     * 获取图片路径
     * @param imagePath
     * @param mContext
     * @return
     */
    public  static String getImagePath(String imagePath, Context mContext){
       Bitmap bitmap =  BitmapFactory.decodeFile(imagePath);
        // 首先保存图片
        File appDir = new File(Environment.getExternalStorageDirectory(), "agree/");

        if (!appDir.exists()) {

            String tmpPath = "agree/";

            /*创建文件夹路径*/
            String creatFilePath=tmpPath.substring(0,tmpPath.lastIndexOf("/"));
                 /*字符串转换成数组*/
            String[] folder = creatFilePath.split("/");
                /*创建多级文件夹*/
            ToolClass.crSDFile(folder);
        }

        String fileName = imagePath.substring(imagePath.lastIndexOf("/") + 1);

        File file = new File(appDir, fileName);
        try {
            FileOutputStream fos = new FileOutputStream(file);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
            fos.flush();
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
//        fileName = "defaults://"+fileName;
//        return fileName;
        return file.getPath();
    }
    /*创建图片路径
      * @param baos 图片
      * @param imagePath 图片路径
      * @param mContext 上下文
      * @return 返回创建图片路径地址
    */
    public  static String getImagePath(String imagePath, ByteArrayOutputStream baos, Context mContext){
        // 首先保存图片保存到data/包名/files/
        File appDir = new File(mContext.getFilesDir().getAbsolutePath());
        String fileName = imagePath.substring(imagePath.lastIndexOf("/") + 1);

        File file = new File(appDir, fileName);
        try {
            FileOutputStream fos = new FileOutputStream(file);//将压缩后的图片保存的本地上指定路径中
            fos.write(baos.toByteArray());
            fos.flush();
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file.getPath();
    }


    /**
     * 获取图片缩略图
     * @param imagePath:文件路径
     * @param width:缩略图宽度
     * @param height:缩略图高度
     * @return
     */
    @TargetApi(Build.VERSION_CODES.FROYO)
    public static String getImageThumbnail(String imagePath, int width, int height,Context mContext) {
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true; //关于inJustDecodeBounds的作用将在下文叙述
        Bitmap bitmap = BitmapFactory.decodeFile(imagePath, options);
        int h = options.outHeight;//获取图片高度
        int w = options.outWidth;//获取图片宽度
        int scaleWidth = w / width; //计算宽度缩放比
        int scaleHeight = h / height; //计算高度缩放比
        int scale = 1;//初始缩放比
        if (scaleWidth < scaleHeight) {//选择合适的缩放比
            scale = scaleWidth;
        } else {
            scale = scaleHeight;
        }
        if (scale <= 0) {//判断缩放比是否符合条件
            scale = 1;
        }
        options.inSampleSize = scale;
        // 重新读入图片，读取缩放后的bitmap，注意这次要把inJustDecodeBounds 设为 false
        options.inJustDecodeBounds = false;
        bitmap = BitmapFactory.decodeFile(imagePath, options);
        // 利用ThumbnailUtils来创建缩略图，这里要指定要缩放哪个Bitmap对象
        bitmap = ThumbnailUtils.extractThumbnail(bitmap, width, height,ThumbnailUtils.OPTIONS_RECYCLE_INPUT);

        File file = saveBitmap(bitmap, mContext);
        return file.getPath();
    }

    //保存图片
    public static File saveBitmap(Bitmap bitmap, Context mContext) {
        String timeStamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".png";
        File file = new File(mContext.getCacheDir(),timeStamp);
        try {
            FileOutputStream fos = new FileOutputStream(file);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
            fos.flush();
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }


    public static int[] getImageWidthHeight(String path){
        BitmapFactory.Options options = new BitmapFactory.Options();

        /**
         * 最关键在此，把options.inJustDecodeBounds = true;
         * 这里再decodeFile()，返回的bitmap为空，但此时调用options.outHeight时，已经包含了图片的高了
         */
        options.inJustDecodeBounds = true;
        Bitmap bitmap = BitmapFactory.decodeFile(path, options); // 此时返回的bitmap为null
        /**
         *options.outHeight为原始图片的高
         */
        return new int[]{options.outWidth,options.outHeight};
    }


    /**
     * 获取视频缩略图
     * @param videoPath:文件路径
     * @param width:缩略图宽度
     * @param height:缩略图高度
     * @return
     */
    public static Bitmap getVideoThumbnail(String videoPath,int width,int height) {
        Bitmap bitmap =null;
        bitmap = ThumbnailUtils.createVideoThumbnail(videoPath, MediaStore.Images.Thumbnails.MICRO_KIND);
        bitmap = ThumbnailUtils.extractThumbnail(bitmap, width, height, ThumbnailUtils.OPTIONS_RECYCLE_INPUT);
        return bitmap;
    }

    //保存图片
    public static File saveBitmap(String name,Bitmap bitmap, Context mContext) {
        String timeStamp = name+"_"+new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".png";
        File file = new File(mContext.getCacheDir(),timeStamp);
        try {
            FileOutputStream fos = new FileOutputStream(file);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
            fos.flush();
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }
    /**
     * 剪切
     * @param uri
     * @param fileclip
     * @return
     */
    public static Intent photoClip(Uri uri,File fileclip) {
        try{
            if(fileclip.exists()){
                fileclip.delete();
            }
            fileclip.createNewFile();
        }catch(IOException e){
            e.printStackTrace();
        }

        // 调用系统中自带的图片剪裁
        Intent intent = new Intent("com.android.camera.action.CROP");
        intent.setDataAndType(uri, "image/*");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION); //添加这一句表示对目标应用临时授权该Uri所代表的文件
            intent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
        }
        // 下面这个crop=true是设置在开启的Intent中设置显示的VIEW可裁剪
        intent.putExtra("crop", "true");
        // aspectX aspectY 是宽高的比例
        intent.putExtra("aspectX", 1);
        intent.putExtra("aspectY", 1);
        // outputX outputY 是裁剪图片宽高
        intent.putExtra("outputX", 800);
        intent.putExtra("outputY", 800);
        intent.putExtra("return-data", false);
        intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(fileclip));
        intent.putExtra("outputFormat", Bitmap.CompressFormat.JPEG.toString());
        intent.putExtra("noFaceDetection", true); // no face detection

        return  intent;

    }

    /**
     * 获取图片的旋转角度然后转化为bitmap
     * @param path
     * @param targetW
     * @param targetH
     * @return
     */
    public static Bitmap getPortraitBitmap(String path, int targetW, int targetH) {
        Bitmap result = null;
        ExifInterface ei;
        try {
            ei = new ExifInterface(path);
            Bitmap bitmap;
            if (targetW > 0 && targetH > 0) {
                bitmap = getScaledBitmap(path, targetW, targetH);
            } else {
                bitmap = BitmapFactory.decodeFile(path);
            }
            result = bitmap;
            int orientation = ei.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_UNDEFINED);
            switch (orientation) {
                case ExifInterface.ORIENTATION_ROTATE_90:
                    result = rotateImage(bitmap, 90);
                    break;
                case ExifInterface.ORIENTATION_ROTATE_180:
                    result = rotateImage(bitmap, 180);
                    break;
                case ExifInterface.ORIENTATION_ROTATE_270:
                    result = rotateImage(bitmap, 270);
                    break;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static Bitmap getScaledBitmap(String filePath, int targetW, int targetH) {
        BitmapFactory.Options bmOptions = new BitmapFactory.Options();
        bmOptions.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(filePath, bmOptions);
        int photoW = bmOptions.outWidth;
        int photoH = bmOptions.outHeight;
        int scaleFactor = Math.min(photoW / targetW, photoH / targetH);
        bmOptions.inJustDecodeBounds = false;
        bmOptions.inSampleSize = scaleFactor;
        return BitmapFactory.decodeFile(filePath, bmOptions);
    }

    public static Bitmap rotateImage(Bitmap source, float angle) {
        Bitmap retVal;
        Matrix matrix = new Matrix();
        matrix.postRotate(angle);
        retVal = Bitmap.createBitmap(source, 0, 0, source.getWidth(), source.getHeight(), matrix, true);
        return retVal;
    }

}
