package com.cib.library.file;

import android.text.TextUtils;
import android.util.Log;

import com.cib.library.exception.BaseException;
import com.cib.library.exception.ExceptionCode;
import com.cib.library.exception.system.SystemException;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;

/**
 * 文件操作工具类
 *
 * @author
 * @version 1.0.0
 * @create 2019/5/24
 */
public class FileUtils {
    /**
     * 创建文件
     *
     * @param filePath 文件路径
     * @param fileName 文件名
     * @return
     */
    public static File newFile(String filePath, String fileName) {
        if (filePath == null || filePath.length() == 0
                || fileName == null || fileName.length() == 0) {
            return null;
        }
        try {
            //判断目录是否存在，如果不存在，递归创建目录
            File dir = new File(filePath);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            //组织文件路径
            StringBuilder sbFile = new StringBuilder(filePath);
            if (!filePath.endsWith("/")) {
                sbFile.append("/");
            }
            sbFile.append(fileName);

            //创建文件并返回文件对象
            File file = new File(sbFile.toString());
            if (!file.exists()) {
                file.createNewFile();
            }
            return file;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    /**
     * 创建文件
     *
     * @param parent   父文件夹
     * @param fileName 文件名
     * @return 创建之后返回的文件
     */
    public static File newFile(File parent, String fileName) throws BaseException {
        if (parent == null) {
            return null;
        }
        if (!parent.exists()) {
            parent.mkdir();
        }
        File file = new File(parent, fileName);
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
                throw new SystemException(ExceptionCode.CODE_IO, ExceptionCode.getErrorMessage(ExceptionCode.CODE_IO));
            }
        }
        return file;
    }

    /**
     * 创建文件夹
     * @param filePathDir
     * @return
     */
    public static File creatFileDir(String filePathDir) {
        File  file = new File(filePathDir);
        try {
            if (!file.exists()) {
                file.mkdirs();
            }
        } catch (Exception e) {
        }
        return file;
    }

    /**
     * 删除文件
     *
     * @param filePath
     */
    public static void removeFile(String filePath) {
        if (filePath == null || filePath.length() == 0) {
            return;
        }
        File file = new File(filePath);
        if (file.exists()) {
            removeFile(file);
        }
    }

    public static void removeFile(File file) {
        //如果是文件直接删除
        if (file.isFile()) {
            file.delete();
            return;
        }
        //如果是目录，递归判断，如果是空目录，直接删除，如果是文件，遍历删除
        if (file.isDirectory()) {
            File[] childFile = file.listFiles();
            if (childFile == null || childFile.length == 0) {
                file.delete();
                return;
            }
            for (File f : childFile) {
                removeFile(f);
            }
            file.delete();
        }
    }

    /**
     * 获取文件占用空间大小
     *
     * @param filePath
     * @return
     */
    public static float getFileSize(String filePath) {
        if (filePath == null || filePath.length() == 0) {
            return 0;
        }
        File file = new File(filePath);
        if (file.exists()) {
            return getSize(file);
        }
        return 0;
    }

