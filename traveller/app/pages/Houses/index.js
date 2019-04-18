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
 *     Initial: 2018/01/21        Wang Huajian
 */

import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HouseCards from './HouseCards';
import Inspiration from './Inspiration';
import Interest from './Interest';

import Icons from '../../res/icons';
import Color from '../../res/color';
import Styles from '../../res/styles';

class Houses extends React.PureComponent {
  static navigationOptions = {
    title: '体验不一样',
    swipeEnabled: false,
    headerStyle: {
      backgroundColor: Color.backgroundColor,
      elevation: 0,
      borderBottomWidth: 0,
    },
    tabBarLabel: '民宿',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-home' : 'ios-home-outline'}
        size={Icons.medium}
        style={{ color: tintColor }}
      />
    ),
  };

  render() {
    const types = [
      { title: '精品民宿', component: HouseCards },
      { title: '兴趣培养', component: Interest },
      { title: '灵感空间', component: Inspiration }];
    return (
      <ScrollableTabView
        tabBarBackgroundColor={Color.backgroundColor}
        tabBarUnderlineStyle={{
          backgroundColor: Color.selectColor,
          width: Styles.Width(30),
          marginLeft: Styles.Width(88),
        }}
        tabBarActiveTextColor={Color.selectColor}
        tabBarInactiveTextColor={Color.primary}
      >
        { types.map((v, i) => {
            const Component = v.component;
            return <Component key={i} tabLabel={v.title} navigation={this.props.navigation} />; //eslint-disable-line
        })}
      </ScrollableTabView>
    );
  }
}

export default Houses;
