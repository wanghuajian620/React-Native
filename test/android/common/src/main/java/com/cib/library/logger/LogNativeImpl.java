package com.cib.library.logger;

import android.util.Log;

import com.cib.library.utils.AndroidDeviceUtil;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;

/**
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/5/24
 * @description: 日志打印的具体实现
 */
public class LogNativeImpl {

    private static final String D = "DEBUG";
    private static final String I = "INFO";
    private static final String W = "WARNING";
    private static final String E = "ERROR";
    private final File nativeLogDir;
    private final LoggerConfig config;
    /**
     * 级别,高于次级别的日志都会被打印
     */
    private int mLevel = LogConstant.DEBUG;
    /**
     * 日志开关是否打开
     */
    private boolean isOpen = true;
    /**
     * 是否写入文件
     */
    private boolean isWriteFile;

    /**
     * 构造方法
     */
    public LogNativeImpl() {
        config = new LoggerConfig();
        //先创建文件夹 默认存储在 包名 + log 目录下
        File dir = new File(AndroidDeviceUtil.getExternalDataPath() + File.separator + config.getLogDir());
        if (!dir.exists()) {
            dir.mkdirs();
        }
        nativeLogDir = new File(dir, config.getNativeLogDir());
        if (!nativeLogDir.exists()) {
            nativeLogDir.mkdir();
        }

    }


    private String getFormatedLogFile() {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sf.format(new Date());
        return time + ".log";
    }

    /**
     * 打印日志
     *
     * @param level
     * @param tag
     * @param msg
     * @return
     */
    public int print(int level, String tag, String msg) {

        //如果是非调试状态，直接不打印，返回
        if (!isOpen) {
            return 0;
        }

        //大于等于该级别才会打印
        if (level >= mLevel) {
            if (isWriteFile) {
                //打印到文件 只有设置了为true才会打印到文件
                printToFile(level, tag, msg);
            }
            //打印到控制台
            printToConsole(level, tag, msg);
        }
        return 0;
    }

    /**
     * 打印到日志文件中
     *
     * @param level
     * @param tag
     * @param msg
     */
    private void printToFile(int level, String tag, String msg) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = sf.format(new Date());
        String preTAG = D;
        switch (level) {
            case LogConstant.DEBUG:
                preTAG = D;
                break;
            case LogConstant.INFO:
                preTAG = I;
                break;
            case LogConstant.WARN:
                preTAG = W;
                break;
            case LogConstant.ERROR:
                preTAG = E;
                break;
            default:
                break;
        }
        String message = time + "[Android]"
                + "[" + tag + "]" + "[" + preTAG + "]" + "[" + msg + "]";
        printMessage(message);
    }

    /**
     * 控制台中打印
     *
     * @param level
     * @param tag
     * @param msg
     */
    private int printToConsole(int level, String tag, String msg) {

        //直接根据级别调用android原生的打印
        switch (level) {
            case LogConstant.DEBUG:
                Log.d(tag, msg);
                break;
            case LogConstant.INFO:
                Log.i(tag, msg);
                break;
            case LogConstant.WARN:
                Log.w(tag, msg);
                break;
            case LogConstant.ERROR:
                Log.e(tag, msg);
                break;
            default:
                break;
        }
        return 0;
    }

    /**
     * 打印消息 ,需要考虑到同步
     *
     * @param msg
     */
    private void printMessage(String msg) {
        File[] files = nativeLogDir.listFiles();
        File logFile = getLogFile();
        if (files.length > config.getLoggerFilesCount()) {
            String[] list = nativeLogDir.list();
            String min = Collections.min(Arrays.asList(list));
            new File(min).delete();
        }
        try {
            PrintWriter printWriter = new PrintWriter(logFile);
            printWriter.println(msg);
            printWriter.flush();
            printWriter.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }

    public File getLogFile() {
        return new File(nativeLogDir, getFormatedLogFile());
    }

    public boolean isOpen() {
        return isOpen;
    }

    public void setOpen(boolean open) {
        isOpen = open;
    }

    public boolean isWriteFile() {
        return isWriteFile;
    }

    public void setWriteFile(boolean writeFile) {
        isWriteFile = writeFile;
    }

    public int getLevel() {
        return mLevel;
    }

    public void setLevel(int level) {
        mLevel = level;
    }


}
