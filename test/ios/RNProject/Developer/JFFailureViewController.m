//
//  JFFailureViewController.m
//  ReactNativeWork
//
//  Created by Elvis on 2019/6/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "JFFailureViewController.h"
#import "GlobalDefine.h"
#import "UIColor+Hex.h"

NSString * const kJFStringIPAddressAndPortIncorrect = @"IPAddressAndPortIncorrect"; //@"请输入正确的IP地址或端口号";

@implementation JFFailureViewController

- (void)viewDidLoad {
  
  [super viewDidLoad];
  
  [self setNavigationBar];
  [self setMainView];
}
#pragma mark - 创建视图
/** 设置导航栏 */
- (void)setNavigationBar {
  
  //标题
  UILabel *titleLable = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 136 * kJFScreenWidthScale, 16)];
  titleLable.font = [UIFont boldSystemFontOfSize:18];
  titleLable.text = @"404";
  titleLable.textAlignment = NSTextAlignmentCenter;
  titleLable.textColor = [UIColor whiteColor];
  self.navigationItem.titleView = titleLable;
  //左键
  self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc]initWithImage:[UIImage imageNamed:@"back"] style:UIBarButtonItemStylePlain target:self action:@selector(backButtonClicked)];
  [self.navigationItem.leftBarButtonItem setImageInsets:UIEdgeInsetsMake(0, -35, 0, 0)];
  [self.navigationItem.leftBarButtonItem setTintColor:kJFNavigationTextColor];
}

- (void)setMainView {
  
  UIView *baseView = [[UIImageView alloc]initWithFrame:CGRectMake(0, kJFNaviagtionAndStatusBarHeight, kJFScreenWidth, kJFScreenHeight)];
  baseView.backgroundColor = [UIColor colorWithRed:250/255.0 green:250/255.0 blue:250/255.0 alpha:1];
  [self.view addSubview:baseView];
  
  UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(50, 75, kJFScreenWidth - 100, (kJFScreenWidth - 100) * 346 / 515)];
  imageView.image = [UIImage imageNamed:@"debugimage"];
  [baseView addSubview:imageView];
  
  UILabel *titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(20, CGRectGetMaxY(imageView.frame) + 15, kJFScreenWidth - 40, 30)];
  titleLabel.text = kJFDefaultLocalizedString(kJFStringIPAddressAndPortIncorrect);
  titleLabel.textColor = kJFTextColor;
  titleLabel.font = [UIFont systemFontOfSize:18.0];
  titleLabel.textAlignment = NSTextAlignmentCenter;
  [baseView addSubview:titleLabel];
}

#pragma mark - 点击事件
/** 导航控制器返回按钮点击事件 */
- (void)backButtonClicked {
  
  [self.navigationController popViewControllerAnimated:YES];
}

@end
