package com.cib.library.logger;

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
public class LogJsImpl {

    private final File jsLoggerDir;
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
    public LogJsImpl() {
        config = new LoggerConfig();
        //先创建文件夹 默认存储在 包名 + log 目录下
        File dir = new File(AndroidDeviceUtil.getExternalDataPath() + File.separator + config.getLogDir());
        if (!dir.exists()) {
            dir.mkdirs();
        }
        jsLoggerDir = new File(dir, config.getJsLogDir());
        if (!jsLoggerDir.exists()) {
            jsLoggerDir.mkdir();
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
     * @param msg
     * @return
     */
    public int print(String msg) {

        //如果是非调试状态，直接不打印，返回
        if (!isOpen) {
            return 0;
        }

        printToFile(msg);
        return 0;
    }

    /**
     * 打印到日志文件中
     *
     * @param msg
     */
    private void printToFile(String msg) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = sf.format(new Date());
        String message = time + "[Android]" +
                "[" + msg + "]";
        printMessage(message);
    }


    private void printMessage(String msg) {
        File[] files = jsLoggerDir.listFiles();
        File logFile = getLogFile();
        if (files.length > config.getLoggerFilesCount()) {
            String[] list = jsLoggerDir.list();
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
        return new File(jsLoggerDir, getFormatedLogFile());
    }

    /**
     * @return {@link #isOpen}
     */
    public boolean isOpen() {
        return isOpen;
    }

    /**
     * @param open the {@link #isOpen} to set
     */
    public void setOpen(boolean open) {
        isOpen = open;
    }

    /**
     * @return {@link #isWriteFile}
     */
    public boolean isWriteFile() {
        return isWriteFile;
    }

    /**
     * @param writeFile the {@link #isWriteFile} to set
     */
    public void setWriteFile(boolean writeFile) {
        isWriteFile = writeFile;
    }

    /**
     * @return {@link #mLevel}
     */
    public int getLevel() {
        return mLevel;
    }

    /**
     * @param level the {@link #mLevel} to set
     */
    public void setLevel(int level) {
        mLevel = level;
    }


}
