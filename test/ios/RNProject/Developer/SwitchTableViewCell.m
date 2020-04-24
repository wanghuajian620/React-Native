//
//  SwitchTableViewCell.m
//  ReactNativeWorkBase
//
//  Created by Elvis on 2019/9/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "SwitchTableViewCell.h"

@implementation SwitchTableViewCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

//- (IBAction)valueChanged:(UISwitch *)sender {
//  
//  if (self.valueDidChanged) {
//    
//    self.valueDidChanged(sender.on);
//  }
//}
@end
