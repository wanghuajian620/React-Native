//
//  JFSettingViewController.m
//  ReactNativeWork
//
//  Created by Elvis on 2019/6/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "JFSettingViewController.h"
#import "GlobalDefine.h"
#import "JFToolDefine.h"
#import "UIColor+Hex.h"

#import "JFRNMainViewController.h"
#import "JFFailureViewController.h"

NSString * const kJFUSBDebug = @"USBDebug"; // @"USB 调试";
NSString * const kJFWiFiDebug = @"WiFiDebug"; // @"WIFI 调试";
NSString * const kJFIPAddress = @"IPAddress:"; // @"IP地址:";
NSString * const kJFPort = @"Port:"; // @"端口号:";

@interface JFSettingViewController ()

/** ip地址 */
@property (strong, nonatomic) UITextField *internetProtocolTextField;

/** port地址 */
@property (strong, nonatomic) UITextField *portTextField;

/** 小菊花lalala... */
@property (nonatomic, strong) UIActivityIndicatorView *activityIndicator;

@end

@implementation JFSettingViewController

- (void)viewDidLoad {
  
  [super viewDidLoad];

  [self setNavigationBar];
  [self setConfigView];
  [self setActivityIndicatorView];
  
  [self setDefaultValue];
}

#pragma mark - 创建视图
/** 创建导航控制器视图 */
- (void)setNavigationBar {
  
  self.navigationController.navigationBar.barTintColor = kJFNavigationBarTintColor; //导航栏
  
  //标题
  UILabel *titleLable = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 136 * kJFScreenWidthScale, 16)];
  titleLable.font = [UIFont boldSystemFontOfSize:18];
  titleLable.text = (_isWiFiDebugging ? kJFDefaultLocalizedString(kJFWiFiDebug) : kJFDefaultLocalizedString(kJFUSBDebug));
  titleLable.textAlignment = NSTextAlignmentCenter;
  titleLable.textColor = [UIColor whiteColor];
  self.navigationItem.titleView = titleLable;
  //左键
  self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc]initWithImage:[UIImage imageNamed:@"back"] style:UIBarButtonItemStylePlain target:self action:@selector(backButtonClicked)];
  [self.navigationItem.leftBarButtonItem setImageInsets:UIEdgeInsetsMake(0, -35, 0, 0)];
  [self.navigationItem.leftBarButtonItem setTintColor:kJFNavigationTextColor];
}
/** 创建配置页面视图 */
- (void)setConfigView {
  
  self.view.backgroundColor = kJFViewBackgroudColor;
  
  UIView *baseView = [[UIView alloc] initWithFrame:CGRectMake(0, kJFNaviagtionAndStatusBarHeight, kJFScreenWidth, kJFScreenHeight)];
  baseView.backgroundColor = kJFClearColor;
  [self.view addSubview:baseView];
  
  UILabel *ipLable = [[UILabel alloc] initWithFrame:CGRectMake(20, 110, 60, 50)];
  ipLable.text = kJFDefaultLocalizedString(kJFIPAddress);
  ipLable.textAlignment = NSTextAlignmentCenter;
  ipLable.textColor = kJFTextColor;
  [baseView addSubview:ipLable];
  
  self.internetProtocolTextField = [[UITextField alloc] initWithFrame:CGRectMake(90, 110, kJFScreenWidth - 110, 50)];
  self.internetProtocolTextField.layer.masksToBounds = YES;
  self.internetProtocolTextField.layer.borderColor = [kJFTextFieldBorderColor CGColor];
  self.internetProtocolTextField.layer.borderWidth = 1;
  self.internetProtocolTextField.layer.cornerRadius = 5;
  self.internetProtocolTextField.backgroundColor = kJFButtonTextColor;
  [baseView addSubview:self.internetProtocolTextField];
  
  UILabel *portLable = [[UILabel alloc] initWithFrame:CGRectMake(20, 195, 60, 50)];
  portLable.text = kJFDefaultLocalizedString(kJFPort);
  portLable.textAlignment = NSTextAlignmentCenter;
  portLable.textColor = kJFTextColor;
  [baseView addSubview:portLable];
  
  self.portTextField = [[UITextField alloc] initWithFrame:CGRectMake(90, 195, kJFScreenWidth-110,50)];
  self.portTextField.layer.masksToBounds = YES;
  self.portTextField.layer.borderColor = [kJFTextFieldBorderColor CGColor];
  self.portTextField.layer.borderWidth = 1;
  self.portTextField.layer.cornerRadius = 5;
  self.portTextField.backgroundColor = kJFButtonTextColor;
  [baseView addSubview:self.portTextField];
  
  /** 确认按钮 */
  UIButton *confirmButton = [UIButton buttonWithType:UIButtonTypeSystem];
  confirmButton.frame = CGRectMake(20, 330, kJFScreenWidth - 40, 50);
  confirmButton.backgroundColor = kJFButtonBackgroundColor;
  [confirmButton setTitle:kJFDefaultLocalizedString(kJFStringConfirm) forState:UIControlStateNormal];
  [confirmButton setTitleColor:kJFButtonTextColor forState:UIControlStateNormal];
  confirmButton.layer.masksToBounds = YES;
  confirmButton.layer.cornerRadius = 5;
  [confirmButton addTarget:self action:@selector(confirmButtonClicked:) forControlEvents:UIControlEventTouchUpInside];
  [baseView addSubview:confirmButton];
}
- (void)setActivityIndicatorView {
  
  self.activityIndicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
  [self.view addSubview:self.activityIndicator];
  self.activityIndicator.frame = CGRectMake((kJFScreenWidth - 200) / 2, (kJFScreenHeight - 200) / 2, 200, 200);
  self.activityIndicator.color = [UIColor lightGrayColor];
  self.activityIndicator.backgroundColor = [UIColor clearColor];
  self.activityIndicator.hidesWhenStopped = YES;
}
#pragma mark - 设置默认值
/** 设置默认值 */
- (void)setDefaultValue {
  
  NSDictionary *ipConfig = [JFUserDefaultsTool getUserDefaultsWithKey:kJFKeyDeveloperUserInfo];
  NSString *ipString = [ipConfig objectForKey:@"ip"];
  self.internetProtocolTextField.text = kJFValidationString(ipString) ? ipString : @"192.168.1.101";
  
  NSString *portString = [ipConfig objectForKey:@"port"];
  self.portTextField.text = (kJFValidationString(portString) ? portString : @"8081");
}
#pragma mark - 点击事件
/** 导航控制器返回按钮点击事件 */
- (void)backButtonClicked {
  
  [[UIApplication sharedApplication].keyWindow endEditing:YES];
  [self.view endEditing:YES];
  [self.navigationController popViewControllerAnimated:YES];
}
/** 确认按钮点击事件 */
- (void)confirmButtonClicked:(UIButton *)button {
  
  button.enabled = NO;
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    button.enabled = YES;
  });
  
  NSString *ipInputString = self.internetProtocolTextField.text;
  NSString *portInputString = self.portTextField.text;
  
  [self.activityIndicator startAnimating];
  
  NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@%@:%@", kJFHttpHeader, ipInputString, portInputString]];
  //会话
  NSURLSession *session = [NSURLSession sharedSession];
  NSURLSessionDataTask *task = [session dataTaskWithURL:url completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    
    dispatch_async(dispatch_get_main_queue(), ^{
      
      [self.activityIndicator stopAnimating];

      if (error) {
        
        CIBWarningLog(@"该IP地址无法连接 : %@", error);
        JFFailureViewController *failureViewController = [[JFFailureViewController alloc] init];
        [self.navigationController pushViewController:failureViewController animated:YES];
      } else {
        
        if (kJFValidationString(ipInputString) && kJFValidationString(portInputString)) {
          
          [JFUserDefaultsTool saveUserDefaultsWithValue:@{@"ip":ipInputString,@"port":portInputString} key:kJFKeyDeveloperUserInfo];
        }
        CIBInfoLog(@"链接成功");
        
        NSString *startPagePath = kJFDefaultDeveloperStartPage;
        NSString *startComponent = kJFDefaultModuleName;
        [GlobalFunction saveDeveloperStartPage:startPagePath component:startComponent];
        
        if ([[startPagePath pathExtension] isEqualToString:@"js"] || [[startPagePath pathExtension] isEqualToString:@"jsbundle"] || [[startPagePath pathExtension] isEqualToString:@"bundle"]) {
          
          startPagePath = [[startPagePath lastPathComponent] stringByReplacingOccurrencesOfString:[NSString stringWithFormat:@".%@", [startPagePath pathExtension]] withString:@""];
        }
        startPagePath = [NSString stringWithFormat:@"%@%@:%@/%@.bundle?platform=ios&dev=true&minify=false", kJFHttpHeader, ipInputString, portInputString, startPagePath];
        
        JFRNMainViewController *rootVC = [[JFRNMainViewController alloc] init];
        [rootVC loadJSBundle:startPagePath bundleMoudleName:startComponent];
        [self presentViewController:rootVC animated:YES completion:nil];
      }
    });
  }];
  [task resume];
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
  
  [[UIApplication sharedApplication].keyWindow endEditing:YES];
  [self.view endEditing:YES];
}

@end
