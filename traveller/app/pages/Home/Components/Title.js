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
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Icons from '../../../res/icons';
import Fonts from '../../../res/fonts';
import Color from '../../../res/color';
import Styles from '../../../res/styles';

export default (props) => {
  return (
    <View>
      <View style={styles.flex}>
        <Text style={{ flex: 1 }} />
        <Text style={styles.business}>{props.name}</Text>
        <View style={styles.icon}>
          <Ionicons
            name="ios-arrow-forward"
            size={Icons.small}
            color={Color.primary}
          />
        </View>
      </View>
      <View>
        <Text style={styles.text}>{props.brief}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Styles.ScreenWidth,
    marginTop: Styles.Height(80),
  },
  business: {
    fontWeight: '900',
    fontSize: Fonts.xlarge,
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.small,
    color: Color.primary,
    marginTop: Styles.Height(20),
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: Styles.Width(26),
  },
});
