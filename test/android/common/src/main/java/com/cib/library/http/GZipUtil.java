package com.cib.library.http;

import android.text.TextUtils;

import com.cib.library.encrypt.des.BaseUtil64;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

public class GZipUtil {
	private static final String DEFAULT_ENCODING = "UTF-8";
	public static final String compressForGzip(String data,String encoding) throws IOException{
		if(TextUtils.isEmpty(data)){
			return null;
		}
		if(TextUtils.isEmpty(encoding)){
			encoding = DEFAULT_ENCODING;
		}
		ByteArrayOutputStream out = new ByteArrayOutputStream();
			GZIPOutputStream gzip = new GZIPOutputStream(out);
			gzip.write(data.getBytes(encoding));
			gzip.close();
		return BaseUtil64.encode(out.toByteArray());
	}
	
	public static final String decompressForGzip(String data,String encoding) throws IOException{
		if(TextUtils.isEmpty(data)){
			return null;
		}
		if(TextUtils.isEmpty(encoding)){
			encoding = DEFAULT_ENCODING;
		}
		ByteArrayOutputStream out = new ByteArrayOutputStream();
			ByteArrayInputStream  in  = new ByteArrayInputStream(BaseUtil64.decode(data));
			GZIPInputStream gzip = new GZIPInputStream(in);
			byte[] buffer = new byte[1024];
			int len;
			while((len = gzip.read(buffer)) >= 0){
				out.write(buffer, 0, len);
			}
		return new String(out.toByteArray(),encoding);
	}
}
