/*
 * MIT License
 *
 * Copyright (c) 2018 SmartestEE Co., Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2018/03/03        Wang Huajian
 */

import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Navigator, { dispatcher } from '../../helper/navigator';

import DiscountCard from '../Vip/Components/DiscountCard';

class Discount extends React.Component {
  render() {
    const dispatch = dispatcher(this.props);
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <DiscountCard
          item={this.props.discount[0]}
          onPress={() => dispatch(Navigator.navigate('Detail'))}
        />
        <DiscountCard item={this.props.discount[1]} />
        <DiscountCard item={this.props.discount[2]} />
        <DiscountCard item={this.props.discount[3]} />
        <DiscountCard item={this.props.discount[4]} />
        <DiscountCard item={this.props.discount[5]} />
        <DiscountCard item={this.props.discount[6]} />
      </ScrollView>
    );
  }
}

export default connect(({ vip }) => ({
  discount: vip.discount,
}))(Discount);
