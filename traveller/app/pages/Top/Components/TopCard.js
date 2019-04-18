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
 *     Initial: 2018/01/27        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Icons from '../../../res/icons';
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
        <View style={styles.text}>
          <Text style={styles.title}>{props.item.title}</Text>
          <Text style={styles.brief}>{props.item.brief}</Text>
          <View style={styles.flex}>
            <Ionicons
              name="ios-heart-outline"
              size={Icons.small}
              style={styles.icon}
            />
            <Text style={styles.people}>{props.item.curious}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
  },
  image: {
    height: Styles.Height(170),
    width: Styles.Width(250),
    marginTop: Styles.Height(28),
    marginLeft: Styles.Width(15),
    marginRight: Styles.Width(9),
    marginBottom: Styles.Height(20),
    borderRadius: 10,
  },
  text: {
    flexDirection: 'column',
    marginTop: Styles.Height(34),
    marginLeft: Styles.Width(10),
  },
  title: {
    fontSize: Fonts.small,
  },
  brief: {
    flexWrap: 'wrap',
    fontSize: Fonts.tiny,
    marginTop: Styles.Height(22),
    color: Color.primary,
  },
  icon: {
    marginTop: Styles.Height(44),
  },
  people: {
    fontSize: Fonts.tiny,
    marginTop: Styles.Height(48),
    marginLeft: Styles.Width(12),
    color: Color.primary,
  },
});
