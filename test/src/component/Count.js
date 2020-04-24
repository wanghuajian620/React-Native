import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';

import {handleAddAction, handleLessAction} from '../action/actionCreate';

class Count extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>升级</Text>
        <Text>请自行配置路由，redux</Text>
        <View style={styles.buttonflex}>
          <Button title="+" onPress={this.props.handleAdd} />
          <Text>{this.props.count}</Text>
          <Button title="-" onPress={this.props.handleLess} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 40,
  },
  buttonflex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    handleAdd: () => dispatch(handleAddAction()),
    handleLess: () => dispatch(handleLessAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Count);
