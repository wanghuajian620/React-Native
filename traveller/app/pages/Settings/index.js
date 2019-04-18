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
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Navigator, { dispatcher } from '../../helper/navigator';

import List from './Components/List';
import User from './Components/User';

import Icons from '../../res/icons';
import Color from '../../res/color';
import Styles from '../../res/styles';

class Settings extends React.Component {
  static navigationOptions = {
    headerLeft:
  <TouchableOpacity onPress={() => {}}>
    <Ionicons
      name="ios-notifications-outline"
      size={Icons.small}
      style={{ marginLeft: Styles.Width(500) }}
    />
  </TouchableOpacity>,
    headerRight:
  <TouchableOpacity onPress={() => {}}>
    <Ionicons
      name="ios-settings-outline"
      size={Icons.small}
      style={{ marginRight: Styles.Width(40) }}
    />
  </TouchableOpacity>,
    headerStyle: {
      backgroundColor: Color.settingColor,
      elevation: 0,
      borderBottomWidth: 0,
    },
    tabBarLabel: '我的',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-person' : 'ios-person-outline'}
        size={Icons.medium}
        style={{ color: tintColor }}
      />
    ),
  };

  renderHeader = () => {
    const dispatch = dispatcher(this.props);
    return (
      <View>
        <User
          item={this.props.users[0]}
        />
        <View style={styles.flexline}>
          <List
            name="spa"
            text="我的pass卡"
            onPress={() => dispatch(Navigator.navigate('Vip'))}
          />
          <View style={styles.line}>
            <Divider
              style={{ backgroundColor: Color.lineColor, width: Styles.Width(530) }}
            />
          </View>
          <List
            name="toys"
            text="发布小店"
            onPress={() => {}}
          />
          <View style={styles.line}>
            <Divider
              style={{ backgroundColor: Color.lineColor, width: Styles.Width(530) }}
            />
          </View>
          <List
            name="description"
            text="我的订单"
            onPress={() => {}}
          />
          <View style={styles.line}>
            <Divider
              style={{ backgroundColor: Color.lineColor, width: Styles.Width(530) }}
            />
          </View>
          <List
            name="favorite"
            text="收藏"
            onPress={() => {}}
          />
          <View style={styles.line}>
            <Divider
              style={{ backgroundColor: Color.lineColor, width: Styles.Width(530) }}
            />
          </View>
          <List
            name="star"
            text="五星好评"
            onPress={() => {}}
          />
          <View style={styles.line}>
            <Divider
              style={{ backgroundColor: Color.lineColor, width: Styles.Width(530) }}
            />
          </View>
          <List
            name="edit"
            text="意见反馈"
            onPress={() => {}}
          />
          <View style={styles.linelast}>
            <Divider
              style={{ backgroundColor: Color.lineColor, width: Styles.Width(530) }}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderHeader()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexline: {
    backgroundColor: Color.backgroundColor,
  },
  line: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linelast: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Styles.Height(100),
  },
});

export default connect(({ settings }) => ({
  users: settings.users,
}))(Settings);
