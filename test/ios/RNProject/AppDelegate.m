/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "GlobalDefine.h"
#import "JFToolDefine.h"

#import  <UserNotifications/UserNotifications.h>

#import "AppUpdateHelper.h"
#import "EscapeCheckTool.h"

#import "HGBLogTool.h"

#import "FBYDevicetokenUpload.h"
#import "TokenManager.h"

#import "RNSplashScreen.h"

#import "JFUserDefaultsTool.h"

#if defined (BASE)

#import "HGBLogHandleTool.h"
#import "JFDeveloperViewController.h"
#import "JFRNMainViewController.h"
#import <React/RCTBundleURLProvider.h>
#else

#import "JFRNMainViewController.h"

#endif

NSString * const kJFAppJailbreakDevice = @"ThisDeviceIsJailbreak"; //@"该手机已越狱";
NSString * const kJFAppNotificationRegisterSuccess = @"NotificationRegisterSuccess"; //@"消息推送注册成功";
NSString * const kJFAppNotificationRegisterFaild = @"NotificationRegisterFaild"; //@"消息推送注册失败";

@interface AppDelegate () <UNUserNotificationCenterDelegate>

@property (nonatomic, assign) BOOL allowRotation; //是否允许横屏的标记

@end

@implementation AppDelegate
#pragma mark - 应用生命周期
/** 程序启动 */
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  
  self.launchOptions = launchOptions;
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];

  kJFSetAppLanguage(kJFLanguage_SC);
  
  /** 是否显示配置设置页面 */
  NSString * startPage = [GlobalFunction getProjectSettingWithKey:kJFStartPage] ? [GlobalFunction getProjectSettingWithKey:kJFStartPage] : kJFDefaultBundleName;
  NSString * startComponent = [GlobalFunction getProjectSettingWithKey:kJFStartComponent] ? [GlobalFunction getProjectSettingWithKey:kJFStartComponent] : kJFDefaultModuleName;
  
#if defined (BASE)
  
  [[GlobalFunction shareInstance] setIsBase:YES];
  
  /** 是否重定向日志 */
  if ([[GlobalFunction getProjectSettingWithKey:kJFResetLog] boolValue]) {
    
    [self init_Log_ServerWithOptions:launchOptions];
  }
  
  /** 是否显示配置设置页面 */
  if([[GlobalFunction getProjectSettingWithKey:kJFShowProjectSettingPage] boolValue]) {
    
    JFDeveloperViewController *developerViewController = [[JFDeveloperViewController alloc] init];
    UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:developerViewController];
    self.window.rootViewController = navigationController;
  } else {
     
    JFRNMainViewController *mainViewController = [[JFRNMainViewController alloc] init];
    [mainViewController loadJSBundle:startPage bundleMoudleName:startComponent];
    self.window.rootViewController = mainViewController;
  }
#else
  
  [[GlobalFunction shareInstance] setIsBase:NO];

  [self init_Log_ServerWithOptions:launchOptions];
  
  JFRNMainViewController *mainViewController = [[JFRNMainViewController alloc] init];
  [mainViewController loadJSBundle:startPage bundleMoudleName:startComponent];
  self.window.rootViewController = mainViewController;
  
  /** 防止启动时白屏 */
//  [RNSplashScreen show];
#endif
  [self.window makeKeyAndVisible];
  
  /** 程序崩溃时会自动进入uncaughtExceptionHandler()方法 */
  NSSetUncaughtExceptionHandler(&p_uncaughtExceptionHandler);
  
  /** 注册推送 */
  [self registerRemoteNotificationsWithApplication:application];

  /** 检测是否越狱 */
  [self escapeCheck];

  /** APP检测更新 */
  [self appUpdate];

  /** 注册推送中心 */
  [self initNotificationCenter];

  /** 防止启动时白屏 */
  [self saveApplicationInfo];
  
  return YES;
}

/** 程序进入前台 */
- (void)applicationWillEnterForeground:(UIApplication *)application {
  
  /** APP检测更新 */
  [self appUpdate];
}

/** 应用激活 */
- (void)applicationDidBecomeActive:(UIApplication *)application {
  
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
}

#pragma mark - Open URL Handle
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  
  [[NSNotificationCenter defaultCenter] postNotificationName:kJFNotificationKeyOpenURL object:self userInfo:@{kJFKeyHandleOpenURL : url}];
  return  YES;
}

# pragma mark - 检测函数
/** 版本检测更新回调 */
- (void)appUpdate {
  
  /** APP检测更新 */
  AppUpdateHelper *appUpdateHelper = [[AppUpdateHelper alloc] init];
  [appUpdateHelper appUpdate];
  /** 是否进行完整性校验 */
  BOOL isCheckIntegrity = [[GlobalFunction getProjectSettingWithKey:kJFCheckIntegrity] boolValue];
  if (isCheckIntegrity) {
    
    [appUpdateHelper appCheck];
  }
}

