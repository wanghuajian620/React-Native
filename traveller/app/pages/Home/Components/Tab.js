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
 *     Initial: 2018/01/23        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import Navigator, { dispatcher } from '../../../helper/navigator';
import TouchPass from './TouchPass';
import Color from '../../../res/color';

export default class Tab extends React.Component {
  render() {
    const dispatch = dispatcher(this.props);

    return (
      <View style={styles.container}>
        <TouchPass
          name="ios-globe-outline"
          text="pass卡"
          onPress={() => dispatch(Navigator.navigate('Vip'))}
        />
        <TouchPass
          name="ios-paper-plane-outline"
          text="附近好店"
          onPress={() => dispatch(Navigator.navigate('Shop'))}
        />
        <TouchPass
          name="ios-list-box-outline"
          text="精选专题"
          onPress={() => dispatch(Navigator.navigate('Project'))}
        />
        <TouchPass
          name="ios-heart-outline"
          text="匠人匠心"
          onPress={() => dispatch(Navigator.navigate('Artisans'))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Color.backgroundColor,
  },
});
