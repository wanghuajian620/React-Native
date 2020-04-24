package com.cib.library.db;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;


import net.sqlcipher.database.SQLiteDatabase;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * sql工具类
 * Created by zhengyingbing on 17/6/19.
 */

public class SQLUtils {

    private Context context;
    private AgreeDBHelper agreeDBHelper;
    private SQLiteDatabase db = null;
    private Cursor cursor = null;
    private static SQLUtils mInstance;

    private SQLUtils(Context mContext,String tableName) {
        agreeDBHelper = new AgreeDBHelper(mContext,tableName);
        this.context = mContext;
    }

    public static SQLUtils getInstance(Context context,String tableName) {
        if (mInstance == null) {
            mInstance = new SQLUtils(context, tableName);
        }
        return mInstance;
    }

    public  int execSQLite(String sql) {
        try {
            if (agreeDBHelper == null) {
                agreeDBHelper = new AgreeDBHelper(context);
            }
            db = agreeDBHelper.getWritableDatabase();
            Log.i("tag", "创建表语句：" + sql);
            db.execSQL(sql);
            return 1;

        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        } finally {
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }
    }


    public  List<Object>  querySQLite(String sql ) {
        try {
            if (agreeDBHelper == null) {
                agreeDBHelper = new AgreeDBHelper(context);
            }
            db = agreeDBHelper.getWritableDatabase();
            Log.i("tag", "创建表语句：" + sql);

            cursor= db.rawQuery(sql,null);
            //获取该表对应的所有字段
            String[] columnNames = cursor.getColumnNames();
            //把所有数据装到一个list
            List<Object> list = new ArrayList<>();

            for (cursor.moveToFirst(); !(cursor.isAfterLast()); cursor.moveToNext()) {

                   Map<String,String> map = new HashMap<>();
                   for (int i = 0; i < columnNames.length; i++) {
                       //获取每条记录中的字段和值，装进map
                       map.put(columnNames[i], cursor.getString(cursor.getColumnIndex(columnNames[i])));
                   }
                list.add(map);
            }
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (cursor != null){
                cursor.close();
            }
            if (db != null) {
                db.close();
            }
            if (agreeDBHelper != null){
                agreeDBHelper.close();
            }
        }
    }


