/**
 *     Revision   History:
 *         Initial:   2019/05/09         Author:   Wang Huajian
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
class Setting extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>tab2  Settings!</Text>
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

export default Setting;
