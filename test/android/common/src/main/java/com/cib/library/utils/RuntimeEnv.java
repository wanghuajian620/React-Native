package com.cib.library.utils;

import android.content.Context;

import com.cib.library.logger.LogManager;

/**
 * 运行时环境参数
 *
 * @author
 * @version 1.0.0
 * @create 2019/5/27
 */
public final class RuntimeEnv {
    /**
     * 调试用的标志
     */
    private static final String TAG = RuntimeEnv.class.getSimpleName();

    /**
     * 运行时的Application 类型的Context
     */
    public static Context appContext = null;
    /**
     * 进程名 子进程将按照 主进程_子进程 显示
     */
    public static String procName = "";


    /***
     * 获取当前运行的类的方法 和行数
     * @return
     */
    public static String getCurrentMethodName() {
        StackTraceElement element = getCallLogManagerStackTrace();
        if (element != null) {
            String methodName = element.getMethodName();
            int lineNumber = element.getLineNumber();
            return methodName + "() " + lineNumber;
        }
        return null;
    }


    /**
     * 获取当前运行的Class
     *
     * @return
     */
    public static String getCurrentFileName() {
        StackTraceElement element = getCallLogManagerStackTrace();
        if (element != null) {
            String fileName = element.getFileName();
            return fileName;
        }
        return null;
    }

    /**
     * 获取调用LogManager的调用栈
     *
     * @return
     */
    private static StackTraceElement getCallLogManagerStackTrace() {
        int level = 0;
        //LogManager的全限定名称
        String clazzName = LogManager.class.getCanonicalName();
        //方法数组
        String array[] = new String[]{"v", "d", "i", "w", "e"};

        StackTraceElement[] stacks = new Throwable().getStackTrace();
        //依次寻找，找到LogManager的上一级
        for (level = 0; level < stacks.length; level++) {
            String method = stacks[level].getMethodName();

            if (clazzName.equals(stacks[level].getClassName()) && (method.equals(array[0])
                    || method.equals(array[1]) || method.equals(array[2])
                    || method.equals(array[3]) || method.equals(array[4]))) {
                break;
            }
        }

        //返回上一级的调用栈
        if (stacks.length > (level + 1)) {
            return stacks[level + 1];
        }
        return null;
    }


}
