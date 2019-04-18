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
 *     Initial: 2018/03/02        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import Fonts from '../../../res/fonts';
import Color from '../../../res/color';
import Styles from '../../../res/styles';

export default (props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={this.onPress}
        style={styles.flex}
      >
        <Image
          source={{ uri: props.item.uri }}
          style={styles.image}
        />
        <View style={styles.discount}>
          <Text style={styles.welfare}>{props.item.welfare}</Text>
        </View>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.brief}>{props.item.brief}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    marginLeft: Styles.Width(24),
  },
  image: {
    width: Styles.Width(400),
    height: Styles.Height(240),
    marginTop: Styles.Height(8),
    marginBottom: Styles.Height(8),
    marginRight: Styles.Width(8),
    borderRadius: 5,
  },
  discount: {
    position: 'absolute',
    left: Styles.Width(0),
    bottom: Styles.Height(130),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  welfare: {
    marginLeft: Styles.Width(6),
    marginRight: Styles.Width(8),
    marginBottom: Styles.Height(4),
    fontSize: Fonts.tiny,
    lineHeight: Styles.Height(24),
    color: Color.backgroundColor,
  },
  title: {
    fontSize: Fonts.medium,
    marginTop: Styles.Height(8),
  },
  brief: {
    fontSize: Fonts.small,
    color: Color.primary,
    width: Styles.Width(400),
    marginTop: Styles.Height(8),
  },
});
