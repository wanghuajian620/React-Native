package com.cib.library.encrypt;

import java.io.InputStream;


/**
 * @author guowb
 *
 */
public class ReadFileUtils {

	/**
	 * 获取私钥，用于解密
	 */
	public static InputStream getPriKey() throws Exception {
		ClassLoader classLoader = Thread.currentThread()
				.getContextClassLoader();
		if (classLoader == null) {
			classLoader = ReadFileUtils.class.getClassLoader();
		}
		try {
			InputStream is = classLoader.getResourceAsStream("assets/pkcs8_private_key.pem");
			return is;
		} catch (Exception e) {
			throw new Exception("装载属性资源参数文件出错.", e);
		}
	}
	/**
	 * 获取公钥，用于加密
	 */
	public static InputStream getPubKey() throws Exception {
		ClassLoader classLoader = Thread.currentThread()
				.getContextClassLoader();

		if (classLoader == null) {
			classLoader = ReadFileUtils.class.getClassLoader();
		}
		try {

			InputStream is = classLoader
					.getResourceAsStream("assets/rsa_public_key.pem");
			return is;
		} catch (Exception e) {
			throw new Exception("装载属性资源参数文件出错.", e);
		}
	}
}
