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
 *     Initial: 2018/03/06        Wang Huajian
 */

import React from 'react';
import { connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Color from '../../res/color';
import Styles from '../../res/styles';

import NearCard from '../../components/NearCard';

class Shop extends React.Component {
  static navigationOptions = {
    title: '附近好店',
    headerTitleStyle: {
      color: Color.selectColor,
    },
    headerBackTitle: '你好',
    headerTintColor: Color.primary,
    gesturesEnabled: true,
  }
  render() {
    const types = [
      "咖啡馆", "餐吧", "茶空间", "旅舍", "甜品铺", "工作室", "艺术空间", "生活馆",
    ];

    return (
      <ScrollableTabView
        tabBarBackgroundColor={Color.backgroundColor}
        tabBarActiveTextColor={Color.selectColor}
        tabBarInactiveTextColor={Color.primary}
        tabBarUnderlineStyle={{
          backgroundColor: Color.selectColor,
          height: Styles.Height(4),
        }}
        renderTabBar={() => <ScrollableTabBar />}
      >
        {types.map((value, i) => {
          const keys = Object.keys(this.props.shop);
          return <NearCard key={i} // eslint-disable-line
            tabLabel={value}
            data={this.props.shop[keys[i]]}
            navigation={this.props.navigation}
          />;
        })}
      </ScrollableTabView>
    );
  }
}

export default connect(({ shop }) => ({ shop }))(Shop);
