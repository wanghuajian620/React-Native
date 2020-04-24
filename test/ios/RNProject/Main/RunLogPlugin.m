//
//  RunLogPlugin.m
//  RunLogPlugin
//
//  Created by 李爽 on 2018/8/13.
//  Modify by Elvis on 2019/6/17.
//  Copyright © 2018年 agree. All rights reserved.
//

#import "RunLogPlugin.h"
#import "GlobalDefine.h"
#import "JFFileOperationTool.h"
#import "JFFolderOperationTool.h"

NSString * const kJFCalledRecordJSLogFunction = @"CalledRecordJSLogFunction";
NSString * const kJFCalledUploadLogFunction = @"CalledUploadLogFunction";
NSString * const kJFCalledDeleteLogFunction = @"CalledDeleteLogFunction";

NSString * const kJFDeleteLogFileSuccess = @"DeleteLogFileSuccess";
NSString * const kJFDeleteLogFileFaild = @"DeleteLogFileFaild";
NSString * const kJFRecordJSLogSuccess = @"RecordJSLogSuccess";
NSString * const kJFRecordJSLogFaild = @"RecordJSLogFaild";

NSString * const kJFUploadURLKey = @"uploadUrl";
NSString * const kJFJSLogKey = @"jsLog";

@interface RunLogPlugin ()

@property(nonatomic, copy)  RCTResponseSenderBlock uploadSuccess;
@property(nonatomic, copy)  RCTResponseSenderBlock uploadFailure;

@end

@implementation RunLogPlugin

#pragma mark - 日志组件
RCT_EXPORT_MODULE(RunLogPlugin);
#pragma mark - 上传日志组件
RCT_EXPORT_METHOD(uploadLog:(NSDictionary *)arguments success:(RCTResponseSenderBlock)successCallback failure:(RCTResponseSenderBlock)failureCallback) {
  
  CIBDebugLog(@"%@ : %@", kJFDefaultLocalizedString(kJFCalledUploadLogFunction), kJFJsonStringFromDictionary(arguments));
  //必输参数校验
  kJFRequiredParameterVerificationHandler(^(NSUInteger code, NSString *message) {
    
    if (code != JFPluginSuccessCallback) {
      
      kJFFailureCallback(code, message, failureCallback, nil, nil, JFLogFlagWarning);
      return;
    }
  }, arguments, kJFUploadURLKey, nil);
  
  NSString *uploadUrl = arguments[kJFUploadURLKey];
  
  self.uploadSuccess = successCallback;
  self.uploadFailure = failureCallback;
  
  [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(runLogFilesUpLoadCallBack:) name:kJFNotificationKeyDidUploadLogFileNotification object:nil];
  [[NSNotificationCenter defaultCenter]postNotificationName:kJFNotificationKeyWillUploadLogFileNotification object:@{kJFUploadURLKey : uploadUrl}];
}
#pragma mark - 删除日志组件
RCT_EXPORT_METHOD(deleteLog:(RCTResponseSenderBlock)successCallback failure:(RCTResponseSenderBlock)failureCallback) {
  
  CIBDebugLog(kJFDefaultLocalizedString(kJFCalledDeleteLogFunction));
  
  BOOL deleteJSFolder = [JFFolderOperationTool deleteDirectoryAtPath:kJFJSLogFolder];
  BOOL deleteNativeFolder = [JFFolderOperationTool deleteDirectoryAtPath:kJFNativeLogFolder];
  
  if (deleteJSFolder || deleteNativeFolder) {
    
    kJFSuccessCallback(JFLogDeleteLogFileSuccess, kJFDeleteLogFileSuccess, successCallback, nil, nil);
  } else {
    
    kJFFailureCallback(JFLogDeleteLogFileFaild, kJFDeleteLogFileFaild, failureCallback, nil, nil, JFLogFlagWarning);
  }
}
#pragma mark - 记录JS日志组件
RCT_EXPORT_METHOD(recordJsLog:(NSDictionary *)arguments success:(RCTResponseSenderBlock)successCallback failure:(RCTResponseSenderBlock)failureCallback) {
  
  CIBDebugLog(@"%@ : %@", kJFDefaultLocalizedString(kJFCalledRecordJSLogFunction), kJFJsonStringFromDictionary(arguments));
  //必输参数校验
  kJFRequiredParameterVerificationHandler(^(NSUInteger code, NSString *message) {
    
    if (code != JFPluginSuccessCallback) {
      
      kJFFailureCallback(code, message, failureCallback, nil, nil, JFLogFlagWarning);
      return;
    }
  }, arguments, kJFJSLogKey, nil);
  
  NSString *logFileName = [NSString stringWithFormat:@"%@/%@.log", kJFJSLogFolder, [self getCurrentTime]];
  NSString *uploadUrlString = arguments[kJFJSLogKey];
  
  if ([JFFileOperationTool fileExistsAtPath:logFileName]) {
    
    NSFileHandle *fileHandle = [NSFileHandle fileHandleForUpdatingAtPath:[GlobalFunction pathAnalysis:logFileName]];
    [fileHandle seekToEndOfFile];  //将节点跳到文件的末尾
    NSData* stringData = [[uploadUrlString stringByAppendingString:@"\n"] dataUsingEncoding:NSUTF8StringEncoding];
    [fileHandle writeData:stringData]; //追加写入数据
    [fileHandle closeFile];
  } else {
    
    BOOL createLogJSFile = [JFFileOperationTool createFileAtPath:logFileName data:[uploadUrlString stringByAppendingString:@"\n"]];
    if (createLogJSFile) {
      
      NSArray *logJSFiles = [JFFolderOperationTool getSubpathInDirectoryPath:kJFJSLogFolder locateFileType:YES];
      if (logJSFiles.count == 10) {
        
        NSString *willDeleteFilePath = [NSString stringWithFormat:@"%@/%@", kJFJSLogFolder, logJSFiles[0]];
        [[NSFileManager defaultManager] removeItemAtPath:[GlobalFunction pathAnalysis:willDeleteFilePath] error:nil];
      }
    }
  }
  kJFSuccessCallback(JFLogRecordJSLogSuccess, kJFRecordJSLogSuccess, successCallback, nil, nil);
}

/**
 日志上传回调
 
 @param notification 监听通知
 */
- (void)runLogFilesUpLoadCallBack:(NSNotification *)notification {
  
  NSDictionary *dict = notification.object;
  if ([dict.allKeys containsObject:kJFPluginReturnCodeKey]) {
    
    kJFSuccessCallback(JFLogUploadLogFileSuccess, kJFUploadLogFileSuccess, self.uploadSuccess, nil, nil);
  } else {
    
    kJFFailureCallback(JFLogUploadLogFileFaild, kJFUploadLogFileFaild, self.uploadFailure, nil, nil, JFLogFlagWarning);
  }
  
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

/**
 获取当前时间
 
 @return 返回时间 格式:YYYY-MM-dd
 */
- (NSString *)getCurrentTime {
  
  NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
  [formatter setDateFormat:kJFDateFormatterYMD];
  NSDate *datenow = [NSDate date];
  NSString *currentTimeString = [formatter stringFromDate:datenow];
  return currentTimeString;
}

@end
