//
//  JFRNMainViewController.m
//  JFRNMainViewController
//
//  Created by Elvis on 2019/06/27.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "JFRNMainViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "AppDelegate.h"
#import "GlobalDefine.h"

@interface JFRNMainViewController () {
  
  BOOL isEN;
  UIButton *languageButton;
  UIButton *quitButton;
}

@end

@implementation JFRNMainViewController
#pragma mark - 视图生命周期
- (void)viewWillDisappear:(BOOL)animated {
  
  [super viewWillDisappear:animated];
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)viewWillAppear:(BOOL)animated {
  
  [super viewWillAppear:animated];
  self.automaticallyAdjustsScrollViewInsets = YES;
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(reloadAppBundle:) name:kJFNotificationKeyReloadAppBundle object:nil];
}

- (void)viewDidLoad {
  
  [super viewDidLoad];
#if defined(BASE)
  [self createChangeLanguageButton];
  [self createQuitButton];
#else
#endif
}
#pragma mark - 页面
- (void)reloadAppBundle:(NSNotification *)notification {
  
  NSString *documentsPath = [GlobalFunction pathAnalysis:[NSString stringWithFormat:@"%@%@", kJFPathDocumentHeader, kJFProjectSettingPlist]];
  NSMutableDictionary *documentsDictionary = [[NSDictionary dictionaryWithContentsOfFile:[GlobalFunction pathAnalysis:documentsPath]] mutableCopy];
  [documentsDictionary setValue:[kJFPathBundleUpdateFolder stringByAppendingString:kJFDefaultBundleName] forKey:kJFStartPage];
  [documentsDictionary writeToFile:documentsPath atomically:YES];
  [self loadJSBundle:[documentsDictionary objectForKey:kJFStartPage] bundleMoudleName:[documentsDictionary objectForKey:kJFStartComponent]];
}

- (void) createChangeLanguageButton {
  
//  languageButton = [UIButton buttonWithType:UIButtonTypeCustom];
//  languageButton.frame = CGRectMake(30, 20, 44, 44);
//  [languageButton addTarget:self action:@selector(changeLanguage:) forControlEvents:UIControlEventTouchUpInside];
//  [languageButton setTitle:@"en" forState:UIControlStateNormal];
//  [languageButton setBackgroundColor:[UIColor blackColor]];
//  [self.view addSubview:languageButton];
//  if (![[GlobalFunction getProjectSettingWithKey:kJFShowProjectSettingPage] boolValue]) {
//    
//    languageButton.hidden = YES;
//  }
}

/** 功能按钮 */
- (void)createQuitButton {
  
  BOOL isShowProjectSettingPage = [[GlobalFunction getProjectSettingWithKey:kJFShowProjectSettingPage] boolValue];
  if (isShowProjectSettingPage && [GlobalFunction shareInstance].isBase) {
    
    quitButton = [UIButton buttonWithType:UIButtonTypeSystem];
    quitButton.frame = CGRectMake(kJFScreenWidth - 100, kJFScreenHeight - 64 - 100 - kJFSafeAreaHeight, 80, 80);
    quitButton.alpha = 0.5;
    quitButton.layer.masksToBounds = YES;
    quitButton.layer.cornerRadius = 40;
    quitButton.layer.borderWidth = 3;
    quitButton.layer.borderColor = [kJFButtonTextColor CGColor];
    quitButton.backgroundColor = [UIColor grayColor];
    [quitButton setTitleColor:kJFButtonTextColor forState:UIControlStateNormal];
    [quitButton setTitle:kJFDefaultLocalizedString(kJFStringQuit) forState:UIControlStateNormal];
    [quitButton addTarget:self action:@selector(closeViewController:) forControlEvents:(UIControlEventTouchUpInside)];
    [self.view addSubview:quitButton];
    
    UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(panHandler:)];
    [quitButton addGestureRecognizer:pan];
  }
}
#pragma mark 加载
/**
 加载jsbundle
 
 @param source jsbundle路径
 @param mainMoudleName jsbundle主Moudle的名称
 */
- (void)loadJSBundle:(NSString*)bundlePath bundleMoudleName:(NSString *)moudleName {
  
  if (!kJFValidationString(moudleName)) {
    
    moudleName = @"";
  }
  if (![bundlePath hasPrefix:kJFPathBundleProjectFolder] && ![bundlePath hasPrefix:kJFPathBundleUpdateFolder]) {
    
    NSRange hasPrefixHeader = [bundlePath rangeOfString:@"://"];
    if (hasPrefixHeader.location == NSNotFound) {
      
      bundlePath = [kJFPathBundleProjectFolder stringByAppendingString:bundlePath]; //wubiao
    } else {
      
      if ([bundlePath hasPrefix:kJFPathProjectHeader]) {
        
        bundlePath = [bundlePath stringByReplacingOccurrencesOfString:kJFPathProjectHeader withString:kJFPathBundleProjectFolder];
      } else if ([bundlePath hasPrefix:kJFPathDocumentHeader]) {
        
        bundlePath = [bundlePath stringByReplacingOccurrencesOfString:kJFPathDocumentHeader withString:kJFPathBundleUpdateFolder];
      } else {
        
        CIBErrorLog(@"%@ : %@", bundlePath, kJFDefaultLocalizedString(kJFStringParametersFormatError));
      }
    }
  }
  
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  NSDictionary *launchOptions = app.launchOptions;
  
  NSURL *jsCodeLocation = [NSURL URLWithString:[GlobalFunction pathAnalysis:bundlePath]];
  
  RCTRootView *rootView;
  NSDictionary *remoteUserInfo = launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey];
  if (remoteUserInfo) {
    
    rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:moudleName initialProperties:@{@"remotePushInfo" : remoteUserInfo} launchOptions:launchOptions];
  } else {
    
    rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:moudleName initialProperties:nil launchOptions:launchOptions];
  }
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.view = rootView;
  
  /** 添加自定义按钮 */
  if (![quitButton superview]) {
    
    [self createQuitButton];
    [rootView addSubview:quitButton];
  }
  if (![languageButton superview]) {
    
    [self createChangeLanguageButton];
    [rootView addSubview:languageButton];
  }
}
- (void)colorChange {
  
  self.view.backgroundColor = [UIColor colorWithRed:arc4random()%255/255.f green:arc4random()%255/255.f blue:arc4random()%255/255.f alpha:1];
}
#pragma mark - 响应事件
- (void)closeViewController:(UIButton *)button {
  
  [self dismissViewControllerAnimated:YES completion:nil];
  
}

- (void)panHandler:(UIPanGestureRecognizer *)pan {
  
  CGPoint point = [pan locationInView:self.view];
  quitButton.center = point;
}

- (void)changeLanguage:(UIButton *) button {
  
  isEN = !isEN;
  if (isEN) {
    
    kJFSetAppLanguage(kJFLanguage_EN);
    [button setTitle:kJFLanguage_SC forState:UIControlStateNormal];
  } else {
    
    kJFSetAppLanguage(kJFLanguage_SC);
    [button setTitle:kJFLanguage_EN forState:UIControlStateNormal];
  }
}
@end
