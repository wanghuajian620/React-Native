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
 *     Initial: 2018/03/04        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import Fonts from '../res/fonts';
import Color from '../res/color';
import Styles from '../res/styles';

export default (props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={this.onPress}
        style={styles.flex}
      >
        <View style={styles.fleximage}>
          <Image
            source={{ uri: props.item.uri }}
            style={styles.image}
          />
        </View>
        <View style={styles.flexright}>
          <Text style={styles.name}>{props.item.name}</Text>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.item.title}
          </Text>
          <Text style={styles.title}>{props.item.address}</Text>
          <View style={styles.flexword}>
            <Text
              style={styles.word}
              numberOfLines={1}
            >
              惠
            </Text>
            <Text
              style={styles.discount}
              numberOfLines={5}
            >
              {props.item.discount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    marginLeft: Styles.Width(24),
    marginBottom: -Styles.Height(50),
  },
  fleximage: {
    marginTop: -Styles.Height(20),
    marginRight: Styles.Width(20),
  },
  image: {
    height: Styles.Height(170),
    width: Styles.Width(250),
    borderRadius: 10,
  },
  flexright: {
    alignItems: 'flex-start',
  },
  name: {
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    marginBottom: Styles.Height(16),
  },
  title: {
    width: Styles.Width(300),
    fontSize: Fonts.xsmall,
    color: Color.primary,
    marginBottom: Styles.Height(18),
  },
  flexword: {
    flexDirection: 'row',
  },
  word: {
    height: Styles.Height(20),
    fontSize: Fonts.tiny,
    color: Color.backgroundColor,
    backgroundColor: Color.price,
    marginRight: Styles.Width(10),
  },
  discount: {
    width: Styles.Width(260),
    fontSize: Fonts.tiny,
    color: Color.primary,
  },
});
