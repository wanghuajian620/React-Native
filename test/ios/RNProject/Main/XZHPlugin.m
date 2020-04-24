//
//  XZHPlugin.m
//  ReactNativeWork
//
//  Created by Elvis on 2019/12/12.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "XZHPlugin.h"
#import "GlobalDefine.h"
#import "JFFileOperationTool.h"

@implementation XZHPlugin

- (void)getLoginInfo:(CDVInvokedUrlCommand *)command {
  
  dispatch_async(dispatch_get_main_queue(), ^{
      
      
  });
}
- (void)showFile:(CDVInvokedUrlCommand *)command {
  
  dispatch_async(dispatch_get_main_queue(), ^{
      
      
  });
}
- (void)getFileStatus:(CDVInvokedUrlCommand *)command {
  
  dispatch_async(dispatch_get_main_queue(), ^{
      
      
  });
}
- (void)invoke:(CDVInvokedUrlCommand *)command {
    
    dispatch_async(dispatch_get_main_queue(), ^{
      
      NSDictionary *arguments = kJFValidationArray(command.arguments) ? command.arguments[0] : nil;
      CIBDebugLog(@"%@", kJFJsonStringFromDictionary(arguments));
      NSString *uri = [NSString stringWithFormat:@"%@%@.json",kJFPathProjectHeader, arguments[@"uri"]];
      NSString *path = [GlobalFunction pathAnalysis:uri];
      if ([JFFileOperationTool fileExistsAtPath:path]) {

        NSData *data = [NSData dataWithContentsOfFile:path];
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        
        NSDictionary *returnDictionary = @{@"flag":@"0",@"info":dic};
        NSData *encodeData = [NSJSONSerialization dataWithJSONObject:returnDictionary options:0 error:nil];
        NSString *returnString = [[NSString alloc] initWithData:encodeData encoding:NSUTF8StringEncoding];
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:returnString];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
      } else {
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"无数据"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
      }
    });
}

- (void)closeWebapp:(CDVInvokedUrlCommand *)command {
    
    dispatch_async(dispatch_get_main_queue(), ^{
        
        [JFPresentViewController() dismissViewControllerAnimated:YES completion:^{
            
            kJFSuccessCallback(0, kJFStringOK, nil, command.callbackId, self);
        }];
    });
}

- (void)printLog:(CDVInvokedUrlCommand *)command {
    
    dispatch_async(dispatch_get_main_queue(), ^{
        
      CIBJSLog(@"%@", command.arguments[0]);
    });
}

@end
