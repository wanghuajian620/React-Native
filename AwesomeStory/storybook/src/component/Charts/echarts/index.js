/**
 * 来源：https://github.com/somonus/react-native-echarts
*/
import React, { Component } from 'react';
import { Container, Echarts } from './components';

export default class EchartsIndex extends Component {

  setNewOption(option, theme) {
    this.chart.setNewOption(option, theme);
  }

  render() {
    return (
      <Container width={this.props.width}>
        <Echarts {...this.props} ref={(e) => this.chart = e} />
      </Container>
    );
  }
}
