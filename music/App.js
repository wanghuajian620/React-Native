/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { SearchBar } from 'react-native-elements';

export default class App extends Component {
  state = {
    search: '',
  };
  updateSearch = search => {
    this.setState({search});
  }
  render() {
    const { search } = this.state; 
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
            round
          /> 
        </View>
        <View>
          <Text style={styles.welcome}>七月的风  八月的雨</Text>
          <Text style={styles.instructions}>卑微的我喜欢遥远的你</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  search: {
    marginTop: 30,
    color: '#fff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
