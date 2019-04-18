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
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  RefreshControl,
  TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Classify from './Components/Classify';
import ShopTitle from '../../components/ShopTitle';
import TopCard from './Components/TopCard';

import Icons from '../../res/icons';
import Color from '../../res/color';
import Fonts from '../../res/fonts';
import Styles from '../../res/styles';

class Top extends React.Component {
  static navigationOptions = {
    title: '榜单',
    headerStyle: { backgroundColor: Color.backgroundColor },
    headerLeft:
  <TouchableOpacity onPress={() => {}}>
    <Ionicons
      name="ios-pin-outline"
      size={Icons.medium}
      style={{ marginLeft: Styles.Width(30) }}
    />
  </TouchableOpacity>,
    tabBarLabel: '榜单',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-medal' : 'ios-medal-outline'}
        size={Icons.medium}
        style={{ color: tintColor }}
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
        <Image
          source={
            require('../../assets/images/banner4.jpg') // eslint-disable-line
          }
          style={styles.topimage}
        />
        <View style={styles.shoptitle}>
          <ShopTitle
            name="北京小店TOP10"
            brief="24小时 我们为您探索出来的小店"
          />
        </View>
        <TopCard
          item={this.props.topcards[0]}
        />
        <Divider
          style={{ backgroundColor: Color.lineColor }}
        />
        <TopCard
          item={this.props.topcards[1]}
        />
        <Divider
          style={{ backgroundColor: Color.lineColor }}
        />
        <TopCard
          item={this.props.topcards[2]}
        />
        <Divider
          style={{ backgroundColor: Color.lineColor }}
        />
        <Text style={styles.title}>查看北京小店TOP10</Text>
        <Text style={styles.line} />
        <Text style={styles.fanstitle}>人气小店集结</Text>
        <Classify
          topclassifys={this.props.topclassifys}
        />
        <Text style={styles.line} />
        <View style={{ marginTop: -50 }}>
          <ShopTitle
            name="全国小店TOP10"
            brief="24小时 我们为您探索出来的小店"
          />
        </View>
        <TopCard
          item={this.props.topcards[3]}
        />
        <Divider
          style={{ backgroundColor: Color.lineColor }}
        />
        <TopCard
          item={this.props.topcards[4]}
        />
        <Divider
          style={{ backgroundColor: Color.lineColor }}
        />
        <TopCard
          item={this.props.topcards[5]}
        />
        <Divider
          style={{ backgroundColor: Color.lineColor }}
        />
        <Text style={styles.title}>查看全国小店TOP10</Text>
        <Text style={styles.line} />
        <Text style={styles.bottom}>小日子-带你发现城市美好生活</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
  },
  topimage: {
    height: Styles.Height(350),
    width: Styles.ScreenWidth,
  },
  shoptitle: {
    marginTop: -Styles.Height(60),
  },
  title: {
    textAlign: 'center',
    fontSize: Fonts.medium,
    color: Color.primary,
    marginTop: Styles.Height(20),
  },
  line: {
    height: Styles.Height(16),
    width: Styles.ScreenWidth,
    backgroundColor: Color.tabColor,
    marginTop: Styles.Height(15),
    marginBottom: Styles.Height(30),
  },
  fanstitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.large,
  },
  bottom: {
    textAlign: 'center',
    fontSize: Fonts.tiny,
    color: Color.primary,
    marginBottom: Styles.Height(15),
  },
});

export default connect(({ top }) => ({ ...top }))(Top);
