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
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';

import Styles from '../res/styles';
import Fonts from '../res/fonts';
import Color from '../res/color';

export default (props) => {
  _keyExtractor = (item, index) => item.id;// eslint-disable-line
  return (
    <FlatList
      data={props.list}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) => (
        <ScrollView id={item.id}>
          <View style={styles.flex}>
            <Avatar
              source={{ uri: item.uri }}
              avatarStyle={styles.avatar}
              containerStyle={{
                marginLeft: Styles.Width(66),
                marginTop: Styles.Height(74),
                marginRight: Styles.Width(64),
              }}
              activeOpacity={0.7}
            />
            <View style={styles.text}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.address}>{item.address}</Text>
              <Text
                style={styles.brief}
                numberOfLines={4}
                ellipsizeMode="tail"
              >
                {item.text}
              </Text>
            </View>
          </View>
          <Text style={styles.line} />
        </ScrollView>
      )}
    />
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    marginTop: -Styles.Height(10),
  },
  avatar: {
    height: Styles.Height(160),
    width: Styles.Width(160),
    borderRadius: 50,
  },
  text: {
    marginTop: Styles.Height(30),
    marginLeft: Styles.Width(10),
  },
  title: {
    fontSize: Fonts.medium,
  },
  address: {
    fontSize: Fonts.small,
    color: Color.primary,
    marginTop: Styles.Height(16),
    marginBottom: Styles.Height(20),
  },
  brief: {
    fontSize: Fonts.xsmall,
    color: Color.primary,
    width: Styles.Width(430),
  },
  line: {
    height: Styles.Height(16),
    width: Styles.ScreenWidth,
    backgroundColor: Color.tabColor,
    marginTop: Styles.Height(30),
    marginBottom: Styles.Height(20),
  },
});
