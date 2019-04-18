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
import { StyleSheet, ScrollView, Image, View, Text, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Styles from '../../../res/styles';
import Fonts from '../../../res/fonts';
import Color from '../../../res/color';
import Icons from '../../../res/icons';

export default (props) => {
  _keyExtractor = (item, index) => item.id;// eslint-disable-line
  return (
    <FlatList
      data={props.inspirationcards}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) => (
        <ScrollView id={item.id}>
          <View style={styles.flex}>
            <Image
              source={{ uri: item.aUri }}
              style={styles.image}
            />
            <View>
              <Image
                source={{ uri: item.bUri }}
                style={styles.picture}
              />
              <Image
                source={{ uri: item.cUri }}
                style={styles.picture}
              />
            </View>
          </View>
          <View style={styles.place}>
            <Text style={styles.gate}>{item.place}</Text>
          </View>
          <View style={styles.flextext}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View style={styles.flexicon}>
            <Ionicons
              name="ios-bulb-outline"
              size={Icons.small}
              color={Color.primary}
            />
            <Text style={styles.brief}>{item.brief}</Text>
          </View>
        </ScrollView>
      )}
    />
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    marginBottom: Styles.Height(15),
    marginTop: Styles.Height(14),
  },
  image: {
    height: Styles.Height(400),
    width: Styles.Width(400),
    marginLeft: Styles.Width(14),
    marginRight: Styles.Width(1),
    borderTopLeftRadius: 55,
  },
  picture: {
    height: Styles.Height(200),
    width: Styles.Width(208),
    marginRight: Styles.Width(14),
    marginTop: Styles.Height(1),
  },
  place: {
    position: 'absolute',
    right: Styles.Width(18),
    bottom: Styles.Height(120),
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  gate: {
    marginLeft: Styles.Width(14),
    marginRight: Styles.Width(10),
    marginBottom: Styles.Height(4),
    lineHeight: Styles.Height(30),
    color: Color.backgroundColor,
  },
  flextext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Fonts.medium,
    marginLeft: Styles.Width(14),
  },
  price: {
    color: Color.price,
    fontSize: Fonts.medium,
    marginRight: Styles.Width(14),
  },
  flexicon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Styles.Width(14),
    marginTop: Styles.Height(10),
  },
  brief: {
    color: Color.primary,
    fontSize: Fonts.small,
    marginLeft: Styles.Width(10),
  },
});
