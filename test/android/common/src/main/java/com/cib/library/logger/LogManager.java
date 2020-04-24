package com.cib.library.logger;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/5/24
 * Description:
 */
public class LogManager {

    /**
     * 保存日志实现的Map，可用于多个文件，多个进程使用
     */
    private static Map<String, LogNativeImpl> logNativeHashMap = new HashMap<>();
    /**
     * 保存日志实现的Map，可用于多个文件，多个进程使用
     */
    private static Map<String, LogJsImpl> logJsHashMap = new HashMap<>();

    /**
     * 初始化块
     */
    static {
        //以当前进程名 为文件名
        logNativeHashMap.put(LogConstant.DEF_NAME, new LogNativeImpl());
        logJsHashMap.put(LogConstant.DEF_NAME, new LogJsImpl());


    }

    private LogManager() {
    }

    /**
     * @param tag
     * @param msg
     * @return
     */
    public static int d(String tag, String msg) {
        return printLog(LogConstant.DEBUG, tag, msg);
    }

    /**
     * @param tag
     * @param msg
     * @return
     */
    public static int i(String tag, String msg) {
        return printLog(LogConstant.INFO, tag, msg);
    }

    /**
     * @param tag
     * @param msg
     * @return
     */
    public static int w(String tag, String msg) {
        return printLog(LogConstant.WARN, tag, msg);
    }

    /**
     * @param tag
     * @param msg
     * @return
     */
    public static int e(String tag, String msg) {
        return printLog(LogConstant.ERROR, tag, msg);
    }


    /**
     * 日志打印函数
     *
     * @param level
     * @param tag
     * @param msg
     * @return
     */
    private static int printLog(int level, String tag, String msg) {
        //依次遍历map打开开关
        for (Map.Entry<String, LogNativeImpl> entry : logNativeHashMap.entrySet()) {
            entry.getValue().print(level, tag, msg);
        }
        return 0;
    }

    /**
     * js日志打印方法
     *
     * @param msg 打印的日志内容
     */

    public static final void printJs(String msg) {
        for (Map.Entry<String, LogJsImpl> entry : logJsHashMap.entrySet()) {
            entry.getValue().print(msg);
        }

    }

    /**
     * 日志打印函数
     *
     * @param file
     * @param level
     * @param tag
     * @param msg
     * @return
     */
    private static int printLog(String file, int level, String tag, String msg) {
        return 0;
    }

    /**
     * 获取格式化时间
     *
     * @param formatStr
     * @return
     */
    private static String getFormatTime(String formatStr) {
        SimpleDateFormat df = new SimpleDateFormat(formatStr);
        return df.format(System.currentTimeMillis());
    }

    /**
     * 设置开关的状态
     *
     * @param open
     */
    public static void openLog(boolean open) {
        //依次遍历map打开开关
        for (Map.Entry<String, LogNativeImpl> entry : logNativeHashMap.entrySet()) {
            entry.getValue().setOpen(open);
        }
    }

    /**
     * 设置是否写入文件
     *
     * @param write
     */
    public static void writeFile(boolean write) {
        //依次遍历map打开开关
        for (Map.Entry<String, LogNativeImpl> entry : logNativeHashMap.entrySet()) {
            entry.getValue().setWriteFile(write);
        }
    }

}
