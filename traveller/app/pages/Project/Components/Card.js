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
 *     Initial: 2018/03/14        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Styles from '../../../res/styles';
import Icons from '../../../res/icons';
import Color from '../../../res/color';
import Fonts from '../../../res/fonts';

export default (props) => {
  _keyExtractor = (item, index) => item.id;// eslint-disable-line
  return (
    <FlatList
      data={props.card}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) => (
        <ScrollView id={item.id}>
          <View style={styles.flex}>
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
            />
          </View>
          <View style={styles.view}>
            <Ionicons
              name="ios-eye-outline"
              size={Icons.xsmall}
              color={Color.backgroundColor}
              style={styles.icon}
            />
            <Text style={styles.number}>{item.view}</Text>
          </View>
          <View style={styles.flextext}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </ScrollView>
      )}
    />
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Styles.Height(8),
    marginBottom: Styles.Height(8),
  },
  image: {
    height: Styles.Height(324),
    width: Styles.Width(626),
    borderRadius: 5,
  },
  view: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    left: Styles.Width(0),
    bottom: Styles.Height(268),
    marginLeft: Styles.Width(8),
    height: Styles.Height(30),
    backgroundColor: 'rgba(220,220,220,0.2)',
  },
  icon: {
    marginLeft: Styles.Width(4),
  },
  number: {
    fontSize: Fonts.tiny,
    marginLeft: Styles.Width(6),
    marginRight: Styles.Width(8),
    lineHeight: Styles.Height(24),
    color: Color.backgroundColor,
  },
  flextext: {
    position: 'absolute',
  },
  text: {
    lineHeight: Styles.Height(324),
    height: Styles.Height(320),
    width: Styles.Width(626),
    textAlign: 'center',
    fontSize: Fonts.xlarge,
    color: Color.backgroundColor,
  },
});
