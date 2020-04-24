//
//  ConfigTableViewCell.h
//  ReactNativeWorkBase
//
//  Created by Elvis on 2019/9/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ConfigTableViewCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UITextField *inputTextField;


@end

NS_ASSUME_NONNULL_END
