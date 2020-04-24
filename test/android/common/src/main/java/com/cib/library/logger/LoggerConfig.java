package com.cib.library.logger;

import static com.cib.library.logger.LogConstant.DEFAULT_LOGGER_DIR;
import static com.cib.library.logger.LogConstant.DEFAULT_LOGGER_JS_DIR;
import static com.cib.library.logger.LogConstant.DEFAULT_LOGGER_NATIVE_DIR;

/**
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/5/24
 */
public class LoggerConfig {


    private int loggerFilesCount = LogConstant.DEFAULT_LOGGER_FILE_COUNT;
    private String logDir = DEFAULT_LOGGER_DIR;
    private String nativeLogDir = DEFAULT_LOGGER_NATIVE_DIR;
    private String jsLogDir = DEFAULT_LOGGER_JS_DIR;

    public int getLoggerFilesCount() {
        return loggerFilesCount;
    }

    public void setLoggerFilesCount(int loggerFilesCount) {
        this.loggerFilesCount = loggerFilesCount;
    }

    public String getLogDir() {
        return logDir;
    }

    public void setLogDir(String logDir) {
        this.logDir = logDir;
    }

    public String getNativeLogDir() {
        return nativeLogDir;
    }

    public void setNativeLogDir(String nativeLogDir) {
        this.nativeLogDir = nativeLogDir;
    }

    public String getJsLogDir() {
        return jsLogDir;
    }

    public void setJsLogDir(String jsLogDir) {
        this.jsLogDir = jsLogDir;
    }
}
