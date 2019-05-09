/**
 *    Revision  History:
 *       Initial:   2019/05/09       Author:   Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>七月的风，八月的雨</Text>
        <Button style={styles.instructions}>卑微的我喜欢遥远的你</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
