//
//  FBYDevicetokenUpload.h
//  ReactNativeWork
//
//  Created by Admin on 2018/8/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FBYDevicetokenUpload : NSObject

/**
 上传Device Token至服务器

 @param deviceToken Device Token
 */
- (void)networkDeviceToken:(NSString *)deviceToken;

@end
