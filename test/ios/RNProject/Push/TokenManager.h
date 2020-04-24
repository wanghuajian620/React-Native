//
//  TokenManager.h
//  startupdatabase
//
//  Created by Admin on 2018/9/1.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface TokenManager : RCTEventEmitter <RCTBridgeModule>

/**
 实例化Token管理器
 */
+ (id)allocWithZone:(NSZone *)zone;

/**
 发送接受的消息

 @param eventName 时间名称
 @param dict 消息
 */
- (void)sendNoticeWithEventName:(NSString *)eventName Dict:(NSDictionary *)dict;

@end
