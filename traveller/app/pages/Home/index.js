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
 *     Initial: 2018/01/21        Wang Huajian
 */

import React from 'react';
import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Carousels from './Components/Carousel';
import Tab from './Components/Tab';

import Business from './Business';
import Classify from './Classify';
import Shop from './Shop';

import Icons from '../../res/icons';
import Color from '../../res/color';
import Styles from '../../res/styles';

class Home extends React.Component {
  static navigationOptions = {
    title: '小日子',
    headerStyle: { backgroundColor: Color.backgroundColor },
    headerLeft:
  <TouchableOpacity onPress={() => {}}>
    <Ionicons
      name="ios-pin-outline"
      size={Icons.medium}
      style={{ marginLeft: Styles.Width(30) }}
    />
  </TouchableOpacity>,
    headerRight:
  <TouchableOpacity onPress={() => {}}>
    <Ionicons
      name="ios-search"
      size={Icons.medium}
      style={{ marginRight: Styles.Width(30) }}
    />
  </TouchableOpacity>,
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name={focused ? 'ios-flame' : 'ios-flame-outline'}
        size={Icons.medium}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 1000);
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#000000"
            title="loading"
            colors={['#000000']}
            progressBackgroundColor="#ffffff"
            enabled
          />
        }
      >
        <Carousels
          slides={this.props.slides}
        />
        <Tab navigation={this.props.navigation} />
        <Business />
        <Classify />
        <Shop />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
    backgroundColor: Color.backgroundColor,
  },
});

export default connect(({ home }) => ({
  slides: home.slides,
}))(Home);
