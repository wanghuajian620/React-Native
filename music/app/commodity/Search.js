/**
 *   Revision   History:
 *      Initial:         2019/04/24       Wang  Huajian
 *      简短介绍 此页是顶部搜索，供index.js引用。
 */

import React from 'react';
import { View, StyleSheet, TextInput, Button, Platform, Alert } from 'react-native';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  render() {
    return (
      <View style={styles.searchbar}>
        <TextInput style={styles.input} placeholder='搜索商品' onChangeText={(text) => {this.setState({text})}}></TextInput>
        <Button style={styles.button} title='搜索' onPress={() => {Alert.alert('搜索内容'+ this.state.text, null, null)}}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    marginTop: Platform.OS === 'ios' ? 36 : 0, // ios、android 对状态栏的处理方式不同 
    height: 40,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#efefef',
    marginLeft: 4
  },
  button: {
    flex: 1
  }
});
