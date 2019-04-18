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
 *     Initial: 2018/01/29        Wang Huajian
 */

import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, FlatList } from 'react-native';

import Fonts from '../../../res/fonts';
import Color from '../../../res/color';
import Styles from '../../../res/styles';

export default (props) => {
  _keyExtractor = (item, index) => item.id;// eslint-disable-line
  return (
    <FlatList
      data={props.housecards}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) => (
        <ScrollView id={item.id}>
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
          />
          <View style={styles.place}>
            <Text style={styles.gate}>{item.place}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {
              props.housecards.map((item) => {
                return (
                  <View key={item.id} style={styles.label}>
                    <Text style={styles.text}>{item.tags}</Text>
                  </View>
                );
              })
            }
          </View>
        </ScrollView>
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
    right: Styles.Width(15),
    bottom: Styles.Height(130),
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  gate: {
    marginLeft: Styles.Width(16),
    marginRight: Styles.Width(10),
    marginBottom: Styles.Height(4),
    lineHeight: Styles.Height(30),
    color: Color.backgroundColor,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Fonts.medium,
    marginLeft: Styles.Width(18),
  },
  price: {
    color: Color.price,
    fontSize: Fonts.medium,
    marginRight: Styles.Width(16),
  },
  label: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Styles.Height(16),
    marginLeft: Styles.Width(16),
    height: Styles.Height(40),
    borderRadius: 15,
    backgroundColor: Color.tabColor,
  },
  text: {
    fontSize: Fonts.tiny,
    color: Color.primary,
    marginHorizontal: Styles.Width(16),
  },
});
