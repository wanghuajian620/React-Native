/**
 * Revision History
 *    Initial:     2019/04/23         Author:  Wang Huajian
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons';

import Search from './Search';
import Carousel from './Carousel';
import LongList from './LongList';

export default class Commodity extends React.Component {
  static navigationOptions = {
    title: '音乐街',
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name={focused ? 'ios-flame' : 'ios-flame-outline'}
        size={22}
      />
    ),
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Search />
        <Carousel />
        <LongList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});