/** 越狱检测 */
- (void)escapeCheck {
  
  /** 检测是否越狱 */
  if ([EscapeCheckTool isJailbreakDevice]) {
    
    //已经越狱
    alert(kJFDefaultLocalizedString(kJFStringPrompt), kJFDefaultLocalizedString(kJFAppJailbreakDevice), kJFDefaultLocalizedString(kJFStringConfirm));
  }
}
#pragma mark - 保存应用信息
- (void)saveApplicationInfo {
  
  NSString *appVersion = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
  [JFUserDefaultsTool saveUserDefaultsWithValue:appVersion key:@"apkversion" secretKey:kJFKeyDefaultEncrypt];
}
#pragma mark - 消息推送
/** 注册推送消息 */
- (void)registerRemoteNotificationsWithApplication:(UIApplication *)application {
  
  if (kJFSystemVersion >= 10.0) {
    
    UNUserNotificationCenter * center = [UNUserNotificationCenter currentNotificationCenter];
    [center setDelegate:self];
    UNAuthorizationOptions type = UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionAlert;
    [center requestAuthorizationWithOptions:type completionHandler:^(BOOL granted, NSError * _Nullable error) {
      
      if (error) {
        
        CIBErrorLog(@"%@ : %@", kJFDefaultLocalizedString(kJFAppNotificationRegisterFaild), error);
      }
    }];
  } else if (kJFSystemVersion >= 8.0) {
    
    UIUserNotificationType notificationTypes = UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:notificationTypes categories:nil];
    [application registerUserNotificationSettings:settings];
  }
  [application registerForRemoteNotifications];
}

/** 收到Device Token */
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  
  NSString *deviceTokenString = [[[[deviceToken description] stringByReplacingOccurrencesOfString:@"<" withString:@""] stringByReplacingOccurrencesOfString:@">" withString:@""] stringByReplacingOccurrencesOfString:@" " withString:@""];
  if (kJFSystemVersion >= 13) {
    
    const unsigned *tokenBytes = (const unsigned *)[deviceToken bytes];
    deviceTokenString = [NSString stringWithFormat:@"%08x%08x%08x%08x%08x%08x%08x%08x",
                          ntohl(tokenBytes[0]), ntohl(tokenBytes[1]), ntohl(tokenBytes[2]),
                          ntohl(tokenBytes[3]), ntohl(tokenBytes[4]), ntohl(tokenBytes[5]),
                          ntohl(tokenBytes[6]), ntohl(tokenBytes[7])];
  }
  CIBInfoLog(@"%@ : %@", kJFDefaultLocalizedString(kJFAppNotificationRegisterSuccess), deviceTokenString);
  
  //上报设备信息
  UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
  pasteboard.string = deviceTokenString;
  
  FBYDevicetokenUpload *test = [[FBYDevicetokenUpload alloc] init];
  [test networkDeviceToken:deviceTokenString];
}

/** Device Token注册失败 */
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  
  UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];

  pasteboard.string = @"注册失败";
  CIBErrorLog(@"%@ : %@", kJFDefaultLocalizedString(kJFAppNotificationRegisterFaild), error);
  //注册失败自行生成ID上报设备信息
  FBYDevicetokenUpload *test = [[FBYDevicetokenUpload alloc] init];
  [test networkDeviceToken:nil];
}

/** iOS10以上版本注册的处理 */
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  
  // 需要执行这个方法，选择是否提醒用户，有Badge、Sound、Alert三种类型可以设置
  completionHandler(UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert);
}

/** iOS10以上版本接收推送后的处理 */
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)(void))completionHandler {
  
  //处理推送过来的数据
  TokenManager *manager = [TokenManager allocWithZone:nil];
  [manager sendNoticeWithEventName:kJFNotificationKeyRecivedPushNotification Dict:response.notification.request.content.userInfo];
}

/** iOS10以下版本接收推送后的处理 */
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary * _Nonnull)userInfo fetchCompletionHandler:(void (^ _Nonnull)(UIBackgroundFetchResult))completionHandler {
  
  /**
   如需分别处理,请根据 application.applicationState 状态判断
   UIApplicationStateActive 应用程序处于前台
   UIApplicationStateBackground 应用程序在后台，用户从通知中心点击消息将程序从后台调至前台
   UIApplicationStateInactive 用用程序处于关闭状态(不在前台也不在后台)，用户通过点击通知中心的消息将客户端从关闭状态调至前台
   */
  TokenManager *manager = [TokenManager allocWithZone:nil];
  [manager sendNoticeWithEventName:kJFNotificationKeyRecivedPushNotification Dict:userInfo];
  
  completionHandler(UIBackgroundFetchResultNewData);
}

#pragma mark - 注册一些通知,添加观察者
/** 初始化消息通知监听 */
- (void)initNotificationCenter {
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(beginRotation) name:kJFNotificationKeyBeginRotation object:nil]; //屏幕可旋转
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(stopRotation) name:kJFNotificationKeyStopRotation object:nil];//屏幕不可旋转
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(appUpdate) name:kJFNotificationKeyAppUpdateHelper object:nil]; //灰度发布检测更新
}
-(void)init_Log_ServerWithOptions:(NSDictionary *)launchOptions {
  
    [[HGBLogTool shareInstance] redirectLogToDocumentFolder];
  
#if defined (BASE)

    [HGBLogHandleTool shareInstance];
#else
#endif
}
#pragma mark - 屏幕横竖屏控制
/** 停止旋转(禁止横屏) */
- (void)stopRotation {
  
  self.allowRotation = NO;
}

/** 开始旋转(可以横屏) */
- (void)beginRotation {
  
  self.allowRotation = YES;

  if ([[UIDevice currentDevice]   respondsToSelector:@selector(setOrientation:)]) {
    
    SEL selector = NSSelectorFromString(@"setOrientation:");
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:[UIDevice instanceMethodSignatureForSelector:selector]];
    [invocation setSelector:selector];
    [invocation setTarget:[UIDevice currentDevice]];
    int val = UIInterfaceOrientationMaskAll;
    [invocation setArgument:&val atIndex:2];
    [invocation invoke];
  }
}

/** 屏幕横竖屏控制 */
- (UIInterfaceOrientationMask )application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  
  if (self.allowRotation) {
    
    return UIInterfaceOrientationMaskAll;
  }
  return UIInterfaceOrientationMaskPortrait;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"index.ios" withExtension:@"jsbundle"];
#endif
}
@end
