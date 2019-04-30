/**
 * Revision History
 *    Initial:     2019/04/23         Author:  Wang Huajian
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import Search from './Search';
import Carousel from './Carousel';
import LongList from './LongList';

export default class Commodity extends React.Component {
  static navigationOptions = { // 没起作用呢
    title: '完美的一天'
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