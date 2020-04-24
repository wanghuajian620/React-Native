//
//  TokenManager.m
//  startupdatabase
//
//  Created by Admin on 2018/9/1.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "TokenManager.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>
#import "GlobalConst.h"

@implementation TokenManager {
  bool hasListeners;
}


RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *)zone {
  
  static TokenManager *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (NSArray<NSString *> *)supportedEvents {
  
  return @[kJFNotificationKeyRecivedPushNotification];
}

- (NSDictionary *)constantsToExport {
  
  return @{@"pushNotification" : kJFNotificationKeyRecivedPushNotification};
}
// 在添加第一个监听函数时触发
- (void)startObserving {
  
  hasListeners = YES;
}
// 取消监听时触发
- (void)stopObserving {
  
  hasListeners = NO;
}

- (void)sendNoticeWithEventName:(NSString *)eventName Dict:(NSDictionary *)dict {
  
  if (hasListeners) {
    
    [self sendEventWithName:eventName body:dict];
  }
}

@end