    /**
     * 创建表
     *
     * @param tableName
     */
    public int createTable(String tableName, List<String> columns) {
        try {
            if (agreeDBHelper == null) {
                agreeDBHelper = new AgreeDBHelper(context);
            }
            db = agreeDBHelper.getWritableDatabase();
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < columns.size(); i++) {
                sb.append(columns.get(i) + " text,");
            }
            String sql = "create table if not exists " + tableName + " (id integer primary key autoincrement, " + sb.toString().substring(0, sb.toString().length() - 1) + ")";
            Log.i("tag", "创建表语句：" + sql);
            db.execSQL(sql);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        } finally {
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }
    }

    //删除表
    public int dropTable(String tableName) {
        try {
            db = agreeDBHelper.getReadableDatabase();
            cursor = db.rawQuery("select count(*) from sqlite_master where type = 'table' and name = '" + tableName + "'", null);
            if (cursor.moveToNext()) {
                if (cursor.getInt(0) == 1) {
                    String sql = "drop table if exists " + tableName;
                    db = agreeDBHelper.getWritableDatabase();
                    db.execSQL(sql);
                    return 1;
                } else {
                    return -1;
                }
            } else {
                return -1;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }

    }

    //添加记录 需要加密
    public long add(String tableName, Map<String, String> hashMap, List<String> columns) {
        try {
            db = agreeDBHelper.getReadableDatabase();
            ContentValues cv = new ContentValues();
            Iterator iter = hashMap.entrySet().iterator();
            while (iter.hasNext()) {
                Map.Entry entry = (Map.Entry) iter.next();
                for (String key : columns) {
                    if (key.equals(entry.getKey())) {
                        cv.put(entry.getKey().toString(), entry.getValue().toString());
                    }
                }
            }
            return db.insert(tableName, null, cv);
        } catch (Exception e) {
            return -1;
        } finally {
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }
    }

    /**
     * 查询记录 不带查询条件
     *
     * @param tableName
     * @return
     */
    public JSONArray getAllMessage1(String tableName) {
        try {
            Log.i("tag", "查询语句：" + "select * from " + tableName);
            db = agreeDBHelper.getReadableDatabase();
            cursor = db.rawQuery("select * from " + tableName, null);
            //获取该表对应的所有字段
            String[] columnNames = cursor.getColumnNames();
            //把所有数据装到一个list
            JSONArray jsonArray = new JSONArray();
            for (cursor.moveToFirst(); !(cursor.isAfterLast()); cursor.moveToNext()) {
                JSONObject jsonObject = new JSONObject();
                HashMap<String, String> map = new HashMap<>();
                for (int i = 0; i < columnNames.length; i++) {
                    //获取每条记录中的字段和值，装进map
                    jsonObject.put(columnNames[i], cursor.getString(cursor.getColumnIndex(columnNames[i])));
                    map.put("\"" + columnNames[i] + "\"", "\"" + cursor.getString(cursor.getColumnIndex(columnNames[i])) + "\"");
                }
                jsonArray.put(jsonObject);
            }
            Log.i("tag", "查询所有信息：" + jsonArray.toString());
            return jsonArray;
        } catch (Exception e) {
            return new JSONArray();
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }
    }


    /**
     * 查询记录 不带查询条件
     *
     * @param tableName
     * @return
     */
    public WritableArray getAllMessage(String tableName) {
        WritableArray list = Arguments.createArray();
        try {
            Log.i("tag", "查询语句：" + "select * from " + tableName);
            db = agreeDBHelper.getReadableDatabase();
            cursor = db.rawQuery("select * from " + tableName, null);
            //获取该表对应的所有字段
            String[] columnNames = cursor.getColumnNames();
            //把所有数据装到一个list

            for (cursor.moveToFirst(); !(cursor.isAfterLast()); cursor.moveToNext()) {
                WritableMap map = Arguments.createMap();
                for (int i = 0; i < columnNames.length; i++) {
                    //获取每条记录中的字段和值，装进map
                    map.putString(columnNames[i], cursor.getString(cursor.getColumnIndex(columnNames[i])));
                    Log.e("fgq","columnNames[i]"+columnNames[i]+"值："+cursor.getString(cursor.getColumnIndex(columnNames[i])));
                }
                list.pushMap(map);
            }
            Log.i("tag","查询所有信息："+list.toString());
            cursor.close();
            return list;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 查询记录 带查询条件
     *
     * @param tableName
     * @param hashMap
     * @return
     */
    public JSONArray searchMessage(String tableName, Map<String, String> hashMap) {

        try {
            StringBuffer sb = new StringBuffer();
            db = agreeDBHelper.getReadableDatabase();
            Iterator iter = hashMap.entrySet().iterator();
            while (iter.hasNext()) {
                Map.Entry entry = (Map.Entry) iter.next();
                sb.append("\"" + entry.getKey().toString() + "\"" + "=" + "\"" + entry.getValue().toString() + "\"" + " and ");
            }
            Log.i("tag", "查询语句：" + "select * from " + tableName + " where " + sb.toString().substring(0, sb.toString().length() - 4));
            cursor = db.rawQuery("select * from " + tableName + "   where " + sb.toString().substring(0, sb.toString().length() - 4), null);
            //获取该表对应的所有字段
            String[] columnNames = cursor.getColumnNames();
            JSONObject result = new JSONObject();
            //把所有数据装到一个list
            JSONArray jsonArray = new JSONArray();
            for (cursor.moveToFirst(); !(cursor.isAfterLast()); cursor.moveToNext()) {
                JSONObject jsonObject = new JSONObject();
                for (int i = 0; i < columnNames.length; i++) {
                    //获取每条记录中的字段和值，装进map
                    jsonObject.put(columnNames[i], cursor.getString(cursor.getColumnIndex(columnNames[i])));
                }
                jsonArray.put(jsonObject);
            }
            result.put("data", jsonArray);
            return jsonArray;
        } catch (Exception e) {
            return new JSONArray();
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }

    }

    //删除指定记录
    public int deleteMsg(String tableName, String id) {
        db = agreeDBHelper.getReadableDatabase();
        try {
            Log.i("tag", "deleteMsg：" + "delete from " + tableName + " where id  = " + id);
            db.execSQL("delete from " + tableName + " where id  = " + id);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        } finally {
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }

    }
    //删除记录
    public int delete(String tableName, Map<String, String> hashMap) {
        StringBuffer sb = new StringBuffer();
        db = agreeDBHelper.getReadableDatabase();
        Iterator iter = hashMap.entrySet().iterator();
        while (iter.hasNext()) {
            Map.Entry entry = (Map.Entry) iter.next();
            sb.append( entry.getKey().toString() + "=" + "\"" + entry.getValue().toString() + "\"" + " and ");
        }
        try {
//            db = agreeDBHelper.getReadableDatabase();
//            cursor = db.rawQuery("select * from " + tableName + " where " + key + " = " + value, null);
            Log.i("tag", "delete：" + "delete from " + tableName + " where " + sb.toString().substring(0, sb.toString().length() - 4));
            int count = db.delete(tableName,sb.toString().substring(0, sb.toString().length() - 4),null);
            //db.execSQL("delete from " + tableName + " where " + sb.toString().substring(0, sb.toString().length() - 4));
            Log.i("count :",count+"");
            return count;
        } catch (Exception e) {
            return -1;
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }

    }

    /**
     * 修改记录
     *
     * @param tableName
     * @param newData   条件
     * @param hashMap   修改数据
     */
    public int updateMessage(String tableName, Map<String, String> newData, Map<String, String> hashMap, List<String> columns) {
        //获取数据库的操作实例
        try {
            db = agreeDBHelper.getReadableDatabase();

            if (TextUtils.isEmpty(tableName)) {
                return -1;
            }
            if (newData == null || newData.size() == 0) {
                return -1;
            }
            ContentValues cv = new ContentValues();
            Iterator iter = newData.entrySet().iterator();
            while (iter.hasNext()) {
                Map.Entry entry = (Map.Entry) iter.next();
                for (String key : columns) {
                    if (key.equals(entry.getKey())) {
                        cv.put(entry.getKey().toString(), entry.getValue().toString());
                    }
                }
            }
            StringBuffer buffer = new StringBuffer();
            Iterator iter2 = hashMap.entrySet().iterator();
            while (iter2.hasNext()) {
                Map.Entry entry = (Map.Entry) iter2.next();
                buffer.append(entry.getKey().toString() + "=" + entry.getValue().toString() + " and ");

            }
            int count = db.update(tableName, cv, buffer.toString().substring(0, buffer.length() - 4), null);
            Log.i("count = ", count + "");
            return count;
        } catch (Exception e) {
            return -1;
        } finally {
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }

    }

    /**
     * 修改记录
     */
    public int updateMessages(String tableName, Map<String, String> map, Map<String, String> map2) {
        try {
            //条件
            StringBuffer sb = new StringBuffer();
            Iterator iter = map2.entrySet().iterator();
            while (iter.hasNext()) {
                Map.Entry entry = (Map.Entry) iter.next();
                sb.append(entry.getKey().toString() + "=" + entry.getValue().toString());
            }
            //修改状态
            StringBuffer sb2 = new StringBuffer();
            Iterator iter2 = map.entrySet().iterator();
            while (iter2.hasNext()) {
                Map.Entry entry = (Map.Entry) iter2.next();
                sb2.append(entry.getKey().toString() + "=" + entry.getValue().toString());
            }
            //获取数据库的操作实例
            db = agreeDBHelper.getWritableDatabase();
            //执行SQL语句

            Log.i("updateMessage", "update " + tableName + " set " + sb2.toString().substring(0, sb2.length() - 1) + " where " + sb.toString().substring(0, sb.length() - 4));
            cursor = db.rawQuery("update " + tableName + " set " + sb2.toString().substring(0, sb2.length() - 1) + " where " + sb.toString().substring(0, sb.length() - 4), null);
            //关闭数据库
            Log.i("cursor = ", cursor + "");
            return 1;
        } catch (Exception e) {
            return -1;
        } finally {

            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }


    }

    /**
     * 修改记录
     */
    public int updateMessage(String tableName, HashMap<String, String> map, HashMap<String, String> map2) {
        try {

            //生成要修改或者插入的键值
            ContentValues cv = new ContentValues();
            //要修改的内容
            StringBuffer sb = new StringBuffer();
            Iterator iter = map2.entrySet().iterator();
            while (iter.hasNext()) {
                Map.Entry entry = (Map.Entry) iter.next();
                cv.put(entry.getKey().toString(),entry.getValue().toString());
            }
            //要修改的条件 id = 2
            StringBuffer sb2 = new StringBuffer();
            Iterator iter2 = map.entrySet().iterator();
            while (iter2.hasNext()) {
                Map.Entry entry = (Map.Entry) iter2.next();
                sb2.append(entry.getKey().toString() + " = " +entry.getValue().toString()+ ",");
            }

            //获取数据库的操作实例
            db = agreeDBHelper.getWritableDatabase();
            //执行SQL语句
            int update = db.update(tableName, cv, sb2.substring(0, sb2.length() - 1), null);
            //关闭数据库
            db.close();
            return update;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    /*
    * 执行单调语句
    *
    */
    public int alterDataBySql(String sql) {
        // SQLiteDatabase db = dbOpenHelper.getWritableDatabase();
        db = agreeDBHelper.getReadableDatabase();

        try {
            Log.i("tag", "alterDataBySql：" + sql);
            db.rawExecSQL(sql);
            return 1;
        } catch (Exception e) {
            return -1;
        } finally {

            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }
    }

    /*
   * 执行单调语句
   *
   */
    public int alterDataBySqls(List<String> sql) {
        db = agreeDBHelper.getReadableDatabase();
        db.beginTransaction();//开启事务'
        int i = 0;
        try {
            while (i < sql.size()) {
                Log.i("tag", "alterDataBySqls：" + sql.get(i));
                db.rawExecSQL(sql.get(i));
                i++;
            }
            db.setTransactionSuccessful();//设置事务的标志为True
        } catch (Exception e) {
            return -1;
        } finally {
            db.endTransaction();//结束事务,有两种情况：commit,rollback,
            //事务的提交或回滚是由事务的标志决定的,如果事务的标志为True，事务就会提交，否侧回滚,默认情况下事务的标志为False
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }

        return 1;
    }

    /*
  * 执行单调语句
  *
  */
    public int querySQLite(String sql,String[] value) {
        db = agreeDBHelper.getReadableDatabase();
        try {
            db.execSQL(sql,value);
        } catch (Exception e) {
            return -1;
        } finally {
            if (db != null) {
                db.close();
                agreeDBHelper.close();
            }
        }
        return 1;
    }



    //删除所有记录
    public int deleteAll() {
        try {
            db.execSQL("delete from " + agreeDBHelper.TABLE_NAME);
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    //删除指定记录
    public  int deleteMsg(String id) {
        try {
            db = agreeDBHelper.getWritableDatabase();
            db.execSQL("delete from " + agreeDBHelper.TABLE_NAME + " where id  = " + id);
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    //根据localId查询记录
    public JSONArray searchByLocalId(String tableName, String id_applocal) {
        try {
            db = agreeDBHelper.getReadableDatabase();
            Log.i("tag", "查询语句：" + "select * from " + tableName + " where id = " + id_applocal);
            cursor = db.rawQuery("select * from " + tableName + " where id = " + id_applocal, null);
            //获取该表对应的所有字段
            String[] columnNames = cursor.getColumnNames();
            JSONObject result = new JSONObject();
            //把所有数据装到一个list
            JSONArray jsonArray = new JSONArray();
            for (cursor.moveToFirst(); !(cursor.isAfterLast()); cursor.moveToNext()) {
                JSONObject jsonObject = new JSONObject();
                for (int i = 0; i < columnNames.length; i++) {
                    //获取每条记录中的字段和值，装进map
                    jsonObject.put(columnNames[i], cursor.getString(cursor.getColumnIndex(columnNames[i])));
                }
                jsonArray.put(jsonObject);
            }
            result.put("data", jsonArray);
            return jsonArray;
        } catch (Exception e) {
            e.printStackTrace();
            return new JSONArray();
        }
    }


    /**
     * 关闭数据库
     */
    public void closeDB() {
        Log.i("tag", "已关闭");
        if (cursor != null && !cursor.isClosed()) {
            cursor.close();
        }
        if (db != null) {
            db.close();
            agreeDBHelper.close();
        }
    }
}