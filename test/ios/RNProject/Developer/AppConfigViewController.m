//
//  AppConfigViewController.m
//  ReactNativeWork
//
//  Created by Elvis on 2019/9/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AppConfigViewController.h"
#import "GlobalDefine.h"
#import "JFToolDefine.h"
#import "UIColor+Hex.h"
#import "ConfigTableViewCell.h"
#import "SwitchTableViewCell.h"

#import "JFNetworkHelper.h"

NSString * const kJFAppConfig = @"AppConfig"; // @"应用配置";

NSString * const kJFTextLabel = @"textLable"; // @"应用配置";
NSString * const kJFEdited = @"isEdited"; // @"是否可以编辑";
NSString * const kJFDetailLabel = @"detailLabel"; // @"应用配置";
NSString * const kJFInputType = @"inputType"; // @"应用配置";
NSString * const kJFTag = @"tag"; // @"应用配置";
NSString * const kJFInputPlaceholder = @"placeholder"; // @"应用配置";
NSString * const kJFRules = @"rules"; // @"应用配置";
NSString * const kJFValue = @"value"; // @"应用配置";
NSString * const kJFPrompt = @"prompt"; // @"应用配置";
NSString * const kJFMaxLength = @"maxLength"; // @"应用配置";
NSString * const kJFKeyValue = @"keyValue"; // @"键值";
NSString * const kJFInputTypeInput = @"input"; // @"应用配置";
NSString * const kJFInputTypeSwitch = @"switch"; // @"应用配置";

NSString * const kJFStringChannelNumber = @"channelNumber"; // @"渠道编号";
NSString * const kJFStringInterfaceUrl = @"interfaceUrl"; // @"接口地址";
NSString * const kJFStringHttpPort = @"httpPort"; // @"渠道编号";
NSString * const kJFStringHttpsPort = @"httpsPort"; // @"渠道编号";

NSString * const kJFStringWXShareID = @"WXShareID"; // @"微信分享ID";
NSString * const kJFStringWBShareKey = @"WBShareKey"; // @"微博分享ID";
NSString * const kJFStringQQShareID = @"QQShareID"; // @"QQ分享ID";
NSString * const kJFStringCheckIntegrity = @"isCheckIntegrity"; // @"完整性校验"
NSString * const kJFStringIndustrialBankHTTPChannel = @"IndustrialBankHTTPChannel"; // @"加密通道"
NSString * const kJFStringHTTPChannel = @"HTTPChannel"; // @"Https设置"

@interface AppConfigViewController () <UITableViewDelegate, UITableViewDataSource, UITextFieldDelegate> {
  
  UITableView *listTableView;
  NSMutableArray *dataTableView;
}

@property(nonatomic, strong) JFNetworkHelper *netWorkHelper;

@end

@implementation AppConfigViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  self.view.backgroundColor = kJFViewBackgroudColor;
  
  NSString *appConfigPath = [[NSBundle mainBundle] pathForResource:@"AppConfig" ofType:@"plist"];
  dataTableView = [[NSArray arrayWithContentsOfFile:appConfigPath] mutableCopy];
  
  listTableView = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, kJFScreenWidth, kJFScreenHeight) style:UITableViewStylePlain];
  listTableView.estimatedRowHeight = 60;
  listTableView.rowHeight = UITableViewAutomaticDimension;
  listTableView.estimatedSectionHeaderHeight = 0;
  listTableView.estimatedSectionFooterHeight = 0;
  
  listTableView.delegate = self;
  listTableView.dataSource = self;
  [self.view addSubview:listTableView];
  
  [self setNavigationBar];
}
- (void)setNavigationBar {
  
  self.navigationController.navigationBar.barTintColor = kJFNavigationBarTintColor; //导航栏
  
  //标题
  UILabel *titleLable = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 136 * kJFScreenWidthScale, 16)];
  titleLable.font = [UIFont boldSystemFontOfSize:18];
  titleLable.text = kJFDefaultLocalizedString(kJFAppConfig);
  titleLable.textAlignment = NSTextAlignmentCenter;
  titleLable.textColor = [UIColor whiteColor];
  self.navigationItem.titleView = titleLable;
  //左键
  self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc]initWithImage:[UIImage imageNamed:@"back"] style:UIBarButtonItemStylePlain target:self action:@selector(backButtonClicked)];
  [self.navigationItem.leftBarButtonItem setImageInsets:UIEdgeInsetsMake(0, -35, 0, 0)];
  [self.navigationItem.leftBarButtonItem setTintColor:kJFNavigationTextColor];
  
  UIButton *appSettingButton = [UIButton buttonWithType:UIButtonTypeCustom];
  [appSettingButton setTitle:@"保存" forState:UIControlStateNormal];
  appSettingButton.frame = CGRectMake(0, 0, 64., 20.);
  [appSettingButton sizeToFit];
  [appSettingButton addTarget:self action:@selector(saveSettingButtonClick:) forControlEvents:UIControlEventTouchUpInside];
  self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:appSettingButton];
}
- (void)backButtonClicked {
  
  [[UIApplication sharedApplication].keyWindow endEditing:YES];
  [self.view endEditing:YES];
  [self.navigationController popViewControllerAnimated:YES];
}
- (void)saveSettingButtonClick:(UIButton *)button {
  
  
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  
  return dataTableView.count;
}
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  
  if ([[[dataTableView objectAtIndex:indexPath.row] objectForKey:kJFInputType] isEqualToString:kJFInputTypeSwitch]) {

    SwitchTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:NSStringFromClass([SwitchTableViewCell class])];
    if(!cell) {
      
      cell = [[[NSBundle mainBundle] loadNibNamed:NSStringFromClass([SwitchTableViewCell class]) owner:self options:nil] objectAtIndex:0];
    }
    cell.openSwitch.tag = [[[dataTableView objectAtIndex:indexPath.row] objectForKey:kJFTag] integerValue];
    [cell.openSwitch addTarget:self action:@selector(switchAction:) forControlEvents:UIControlEventValueChanged];
    cell.openSwitch.on = [[[dataTableView objectAtIndex:indexPath.row] objectForKey:kJFKeyValue] boolValue];
    cell.openSwitch.userInteractionEnabled = [[[dataTableView objectAtIndex:indexPath.row] objectForKey:kJFEdited] boolValue];
