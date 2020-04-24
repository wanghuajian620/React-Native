package com.cib.library.permission;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.text.TextUtils;
import android.util.Log;

import androidx.core.content.ContextCompat;
import io.reactivex.annotations.NonNull;
import io.reactivex.functions.Consumer;

/**
 * Created by liudan on 2020/1/3.
 */

public class PermissionUtils {
    public static void checkPermission(Activity activity, String tag, String[] permissions, String msg,PermissionResultInterface permissionResultCallback) {
        AlertDialog.Builder mDialog = new AlertDialog.Builder(activity);
        AlertDialog dialog = null;
        //判断permissions是否已经授权，如没有授权需要弹出一个提示信息窗口给用户提示请求授权原因
        if (lacksPermissions(activity,permissions)){
            //如果提示信息不为空则弹出提示
            if (!TextUtils.isEmpty(msg)){
                mDialog.setTitle("权限申请提示信息");
                mDialog.setMessage(msg);
                mDialog.setNegativeButton("我知道了", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        getPermission(activity,tag,permissions,permissionResultCallback);
                    }
                });
                dialog = mDialog.create();
                dialog.setCanceledOnTouchOutside(false);
                dialog.show();
            }else {
                getPermission(activity,tag,permissions,permissionResultCallback);
            }
        }else {
            permissionResultCallback.PermissionSuccess();
        }
    }

    //请求权限
    private static void getPermission(Activity activity,String tag,String[] permissions,PermissionResultInterface permissionResultCallback) {
        RxPermission.getIntance(activity, tag)
            .request(permissions)
            .subscribe(new Consumer<Boolean>() {
                @Override
                public void accept(@NonNull Boolean aBoolean) throws Exception {
                    if (aBoolean) {
                        //获取偏好设置
                        permissionResultCallback.PermissionSuccess();
                    } else {
                        permissionResultCallback.PermissionFaild();
                    }
                }
        });
    }


    /**
     * 判断权限集合
     * permissions 权限数组
     * return true-表示没有改权限  false-表示权限已开启
     */
    public static boolean lacksPermissions(Context mContexts, String[] mPermissions) {
        for (String permission : mPermissions) {
            if (lacksPermission(mContexts, permission)) {
                Log.e("TAG","-------没有开启权限");
                return true;
            }
        }
        Log.e("TAG","-------权限已开启");
        return false;

    }

    /**
     * 判断是否缺少权限
     */
    private static boolean lacksPermission(Context mContexts, String permission) {
        return ContextCompat.checkSelfPermission(mContexts, permission) == PackageManager.PERMISSION_DENIED;
    }
}