    private static float getSize(File file) {
        float size = 0;
        try {
            //如果是目录则递归计算其内容的总大小
            if (file.isDirectory()) {
                File[] children = file.listFiles();
                for (File f : children) {
                    size += getSize(f);
                }
                return size;
            }
            //如果是文件则直接返回其大小
            else {
                return (float) file.length();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return size;
    }

    /**
     * 文件拷贝
     *
     * @param filePath
     * @param newDirPath
     */
    public static void copyFile(String filePath, String newDirPath) throws BaseException {
        if (filePath == null || filePath.length() == 0) {
            return;
        }
        File file = new File(filePath);
        if (!file.exists()) {
            return;
        }
        //判断目录是否存在，如果不存在，则创建
        File newDir = new File(newDirPath);
        if (!newDir.exists()) {
            newDir.mkdirs();
        }
        try {
            //创建目标文件
            File newFile = newFile(newDirPath, file.getName());
            InputStream is = new FileInputStream(file);
            FileOutputStream fos = new FileOutputStream(newFile);
            byte[] buffer = new byte[4096];
            int byteCount = 0;
            while ((byteCount = is.read(buffer)) != -1) {
                fos.write(buffer, 0, byteCount);
            }
            fos.flush();
            is.close();
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException(ExceptionCode.CODE_IO,
                    ExceptionCode.getErrorMessage(ExceptionCode.CODE_IO));
        }

    }

    /**
     * 目录拷贝
     *
     * @param dirPath
     * @param newDirPath
     */

    public static void copyDir(String dirPath, String newDirPath) throws BaseException {
        if (TextUtils.isEmpty(dirPath) || TextUtils.isEmpty(newDirPath)) {
            return;
        }
        try {
            File file = new File(dirPath);
            if (!file.exists() && !file.isDirectory()) {
                return;
            }
            File[] childFile = file.listFiles();
            if (childFile == null || childFile.length == 0) {
                return;
            }
            File newFile = new File(newDirPath);
            newFile.mkdirs();
            for (File fileTemp : childFile) {
                if (fileTemp.isDirectory()) {
                    copyDir(fileTemp.getPath(), newDirPath + File.separator + fileTemp.getName());
                } else {
                    copyFile(fileTemp.getPath(), newDirPath);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException(ExceptionCode.CODE_IO,
                    ExceptionCode.getErrorMessage(ExceptionCode.CODE_IO));
        }

    }

    /**
     * 把当前文件移动到一个新到目录
     *
     * @param filePath
     * @param newDirPath
     */
    public static void moveFile(String filePath, String newDirPath) throws BaseException {
        if (TextUtils.isEmpty(filePath) || TextUtils.isEmpty(newDirPath)) {
            return;
        }
        try {
            //拷贝文件
            copyFile(filePath, newDirPath);
            //删除原文件
            removeFile(filePath);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException(ExceptionCode.CODE_IO,
                    ExceptionCode.getErrorMessage(ExceptionCode.CODE_IO));
        }

    }

    /**
     * 移动文件夹
     *
     * @param dirPath
     * @param newDirPath
     */
    public static void moveDir(String dirPath, String newDirPath) throws BaseException {
        if (TextUtils.isEmpty(newDirPath) || TextUtils.isEmpty(newDirPath)) {
            return;
        }
        try {
            //拷贝目录
            copyDir(dirPath, newDirPath);
            //删除目录
            removeFile(dirPath);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException(ExceptionCode.CODE_IO,
                    ExceptionCode.getErrorMessage(ExceptionCode.CODE_IO));
        }

    }


    public static void mkdirs(File parentFile) {
        if (parentFile == null && parentFile.exists()) {
            return;
        }
        parentFile.mkdir();
    }

    /**
     * 解压缩含有文件夹的压缩文件
     *
     * @throws ZipException
     * @throws IOException
     */
    public static Boolean upZipFile(String zipFileString, String folderPath) throws ZipException, IOException {
        boolean isok=false;
        File desDir = new File(folderPath);
        if (!desDir.exists()) {
            // 创建目标目录
            desDir.mkdirs();
        }
        File zipFile = new File(zipFileString);
        if (!zipFile.exists()) {
            isok=false;
        }

        ZipFile zf = new ZipFile(zipFile);
        for (Enumeration<?> entries = zf.entries(); entries.hasMoreElements(); ) {
            ZipEntry entry = ((ZipEntry) entries.nextElement());
            if (entry.isDirectory()) {
                String tmpStr = folderPath + File.separator + entry.getName();
                tmpStr = new String(tmpStr.getBytes("8859_1"), "GB2312");
                File folder = new File(tmpStr);
                folder.mkdirs();
            } else {
                InputStream is = zf.getInputStream(entry);
                String str = folderPath  + entry.getName();
                // 转换编码，避免中文时乱码
                str = new String(str.getBytes("8859_1"), "GB2312");
                File desFile = new File(str);
                if (desFile.exists()){
                    desFile.delete();
                }
                desFile.createNewFile();
                OutputStream os = new FileOutputStream(desFile);
                byte[] buffer = new byte[1024];
                int realLength;
                while ((realLength = is.read(buffer)) > 0) {
                    os.write(buffer, 0, realLength);
                    os.flush();
                }
                is.close();
                os.close();
                isok=true;
            }
        }
        zf.close();
        return isok;
    }

    /**
     * 根据文件路径获取md5
     * @param path
     * @return
     */
    public static String getMD5(String path) {
        BigInteger bi = null;
        try {
            byte[] buffer = new byte[8192];
            int len = 0;
            MessageDigest md = MessageDigest.getInstance("MD5");
            File f = new File(path);
            FileInputStream fis = new FileInputStream(f);
            while ((len = fis.read(buffer)) != -1) {
                md.update(buffer, 0, len);
            }
            fis.close();
            byte[] b = md.digest();
            bi = new BigInteger(1, b);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bi.toString(16);
    }

    public static String getTypeFromMime(String str){
        String type="-1";
        str=str.toLowerCase();
        for(int i=0;i<MIME_MapTable.length;i++){ //MIME_MapTable??在这里你一定有疑问，这个MIME_MapTable是什么？
            if(str.startsWith(MIME_MapTable[i][1]))
                type = MIME_MapTable[i][0];
        }
        return type;
    }

    public static String getMimeFromType(File file){
        String type="*/*";
        String fName = file.getName();
        //获取后缀名前的分隔符"."在fName中的位置。
        int dotIndex = fName.lastIndexOf(".");
        if(dotIndex < 0){
            return type;
        }
        /* 获取文件的后缀名 */
        String end=fName.substring(dotIndex,fName.length()).toLowerCase();
        if(end=="")return type;
        //在MIME和文件类型的匹配表中找到对应的MIME类型。
        for(int i=0;i<MIME_MapTable.length;i++){ //MIME_MapTable??在这里你一定有疑问，这个MIME_MapTable是什么？
            if(end.equals(MIME_MapTable[i][0]))
                type = MIME_MapTable[i][1];
        }
        return type;
    }

    public static String getFileTypeFromFilename(String paramString) {
        String str = "";
        if (TextUtils.isEmpty(paramString)) {
            return str;
        }
        int i = paramString.lastIndexOf('.');
        if (i <= -1) {
            return str;
        }

        str = paramString.substring(i + 1);
        return str;
    }


    private static final String[][] MIME_MapTable={
            //{后缀名， MIME类型}
            {".3gp",    "video/3gpp"},
            {".apk",    "application/vnd.android.package-archive"},
            {".asf",    "video/x-ms-asf"},
            {".avi",    "video/x-msvideo"},
            {".bin",    "application/octet-stream"},
            {".bmp",    "image/bmp"},
            {".c",  "text/plain"},
            {".class",  "application/octet-stream"},
            {".conf",   "text/plain"},
            {".cpp",    "text/plain"},
            {".doc",    "application/msword"},
            {".docx",   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
            {".xls",    "application/vnd.ms-excel"},
            {".xlsx",   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
            {".exe",    "application/octet-stream"},
            {".gif",    "image/gif"},
            {".gtar",   "application/x-gtar"},
            {".gz", "application/x-gzip"},
            {".h",  "text/plain"},
            {".htm",    "text/html"},
            {".html",   "text/html"},
            {".jar",    "application/java-archive"},
            {".java",   "text/plain"},
            {".jpeg",   "image/jpeg"},
            {".jpg",    "image/jpeg"},
            {".js", "application/x-javascript"},
            {".log",    "text/plain"},
            {".amr",    "audio/amr"},
            {".m3u",    "audio/x-mpegurl"},
            {".m4a",    "audio/mp4a-latm"},
            {".m4b",    "audio/mp4a-latm"},
            {".m4p",    "audio/mp4a-latm"},
            {".m4u",    "video/vnd.mpegurl"},
            {".m4v",    "video/x-m4v"},
            {".mov",    "video/quicktime"},
            {".mp2",    "audio/x-mpeg"},
            {".mp3",    "audio/x-mpeg"},
            {".mp4",    "video/mp4"},
            {".mpc",    "application/vnd.mpohun.certificate"},
            {".mpe",    "video/mpeg"},
            {".mpeg",   "video/mpeg"},
            {".mpg",    "video/mpeg"},
            {".mpg4",   "video/mp4"},
            {".mpga",   "audio/mpeg"},
            {".msg",    "application/vnd.ms-outlook"},
            {".ogg",    "audio/ogg"},
            {".pdf",    "application/pdf"},
            {".png",    "image/png"},
            {".pps",    "application/vnd.ms-powerpoint"},
            {".ppt",    "application/vnd.ms-powerpoint"},
            {".pptx",   "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
            {".prop",   "text/plain"},
            {".rc", "text/plain"},
            {".rmvb",   "audio/x-pn-realaudio"},
            {".rtf",    "application/rtf"},
            {".sh", "text/plain"},
            {".tar",    "application/x-tar"},
            {".tgz",    "application/x-compressed"},
            {".txt",    "text/plain"},
            {".wav",    "audio/x-wav"},
            {".wma",    "audio/x-ms-wma"},
            {".wmv",    "audio/x-ms-wmv"},
            {".wps",    "application/vnd.ms-works"},
            {".xml",    "text/plain"},
            {".z",  "application/x-compress"},
            {".zip",    "application/x-zip-compressed"},
            {"",        "*/*"}
    };
}
