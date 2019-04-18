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
 *     Initial: 2018/03/08        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Styles from '../res/styles';
import Icons from '../res/icons';
import Color from '../res/color';
import Fonts from '../res/fonts';

export default class NearCard extends React.PureComponent {
  _keyExtractor = (item, index) => item.id;// eslint-disable-line
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => (
          <ScrollView>
            <TouchableOpacity
              onPress={this.onPress}
              style={styles.container}
            >
              <View
                style={styles.flex}
                id={item.id}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={styles.image}
                />
                <View style={styles.flexright}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.flextitle}>
                    <Ionicons
                      name="ios-home-outline"
                      size={Icons.xsmall}
                      style={styles.icon}
                    />
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <View style={styles.flextitle}>
                    <Ionicons
                      name="ios-pin-outline"
                      size={Icons.xsmall}
                      style={styles.icon}
                    />
                    <Text
                      style={styles.address}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >{item.address}
                    </Text>
                  </View>
                </View>
              </View>
              <Divider
                style={{ backgroundColor: Color.lineColor, width: Styles.ScreenWidth }}
              />
            </TouchableOpacity>
          </ScrollView>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
  },
  flex: {
    flexDirection: 'row',
    marginBottom: Styles.Height(14),
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
  flextitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Styles.Height(20),
  },
  name: {
    fontSize: Fonts.medium,
    fontWeight: '600',
  },
  title: {
    fontSize: Fonts.xsmall,
    color: Color.primary,
  },
  address: {
    width: Styles.Width(290),
    fontSize: Fonts.xsmall,
    color: Color.primary,
  },
  flexright: {
    marginTop: Styles.Height(50),
    marginLeft: Styles.Width(14),
  },
  icon: {
    marginRight: Styles.Width(20),
  },
});