//    cell.valueDidChanged = ^(BOOL isOn) {
//
//    };
    NSString *titleTextKey = [[dataTableView objectAtIndex:indexPath.row] objectForKey:kJFKeyValue];
//    NSArray *
    cell.titleLabel.text = kJFDefaultLocalizedString(titleTextKey);
    
    return cell;
  } else if ([[[dataTableView objectAtIndex:indexPath.row] objectForKey:kJFInputType] isEqualToString:kJFInputTypeInput]) {
    
    ConfigTableViewCell * cell = [tableView dequeueReusableCellWithIdentifier:NSStringFromClass([ConfigTableViewCell class])];
    if(!cell) {
      
      cell = [[[NSBundle mainBundle] loadNibNamed:NSStringFromClass([ConfigTableViewCell class]) owner:self options:nil] objectAtIndex:0];
    }
    cell.inputTextField.tag = [[[dataTableView objectAtIndex:indexPath.row] objectForKey:kJFTag] integerValue];
    cell.inputTextField.placeholder = [[dataTableView objectAtIndex:indexPath.row] objectForKey:kJFInputPlaceholder];
    NSString *titleTextKey = [[dataTableView objectAtIndex:indexPath.row] objectForKey:kJFTextLabel];
    cell.titleLabel.text = kJFDefaultLocalizedString(titleTextKey);
    cell.inputTextField.userInteractionEnabled = [[[dataTableView objectAtIndex:indexPath.row] objectForKey:kJFEdited] boolValue];
    cell.inputTextField.delegate = self;
    cell.inputTextField.text = [GlobalFunction getProjectSettingWithKey:titleTextKey];
    [cell.inputTextField addTarget:self action:@selector(textFieldDidChange:) forControlEvents:UIControlEventEditingChanged];
    return cell;
  }
  return nil;
}
- (void)switchAction:(UISwitch *)mySwitch {
  
  SwitchTableViewCell *cell = (SwitchTableViewCell *)[[mySwitch superview] superview];
  NSIndexPath *indexPath = [listTableView indexPathForCell:cell];
  NSMutableDictionary *data = [[self getConfigDataWithTag:indexPath.row + 1101] mutableCopy];

  if (!cell.openSwitch.on) {
    
    [data setValue:[NSNumber numberWithBool:NO] forKey:kJFValue];
  } else {
    
    [data setValue:[NSNumber numberWithBool:YES] forKey:kJFValue];
  }
  [dataTableView replaceObjectAtIndex:indexPath.row withObject:data];
  [listTableView reloadData];
}

- (void)textFieldDidChange:(UITextField*)textField {
  
  NSDictionary *info = [self getConfigDataWithTag:textField.tag];
  CGFloat maxLength = [[info objectForKey:kJFMaxLength] floatValue];
  NSString *toBeString = textField.text;
  //获取高亮部分
  UITextRange *selectedRange = [textField markedTextRange];
  UITextPosition *position = [textField positionFromPosition:selectedRange.start offset:0];
  if (!position || !selectedRange) {
    
    if (toBeString.length > maxLength) {
      
      NSRange rangeIndex = [toBeString rangeOfComposedCharacterSequenceAtIndex:maxLength];
      if (rangeIndex.length == 1) {
        
        textField.text = [toBeString substringToIndex:maxLength];
      } else {
        
        NSRange rangeRange = [toBeString rangeOfComposedCharacterSequencesForRange:NSMakeRange(0, maxLength)];
        textField.text = [toBeString substringWithRange:rangeRange];
      }
    }
  }
}

- (void)textFieldDidBeginEditing:(UITextField *)textField {
  
  
}
- (void)textFieldDidEndEditing:(UITextField *)textField {
  
  NSDictionary *info = [self getConfigDataWithTag:textField.tag];
  if ([textField.text length] > 0) {
    
    BOOL result = false;
    NSPredicate *pred = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", [info objectForKey:kJFRules]];
    result = [pred evaluateWithObject:textField.text];
    if (!result) {
      
      
    } else {
      
      
    }
  }
}
- (BOOL)textFieldShouldClear:(UITextField *)textField {
  
  return YES;
}
- (BOOL)textFieldShouldReturn:(UITextField *)textField {
  
  return YES;
}

- (NSMutableDictionary *)getConfigDataWithTag:(NSUInteger)controlTag {
  
  for (NSMutableDictionary *info in dataTableView) {
    
    NSUInteger tag = [[info objectForKey:kJFTag] integerValue];
    if (controlTag == tag) {
      
      return info;
    }
  }
  return nil;
}

#pragma mark - 获取对应值
- (id)getValue:(NSString *)key {
  
  return nil;
}
#pragma mark - lazy load
- (JFNetworkHelper *)netWorkHelper {
  
  if (!_netWorkHelper) {
    
    _netWorkHelper = [[JFNetworkHelper alloc] init];
  }
  return _netWorkHelper;
}

@end
