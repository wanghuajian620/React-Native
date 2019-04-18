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
 *     Initial: 2018/02/03        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import Color from '../../../res/color';
import Fonts from '../../../res/fonts';
import Icons from '../../../res/icons';
import Styles from '../../../res/styles';

export default (props) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.flex}
        onPress={props.onPress}
      >
        <View style={styles.flexicon}>
          <View style={styles.icon}>
            <Icon
              name={props.name}
              color={Color.primary}
            />
          </View>
          <Text style={styles.text}>{props.text}</Text>
        </View>
        <Icon
          name="keyboard-arrow-right"
          size={Icons.small}
          color={Color.lineColor}
          iconStyle={{ marginRight: Styles.Width(50) }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexicon: {
    flexDirection: 'row',
  },
  icon: {
    marginTop: Styles.Height(45),
    marginLeft: Styles.Width(54),
    marginRight: Styles.Width(30),
    marginBottom: Styles.Height(30),
  },
  text: {
    fontSize: Fonts.medium,
    marginTop: Styles.Height(50),
    color: Color.selectColor,
    fontWeight: "100",
  },
  icons: {
    marginRight: Styles.Width(60),
  },
});
