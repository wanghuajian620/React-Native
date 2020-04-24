//
//  ≈.m
//  ReactNativeWork
//
//  Created by Elvis on 2019/6/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "JFDeveloperViewController.h"
#import "GlobalDefine.h"
#import "JFToolDefine.h"
#import "UIColor+Hex.h"
#import "AppConfigViewController.h"

#import "JFRNMainViewController.h"
#import "JFSettingViewController.h"
#import "JFFailureViewController.h"

NSString * const kJFAppVersion = @"AppVersion"; //@"应用版本";
NSString * const kJFBuildVersion = @"BuildVersion"; //@"构建版本";
NSString * const kJFChooseDebugMode = @"ChooseDebugMode"; // @"请选择调试方式";
NSString * const kJFBaseWelcomeString = @"BaseWelcomeString"; //@"欢迎使用兴业银行\n移动开发平台调试基座";

@implementation JFDeveloperViewController
#pragma mark - 视图控制器生命周期
- (void)viewDidLoad {
  
  [super viewDidLoad];
  
  [self setNavigationBar];
  [self setMainView];
  
  [self isAutoReload];
}

- (void)isAutoReload {
  
  //打开自动调试
  if ([[GlobalFunction getProjectSettingWithKey:kJFAutoReload] boolValue]) {
    
    //自动加载连接WiFi调试
    NSDictionary *dic = [JFUserDefaultsTool getUserDefaultsWithKey:kJFKeyDeveloperUserInfo];
    
    NSString *ip = [dic objectForKey:@"ip"];
    NSString *port = [dic objectForKey:@"port"];
    if (ip.length != 0 && port.length != 0) {
      
      NSString *jsTf=@"index.ios.js";
      NSString *componentTf=@"RNProject";
      NSString *urlStr=[NSString stringWithFormat:@"http://%@:%@",ip,port];
      NSURL *url=[NSURL URLWithString:urlStr];
      //会话
      NSURLSession *session=[NSURLSession sharedSession];
      NSURLSessionDataTask *task=[session dataTaskWithURL:url completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        dispatch_async(dispatch_get_main_queue(), ^{
          if (error) {
            
            CIBWarningLog(@"%@ : %@", kJFDefaultLocalizedString(kJFStringIPAddressAndPortIncorrect), error);
            JFFailureViewController *failureViewController = [[JFFailureViewController alloc] init];
            [self.navigationController pushViewController:failureViewController animated:YES];
          } else {
            
            NSString * startPagePath=jsTf;
            NSString * startComponent=componentTf;
            [GlobalFunction saveDeveloperStartPage:startPagePath component:startComponent];
            
            if ([[startPagePath pathExtension] isEqualToString:@"js"] || [[startPagePath pathExtension] isEqualToString:@"jsbundle"] || [[startPagePath pathExtension] isEqualToString:@"bundle"]) {
              
              startPagePath=[[startPagePath lastPathComponent] stringByReplacingOccurrencesOfString:[NSString stringWithFormat:@".%@",[startPagePath pathExtension]] withString:@""];
            }
            startPagePath=[NSString stringWithFormat:@"http://%@:%@/%@.bundle?platform=ios&dev=true&minify=false",ip,port,startPagePath];
            
            JFRNMainViewController *rootVC = [[JFRNMainViewController alloc]init];
            [rootVC loadJSBundle:startPagePath bundleMoudleName:startComponent];\
            [self presentViewController:rootVC animated:YES completion:nil];
          }
        });
      }];
      [task resume];
    }
  }
}

#pragma mark - 创建视图
/** 创建导航控制器视图 */
- (void)setNavigationBar {
  
  self.navigationController.navigationBar.barTintColor = kJFNavigationBarTintColor; //导航栏
  
  //标题
  UILabel *titleLable = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 136 * kJFScreenWidthScale, 16)];
  titleLable.font = [UIFont boldSystemFontOfSize:18];
  titleLable.text = kJFDefaultLocalizedString(kJFChooseDebugMode);
  titleLable.textAlignment = NSTextAlignmentCenter;
  titleLable.textColor = kJFNavigationTextColor;
  self.navigationItem.titleView = titleLable;
  
  
  UIButton *appSettingButton = [UIButton buttonWithType:UIButtonTypeCustom];
  [appSettingButton setTitle:@"配置" forState:UIControlStateNormal];
  appSettingButton.frame = CGRectMake(0, 0, 64., 20.);
  [appSettingButton sizeToFit];
  [appSettingButton addTarget:self action:@selector(appSettingButtonClick:) forControlEvents:UIControlEventTouchUpInside];
