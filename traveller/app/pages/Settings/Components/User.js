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
import { Avatar } from 'react-native-elements';

import Styles from '../../../res/styles';
import Fonts from '../../../res/fonts';
import Color from '../../../res/color';

export default (props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={this.onPress}
        style={styles.flex}
      >
        <Avatar
          large
          rounded
          source={{ uri: props.item.uri }}
          activeOpacity={0.7}
          onPress={() => {}}
        />
        <View style={styles.flexname}>
          <Text style={styles.name}>{props.item.name}</Text>
          <Text style={styles.editor}>{props.item.editor}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Styles.Height(8),
    paddingBottom: Styles.Height(30),
    paddingLeft: Styles.Width(40),
    backgroundColor: Color.settingColor,
  },
  flexname: {
    marginLeft: Styles.Width(25),
  },
  name: {
    fontWeight: 'bold',
    fontSize: Fonts.xxlarge,
    marginBottom: Styles.Height(20),
  },
  editor: {
    color: Color.primary,
  },
});
