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
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import Fonts from '../../../res/fonts';
import Color from '../../../res/color';
import Styles from '../../../res/styles';

export default (props) => {
  return (
    <View>
      <TouchableOpacity onPress={this.onPress}>
        <Image
          source={{ uri: props.item.uri }}
          style={styles.image}
        />
        <View style={styles.flex}>
          <Text style={styles.type}>{props.item.type}</Text>
          <Text style={styles.discount}>{props.item.discount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Styles.Width(288),
    height: Styles.Height(180),
    marginLeft: Styles.Width(10),
    marginRight: Styles.Width(10),
    marginBottom: Styles.Height(15),
    marginTop: Styles.Height(5),
    borderRadius: 5,
  },
  flex: {
    position: 'absolute',
    top: Styles.Height(30),
    left: Styles.Width(26),
  },
  type: {
    fontSize: Fonts.small,
    fontWeight: 'bold',
  },
  discount: {
    marginTop: Styles.Height(6),
    fontSize: Fonts.tiny,
    color: Color.primary,
  },
});
