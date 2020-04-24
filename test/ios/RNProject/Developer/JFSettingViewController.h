//
//  JFSettingViewController.h
//  ReactNativeWork
//
//  Created by Elvis on 2019/6/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "BaseViewController.h"

NS_ASSUME_NONNULL_BEGIN

UIKIT_EXTERN NSString * const kJFUSBDebug; // @"USB 调试";
UIKIT_EXTERN NSString * const kJFWiFiDebug; // @"WIFI 调试";

@interface JFSettingViewController : BaseViewController

@property (nonatomic, assign) BOOL isWiFiDebugging;

@end

NS_ASSUME_NONNULL_END
