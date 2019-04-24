/**
 * Revision History
 *    Initial:     2019/04/23         Wang Huajian
 */

import React from 'react';
import { View, StyleSheet, TextInput, Button, Platform, ScrollView, Dimensions, Image, Alert } from 'react-native';

import Search from './Search';
import Carousel from './Carousel';

export default class Commodity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Search />
        <Carousel />

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