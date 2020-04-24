//
//  JFRNMainViewController.h
//  JFRNMainViewController
//
//  Created by Elvis on 2019/06/27.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface JFRNMainViewController : UIViewController

/**
 加载jsbundle

 @param bundlePath jsbundle路径
 @param moudleName jsbundle主Moudle的名称
 */
- (void)loadJSBundle:(NSString*)bundlePath bundleMoudleName:(NSString *)moudleName;

@end
