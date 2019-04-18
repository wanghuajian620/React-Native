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
 *     Initial: 2018/01/27        Wang Huajian
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import TopTitle from './TopTitle';
import ClassifyCard from '../../../components/ClassifyCard';

export default class Classify extends React.Component {
  render() {
    return (
      <View>
        <TopTitle
          name="咖啡店"
        />
        <View style={styles.flex}>
          <ClassifyCard
            item={this.props.topclassifys[0]}
          />
          <ClassifyCard
            item={this.props.topclassifys[1]}
          />
          <ClassifyCard
            item={this.props.topclassifys[2]}
          />
        </View>
        <TopTitle
          name="旅舍"
        />
        <View style={styles.flex}>
          <ClassifyCard
            item={this.props.topclassifys[3]}
          />
          <ClassifyCard
            item={this.props.topclassifys[4]}
          />
          <ClassifyCard
            item={this.props.topclassifys[5]}
          />
        </View>
        <TopTitle
          name="甜品铺"
        />
        <View style={styles.flex}>
          <ClassifyCard
            item={this.props.topclassifys[6]}
          />
          <ClassifyCard
            item={this.props.topclassifys[7]}
          />
          <ClassifyCard
            item={this.props.topclassifys[8]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
  },
});
