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
 *     Initial: 2018/02/02        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

import Styles from '../../../res/styles';
import Color from '../../../res/color';
import Fonts from '../../../res/fonts';

export default (props) => {
  _keyExtractor = (item, index) => item.id;// eslint-disable-line
  return (
    <FlatList
      data={props.interestcards}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) => (
        <View id={item.id}>
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
          />
          <View style={styles.place}>
            <Text style={styles.flex}>{item.place}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.brief}>{item.brief}</Text>
          <View style={styles.flexbottom}>
            <View style={styles.flexprice}>
              <Text style={styles.price}>{item.newprice}</Text>
              <Text style={styles.unprice}>{item.oldprice}</Text>
            </View>
            <View style={styles.flexwish}>
              <Text style={styles.wish}>{item.wish}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: Styles.Height(400),
    width: Styles.Width(610),
    marginLeft: Styles.Width(14),
    marginRight: Styles.Width(14),
    marginBottom: Styles.Height(15),
    marginTop: Styles.Height(14),
    borderRadius: 6,
  },
  place: {
    position: 'absolute',
    right: Styles.Width(16),
    bottom: Styles.Height(180),
    height: Styles.Height(36),
    width: Styles.Width(80),
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'rgba(250,55,23,0.9)',
  },
  flex: {
    textAlign: 'center',
    lineHeight: Styles.Height(30),
    color: Color.backgroundColor,
  },
  title: {
    fontSize: Fonts.medium,
    marginLeft: Styles.Width(18),
  },
  brief: {
    fontSize: Fonts.small,
    marginLeft: Styles.Width(18),
    marginTop: Styles.Height(14),
    color: Color.primary,
  },
  flexbottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexprice: {
    flexDirection: 'row',
  },
  price: {
    fontSize: Fonts.large,
    color: Color.price,
    marginLeft: Styles.Width(14),
    marginTop: Styles.Height(12),
  },
  unprice: {
    color: Color.primary,
    fontSize: Fonts.tiny,
    marginTop: Styles.Height(22),
    marginLeft: Styles.Width(10),
    textDecorationLine: 'line-through',
  },
  flexwish: {
    height: Styles.Height(54),
    width: Styles.Width(130),
    borderRadius: 15,
    marginRight: Styles.Width(14),
    backgroundColor: Color.wish,
  },
  wish: {
    textAlign: 'center',
    fontSize: Fonts.medium,
    marginTop: Styles.Height(12),
    color: Color.backgroundColor,
  },
});
