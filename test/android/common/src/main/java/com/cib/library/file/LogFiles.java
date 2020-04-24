package com.cib.library.file;

import android.content.Context;
import android.os.Environment;
import android.util.Log;

import com.facebook.react.bridge.ReadableMap;

import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Created by fgq on 2018/08/13.
 */
public class LogFiles {
    public static final String TYPE_JS="JS";
    public static final String TYPE_ANDROID="Android";
    private static final String JiZuoPackageName="com.rnproject";

    public static String logsJSAddress(Context mcontext){
        return Environment.getExternalStorageDirectory()+ File.separator+mcontext.getPackageName()+File.separator+"logs"+File.separator+"logJS"+File.separator;
    }

    public static String logsCacheAddress(Context mcontext){
        return Environment.getExternalStorageDirectory()+ File.separator+mcontext.getPackageName()+File.separator+"logs"+File.separator+"logNative"+File.separator;
    }

    public static String ceratTxtFileName(){
        return new SimpleDateFormat("yyyy-MM-dd").format(new Date()) + ".txt";
    }




    public static  String getCurrentTime(){
        String currentTime=new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()).toString();
        return currentTime;
    }

    /**
     * 获取该文件目录下的文件名称集合
     * @param path
     * @return
     */
    public static List<String> getFilesAllName(String path) {
        File file=new File(path);
        File[] files=file.listFiles();
        if (files == null){Log.e("error","空目录");return null;}
        List<String> s = new ArrayList<>();
        for(int i =0;i<files.length;i++){
            s.add(files[i].getName());
        }
        return s;
    }

    /**
     * 获取该文件目录下的文件名称,完整路径
     * @param path
     * @return
     */
    public static List<String> getAllName(String path) {
        File file=new File(path);
        File[] files=file.listFiles();
        if (files == null){Log.e("error","空目录");return null;}
        List<String> s = new ArrayList<>();
        for(int i =0;i<files.length;i++){
            s.add(files[i].getAbsolutePath());
        }
        return s;
    }

    //创建文件夹
    public static File creatFileDir(String filePathDir) {
        File file = new File(filePathDir);
        try {
            if (!file.exists()) {
                file.mkdirs();
            }
        } catch (Exception e) {
            Log.i("error:", e+"");
        }
        return file;
    }


    // 生成文件
    public static File makeFilePath(String filePath, String fileName) {
        File file = new File(filePath);
        try {
            if (!file.exists()) {
                file.mkdirs();
            }
        } catch (Exception e) {
            Log.i("error:", e+"");
        }
        try {
            file = new File(filePath + fileName);
            if (!file.exists()) {
                file.createNewFile();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return file;
    }

    //删除整个文件夹方法
    public static boolean deleteSDFile(File file) {
        //file目标文件夹绝对路径
        if (file.exists()) { //指定文件是否存在
            if (file.isFile()) { //该路径名表示的文件是否是一个标准文件
                file.delete(); //删除该文件
            } else if (file.isDirectory()) { //该路径名表示的文件是否是一个目录（文件夹）
                File[] files = file.listFiles(); //列出当前文件夹下的所有文件
                for (File f : files) {
                    deleteSDFile(f); //递归删除
                    //Log.d("fileName", f.getName()); //打印文件名
                }
            }
            file.delete(); //删除文件夹（song,art,lyric）
        }
        return true;
    }

    public static boolean writeTxtToFile(Context mContext,String type,String moduleName,String methodName,String exception) {
        String time=getCurrentTime();
        //日志详情内容
        String strcontent="CIB_LOG "+time+"["+type+"]"+"["+exception+"]";

        List<String> fileNameList=null;//日志的类型的文件夹内部的文件集合
        String finalDir="";            //日志的类型的文件夹地址
        if (type.equals(TYPE_ANDROID)){
            fileNameList= getFilesAllName(logsCacheAddress(mContext));
            finalDir=logsCacheAddress(mContext);
        }else {
            fileNameList= getFilesAllName(logsJSAddress(mContext));
            finalDir=logsJSAddress(mContext);
        }

        //当前txt文件的名称
        String currentTimeTxtName=new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString()+".txt";
        String finalTxtName="";

        if (null == fileNameList|| fileNameList.isEmpty()){
            //不存在文件，直接创建新的文件
            finalTxtName=currentTimeTxtName;
            makeFilePath(finalDir, finalTxtName);
        }else {
            int size=fileNameList.size();
            //存在当天的日志文件
            if (fileNameList.contains(currentTimeTxtName)){
                finalTxtName=currentTimeTxtName;
            }else {
                if (size==3){
                    //只能存在三个,删除第一个，然后新建文件
                    //获取最前面的日期的文件
                    List<String> stringList=new ArrayList<>();
                    for (String s : fileNameList) {
                      String str=  s.substring(0,10).replace("-","");
                      stringList.add(str);
                    }
                    String min= Collections.min(stringList);
                    String realminstr=min.substring(0,4)+"-"+min.substring(4,6)+"-"+min.substring(6,8);

                    //删除最小的文件
                    File file=new File(finalDir,realminstr+".txt");
                    if (file.exists())  file.delete();
                }
                //只要不存在都需要创建
                finalTxtName=currentTimeTxtName;
                makeFilePath(finalDir, finalTxtName);
            }
        }

        // 每次写入时，都换行写
        String strContent = strcontent + "\r\n";
        try {
            File file = new File(finalDir+finalTxtName);
            if (!file.exists()) {
                return false;
            }
            RandomAccessFile raf = new RandomAccessFile(file, "rwd");
            raf.seek(file.length());
            raf.write(strContent.getBytes());
            raf.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean LogsToFile(Context mContext,String type,String moduleName,Object methodName) {
       String packageName= mContext.getPackageName();
        //壳子不需要打印和保存
        if (!JiZuoPackageName.equals(packageName)) {
            return true;
        }
        String time=new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()).toString();

        //运行日志详情内容
        String runningcontent="CIB_LOG "+time+"["+type+"]"+"["+moduleName+"]"+"["+methodName+"]";

        List<String> fileNameList=null;//日志的类型的文件夹内部的文件集合
        String finalDir="";            //日志的类型的文件夹地址
        if (type.equals(TYPE_ANDROID)){
            fileNameList= getFilesAllName(logsCacheAddress(mContext));
            finalDir=logsCacheAddress(mContext);
        }else {
            fileNameList= getFilesAllName(logsJSAddress(mContext));
            finalDir=logsJSAddress(mContext);
        }

        //当前txt文件的名称
        String currentTimeTxtName=new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString()+".txt";
        String finalTxtName="";

        if (null == fileNameList|| fileNameList.isEmpty()){
            //不存在文件，直接创建新的文件
            finalTxtName=currentTimeTxtName;
            makeFilePath(finalDir, finalTxtName);
        }else {
            int size=fileNameList.size();
            //存在当天的日志文件
            if (fileNameList.contains(currentTimeTxtName)){
                finalTxtName=currentTimeTxtName;
            }else {
                if (size==3){
                    //只能存在三个,删除第一个，然后新建文件
                    //获取最前面的日期的文件
                    List<String> stringList=new ArrayList<>();
                    for (String s : fileNameList) {
                        String str=  s.substring(0,10).replace("-","");
                        stringList.add(str);
                    }
                    String min= Collections.min(stringList);
                    String realminstr=min.substring(0,4)+"-"+min.substring(4,6)+"-"+min.substring(6,8);

                    //删除最小的文件
                    File file=new File(finalDir,realminstr+".txt");
                    if (file.exists())  file.delete();
                }
                //只要不存在都需要创建
                finalTxtName=currentTimeTxtName;
                makeFilePath(finalDir, finalTxtName);
            }
        }

        // 每次写入时，都换行写
        String strContent = runningcontent + "\r\n";
        Log.i("运行日志",strContent);
        try {
            File file = new File(finalDir+finalTxtName);
            if (!file.exists()) {
                return false;
            }
            RandomAccessFile raf = new RandomAccessFile(file, "rwd");
            raf.seek(file.length());
            raf.write(strContent.getBytes());
            raf.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public static String mapToString(ReadableMap map){
        return mapToString2(map.toHashMap());
    }

    public static String mapToString2(HashMap<String,Object> map){
        StringBuilder builder = new StringBuilder();
        for (HashMap.Entry<String, Object> entry : map.entrySet()) {
            builder.append(entry.getKey() + ":"+ entry.getValue() + ",");
        }
        return builder.deleteCharAt(builder.toString().length()-1).toString();
    }

    public static String ObjectToString(Object object){
        return  object.toString().replaceAll("\\\\","");
    }
}
