//
//  SwitchTableViewCell.h
//  ReactNativeWorkBase
//
//  Created by Elvis on 2019/9/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

//typedef void(^SwitchBlock)(BOOL isOn);
@interface SwitchTableViewCell : UITableViewCell

@property (strong, nonatomic) UILabel *titleLabel;
@property (strong, nonatomic) UISwitch *openSwitch;

//@property (copy, nonatomic) SwitchBlock valueDidChanged;
@end

NS_ASSUME_NONNULL_END
