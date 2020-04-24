package com.cib.library.db;

import android.content.Context;
import android.util.Log;

import net.sqlcipher.database.SQLiteDatabase;
import net.sqlcipher.database.SQLiteOpenHelper;


public class AgreeDBHelper extends SQLiteOpenHelper {

    private static final int DB_VERSION = 1;
    private static final String DB_NAME = "xingyw_lsjf.db";
    public static String TABLE_NAME = "pushmsg";

    public static final String aesKey = "agree1986";//默认加密

    public AgreeDBHelper(Context context,String tableName) {
        super(context, DB_NAME, null, DB_VERSION);
        this.TABLE_NAME = tableName;
        SQLiteDatabase.loadLibs(context);
        getWritableDatabase(aesKey);
    }

    public AgreeDBHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
        SQLiteDatabase.loadLibs(context);
        getWritableDatabase(aesKey);
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        Log.i("tag","创建成功");

    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int oldVersion, int newVersion) {
        String sql = "DROP TABLE IF EXISTS " + TABLE_NAME;
        sqLiteDatabase.execSQL(sql);
        onCreate(sqLiteDatabase);
        Log.i("tag","更新成功");
    }

    SQLiteDatabase getReadableDatabase() {
        return(super.getReadableDatabase(aesKey));
    }

    SQLiteDatabase getWritableDatabase() {
        return(super.getWritableDatabase(aesKey));
    }
}
