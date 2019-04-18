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
 *     Initial: 2018/01/23        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Title from './Components/Title';
import BusinessCard from './Components/BusinessCard';

import Color from '../../res/color';
import Styles from '../../res/styles';

function Business(props) {
  return (
    <View style={styles.container}>
      <Title
        name="商圈"
        brief="小日子陪你捕捉城市惊喜"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.flex}>
          <BusinessCard item={props.business[0]} />
          <BusinessCard item={props.business[1]} />
          <BusinessCard item={props.business[2]} />
          <BusinessCard item={props.business[3]} />
          <BusinessCard item={props.business[4]} />
          <BusinessCard item={props.business[5]} />
          <BusinessCard item={props.business[6]} />
          <BusinessCard item={props.business[7]} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.backgroundColor,
  },
  flex: {
    flexDirection: 'row',
    marginTop: Styles.Height(14),
  },
});

export default connect(({ home }) => ({
  business: home.business,
}))(Business);
