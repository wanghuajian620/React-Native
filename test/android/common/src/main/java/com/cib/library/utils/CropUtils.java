package com.cib.library.utils;

import android.content.Context;
import android.net.Uri;
import android.os.Build;

import java.io.File;

import androidx.core.content.FileProvider;

/**
 * Created by liujun002 on 2018/3/21.
 */

public class CropUtils {
    //解决Android 7.0之后的Uri安全问题
    public static Uri getUriForFile(Context context, File file) {
        if (context == null || file == null) {
            throw new NullPointerException();
        }
        Uri uri;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            uri = FileProvider.getUriForFile(context,context.getPackageName()+ ".provider", file);
        } else {
            uri = Uri.fromFile(file);
        }
        return uri;
    }


}
