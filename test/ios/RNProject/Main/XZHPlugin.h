//
//  XZHPlugin.h
//  ReactNativeWork
//
//  Created by Elvis on 2019/12/12.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CDVPlugin.h"

NS_ASSUME_NONNULL_BEGIN

@interface XZHPlugin : CDVPlugin

- (void)getLoginInfo:(CDVInvokedUrlCommand *)command;

- (void)showFile:(CDVInvokedUrlCommand *)command;

- (void)getFileStatus:(CDVInvokedUrlCommand *)command;

- (void)closeWebapp:(CDVInvokedUrlCommand *)command;

- (void)printLog:(CDVInvokedUrlCommand *)command;

@end

NS_ASSUME_NONNULL_END
