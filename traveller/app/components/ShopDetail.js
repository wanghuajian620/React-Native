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
 *     Initial: 2018/03/17        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import Styles from '../res/styles';

class ShopDetail extends React.Component {
  render() {
    return (
      <View>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/243756/pexels-photo-243756.jpeg?h=350&auto=compress&cs=tinysrgb' }}
          style={styles.image}
        />
        <Text>看树影摇曳，听琴声袅袅</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: Styles.Height(400),
    width: Styles.ScreenWidth,
  },
});

export default ShopDetail;
