//
//  ConfigTableViewCell.m
//  ReactNativeWorkBase
//
//  Created by Elvis on 2019/9/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "ConfigTableViewCell.h"

@implementation ConfigTableViewCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
  
  if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
    
    
  }
  return self;
}
- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