//  self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:appSettingButton];
  
}
- (void)appSettingButtonClick:(UIButton *)button {

  AppConfigViewController *acvc = [[AppConfigViewController alloc] init];
  [self.navigationController pushViewController:acvc animated:YES];
}
- (void)setMainView {
  
  self.view.backgroundColor = kJFViewBackgroudColor;
  
  UIImageView *imageview = [[UIImageView alloc] initWithFrame:CGRectMake(50, 75, kJFScreenWidth - 100, (kJFScreenWidth - 100) * 346 / 515)];
  imageview.image = [UIImage imageNamed:@"debugimage"];
  [self.view addSubview:imageview];
  
  UILabel *titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(20, CGRectGetMaxY(imageview.frame) + 15, kJFScreenWidth-40, 60)];
  titleLabel.text = kJFDefaultLocalizedString(kJFBaseWelcomeString);
  titleLabel.textColor = kJFTextColor;
  titleLabel.font = [UIFont systemFontOfSize:18.0];
  titleLabel.textAlignment = NSTextAlignmentCenter;
  titleLabel.numberOfLines = 2;
  [self.view addSubview:titleLabel];
  
  UIButton *mUSBButton = [UIButton buttonWithType:UIButtonTypeSystem];
  mUSBButton.frame = CGRectMake(20, CGRectGetMaxY(titleLabel.frame) + 20, kJFScreenWidth - 40, 50);
  [mUSBButton setTitle:kJFDefaultLocalizedString(kJFUSBDebug) forState:UIControlStateNormal];
  [mUSBButton setTitleColor:kJFButtonTextColor forState:UIControlStateNormal];
  mUSBButton.backgroundColor = kJFButtonBackgroundColor;
  [mUSBButton addTarget:self action:@selector(usbButtonClicked:) forControlEvents:UIControlEventTouchUpInside];
  mUSBButton.layer.masksToBounds = YES;
  mUSBButton.layer.cornerRadius = 5.0;
  [self.view addSubview:mUSBButton];
  
  UIButton *mWiFiButton = [UIButton buttonWithType:UIButtonTypeSystem];
  mWiFiButton.frame = CGRectMake(20, CGRectGetMaxY(mUSBButton.frame) + 20, kJFScreenWidth - 40, 50);
  [mWiFiButton setTitle:kJFDefaultLocalizedString(kJFWiFiDebug) forState:UIControlStateNormal];
  [mWiFiButton setTitleColor:kJFButtonTextColor forState:UIControlStateNormal];
  mWiFiButton.backgroundColor = kJFButtonBackgroundColor;
  [mWiFiButton addTarget:self action:@selector(wifiButtonClicked:) forControlEvents:(UIControlEventTouchUpInside)];
  mWiFiButton.layer.masksToBounds = YES;
  mWiFiButton.layer.cornerRadius = 5.0;
  [self.view addSubview:mWiFiButton];
  
  UIImageView *smallImageView = [[UIImageView alloc] initWithFrame:CGRectMake(kJFScreenWidth / 2 - 40, kJFScreenHeight - 80 - kJFSafeAreaHeight, 80, 18)];
  smallImageView.image = [UIImage imageNamed:@"smallIcon"];
  [self.view addSubview:smallImageView];
  
  UILabel *appVerionLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, kJFScreenHeight - 60 - kJFSafeAreaHeight, kJFScreenWidth, 40)];
  appVerionLabel.textColor = kJFLightTextColor;
  appVerionLabel.font = [UIFont systemFontOfSize:16.0];
  appVerionLabel.textAlignment = NSTextAlignmentCenter;

  NSString *appVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
  NSString *buildVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey:(NSString *)kCFBundleVersionKey];
  appVerionLabel.text = [NSString stringWithFormat:@"%@ : %@ (%@ : %@)", kJFDefaultLocalizedString(kJFAppVersion), appVersion, kJFDefaultLocalizedString(kJFBuildVersion), buildVersion];
  [self.view addSubview:appVerionLabel];
}
#pragma mark - 点击响应事件
- (void)usbButtonClicked:(UIButton *)button {
  
  JFSettingViewController *mUSBViewController = [[JFSettingViewController alloc] init];
  mUSBViewController.isWiFiDebugging = NO;
  [self.navigationController pushViewController:mUSBViewController animated:YES];
}

- (void)wifiButtonClicked:(UIButton *)button {
  
  JFSettingViewController *mWiFiViewController = [[JFSettingViewController alloc] init];
  mWiFiViewController.isWiFiDebugging = YES;
  [self.navigationController pushViewController:mWiFiViewController animated:YES];
}
@end
