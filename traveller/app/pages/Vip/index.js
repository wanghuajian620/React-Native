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
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Instruction from '../Vip/Components/Instruction';

import Types from './Types';
import Discount from './Discount';
import New from './New';
import Honor from './Honor';

import Icons from '../../res/icons';
import Color from '../../res/color';
import Styles from '../../res/styles';

class Vip extends React.Component {
  static navigationOptions = {
    title: '美好生活pass卡',
    headerTitleStyle: {
      color: Color.selectColor,
    },
    headerRight: <Ionicons
      name="ios-open-outline"
      size={Icons.small}
      style={{ marginRight: Styles.Width(30) }}
      onPress={() => {}}
    />,
    headerBackTitle: '',
    headerTintColor: Color.primary,
    gesturesEnabled: true,
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={require('../../assets/images/20180130093214_4a47a0db6e60853dedfcfdf08a5ca249.png')} // eslint-disable-line
          style={styles.image}
        />
        <Instruction
          name="PASS卡独享优惠"
          brief="那些你值得去的网红店"
        />
        <Discount />
        <View style={styles.line}>
          <Divider style={{ backgroundColor: Color.lineColor, width: Styles.ScreenWidth }} />
        </View>
        <Instruction
          name="每周上新"
          brief="闲时，跟着小日子过美好生活"
        />
        <New />
        <View style={styles.line}>
          <Divider style={{ backgroundColor: Color.lineColor, width: Styles.ScreenWidth }} />
        </View>
        <Instruction
          name="丰富的小店类型"
          brief="用一张PASS卡享受不同的小店特权"
        />
        <Types />
        <View style={styles.line}>
          <Divider style={{ backgroundColor: Color.lineColor, width: Styles.ScreenWidth }} />
        </View>
        <Instruction
          name="PASS卡独家尊享"
        />
        <Honor />
        <View style={styles.line}>
          <Divider style={{ backgroundColor: Color.lineColor, width: Styles.ScreenWidth }} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
  },
  image: {
    height: Styles.Height(280),
    width: Styles.ScreenWidth,
  },
  line: {
    marginTop: Styles.Height(80),
    marginBottom: Styles.Height(10),
    marginLeft: Styles.Width(26),
  },
});

export default Vip;
