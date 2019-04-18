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
 *     Initial: 2018/01/25        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import Icons from '../../../res/icons';
import Color from '../../../res/color';
import Fonts from '../../../res/fonts';
import Styles from '../../../res/styles';

export default class ShopCard extends React.Component {
  render() {
    return (
      <View>
        {
          this.props.shopcards.map((item) => {
            return (
              <View key={item.key}>
                <TouchableOpacity onPress={this.props.onPress}>
                  <Card
                    image={{ uri: item.uri }}
                    imageStyle={styles.image}
                    containerStyle={styles.card}
                    style={{ position: 'relative' }}
                  >
                    <Icon
                      name="favorite-border"
                      size={Icons.medium}
                      iconStyle={styles.icon}
                    />
                    <View style={styles.flex}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.curious}>{item.curious}</Text>
                    </View>
                    <Text style={styles.brief}>{item.brief}</Text>
                  </Card>
                </TouchableOpacity>
              </View>
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    height: Styles.Height(410),
    width: Styles.Width(620),
  },
  card: {
    borderRadius: 15,
    marginTop: Styles.Height(18),
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Fonts.small,
    fontWeight: 'bold',
  },
  curious: {
    fontSize: Fonts.small,
    color: Color.wordcolor,
  },
  brief: {
    marginTop: Styles.Height(8),
    color: Color.primary,
  },
  icon: {
    position: 'absolute',
    right: Styles.Width(5),
    bottom: Styles.Height(360),
  },
});
