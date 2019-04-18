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
 *     Initial: 2018/01/24        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import Title from './Components/Title';
import ClassifyCard from '../../components/ClassifyCard';

import Color from '../../res/color';
import Styles from '../../res/styles';

class Classify extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Title
          name="分类"
          brief="在街角巷尾寻找生活美学"
        />
        <View style={styles.flex}>
          <ClassifyCard item={this.props.classify[0]} />
          <ClassifyCard item={this.props.classify[1]} />
          <ClassifyCard item={this.props.classify[2]} />
        </View>
        <View style={styles.flex}>
          <ClassifyCard item={this.props.classify[3]} />
          <ClassifyCard item={this.props.classify[4]} />
          <ClassifyCard item={this.props.classify[5]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.backgroundColor,
  },
  flex: {
    flexDirection: 'row',
    marginTop: Styles.Height(12),
    marginBottom: Styles.Width(8),
  },
});

export default connect(({ home }) => ({
  classify: home.classify,
}))(Classify);
