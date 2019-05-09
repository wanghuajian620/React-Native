/**
 *     Revision   History:
 *         Initial:   2019/05/09         Author:   Wang Huajian
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
export default class Setting extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});
