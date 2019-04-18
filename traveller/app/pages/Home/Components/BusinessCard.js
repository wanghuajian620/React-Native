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
 *     Initial: 2018/01/26        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import Fonts from '../../../res/fonts';
import Color from '../../../res/color';
import Styles from '../../../res/styles';

export default (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <Image
          source={{ uri: props.item.uri }}
          style={styles.image}
        />
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.brief}>{props.item.brief}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Styles.Width(400),
    height: Styles.Height(240),
    marginTop: Styles.Height(8),
    marginBottom: Styles.Height(8),
    marginLeft: Styles.Width(8),
    marginRight: Styles.Width(8),
    borderRadius: 5,
  },
  title: {
    fontSize: Fonts.small,
    marginTop: Styles.Height(8),
    marginLeft: Styles.Width(8),
  },
  brief: {
    fontSize: Fonts.tiny,
    color: Color.primary,
    marginTop: Styles.Height(8),
    marginLeft: Styles.Width(8),
  },
});
