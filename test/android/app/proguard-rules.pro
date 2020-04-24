# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# okhttp

-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# okio

-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**
-ignorewarning

-keep class com.com.com.facebook.stetho.** { *; }

-keep public class * extends android.view.View
# 自定义控件不被混淆
-keepclassmembers class * extends android.app.Activity{
	public void *(android.view.View);
}

-keep public class * extends android.view.View{
	*** get*();
	void set*(...);
	public <init>(android.content.Context);
	public <init>(android.content.Context,android.util.AttributeSet);
	public <init>(android.content.Context,android.util.AttributeSet,int);
}


-keep class com.com.com.facebook.** {*;}
-keep class com.alibaba.fastjson.** {*;}
-keep class org.apache.commons.** {*;}
-keep class org.bouncycastle.**{*;}
-keep class de.innosystec.unrar.unpack.**{*;}

-keep class com.baidu.**{*;}
-keep class vi.com.gdi.bgl.**{*;}

#bugly
-dontwarn com.tencent.bugly.**
-keep public class com.tencent.bugly.**{*;}

#高德
-dontwarn com.amap.api.**
-dontwarn com.a.a.**
-dontwarn com.autonavi.**
-keep class com.amap.api.**  {*;}
-keep class com.autonavi.**  {*;}
-keep class com.a.a.**  {*;}

#ocr扫描
-keep class com.ym.idcard.reg.** { *; }

#活体检测
-dontwarn cn.cloudwalk.**
-keep class cn.cloudwalk.**{*;}
-dontwarn org.apache.http.entity.mime.**
-keep class org.apache.http.entity.mime.**{*;}
-dontwarn com.carlos.voiceline.mylibrary.**
-keep class com.carlos.voiceline.mylibrary.**{*;}

-keep class com.tencent.open.TDialog$*
-keep class com.tencent.open.TDialog$* {*;}
-keep class com.tencent.open.PKDialog
-keep class com.tencent.open.PKDialog {*;}
-keep class com.tencent.open.PKDialog$*
-keep class com.tencent.open.PKDialog$* {*;}