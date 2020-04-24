//
//  FBYDevicetokenUpload.m
//  ReactNativeWork
//
//  Created by Admin on 2018/8/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "FBYDevicetokenUpload.h"
#import "JFNetworkManager.h"

@implementation FBYDevicetokenUpload

- (void)networkDeviceToken:(NSString *)deviceToken {
  
  /* 请求参数 */
  NSString *uploadString = kJFValidationString(deviceToken) ? deviceToken : [DeviceBase deviceIdentifier];
  
  DeviceModel *deviceInformation = [DeviceBase  getDeviceInformation];
  NSMutableDictionary *params = [
                                                        @{@"req_msg":
                                                              @{
                                                                    @"devicetoken": uploadString,
                                                                    @"imei1": uploadString,
                                                                    @"imei2":@"",
                                                                    @"meid":@"",
                                                                    @"dl": kJFSafeString(deviceInformation.batteryLevel),
                                                                    @"fbl": kJFSafeString(deviceInformation.deviceResolution),
                                                                    @"cckj": kJFSafeString(deviceInformation.storageSpaces),
                                                                    @"yxnc": kJFSafeString(deviceInformation.memory),
                                                                    @"sfyy": (deviceInformation.isJailbreakDevice ? @"1" : @"0"),
                                                                    @"xtbb": kJFSafeString(deviceInformation.systemVersion),
                                                                    @"bbh": kJFSafeString([NSString stringWithFormat:@"%@_%@_%@",deviceInformation.systemModel, deviceInformation.systemName, deviceInformation.systemVersion]),
                                                                    @"yy": kJFSafeString(deviceInformation.systemLanguage),
                                                                    @"sbxh": kJFSafeString(deviceInformation.deviceModel)
                                                              }
                                                        }  mutableCopy];
  NSString *allUrlStr = @"/ApiSystem/api/v1/init/upload";
  [JFNetworkManager POST:allUrlStr parameters:params success:^(id responseObject) {
    
    CIBInfoLog(@"%@",responseObject);
  } failure:^(NSError *error) {
    
    CIBErrorLog(@"%@",error);
  }];
}
@end
