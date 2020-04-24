import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import renderChart from './renderChart';
import echarts from './echarts.min.js';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.setNewOption = this.setNewOption.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  setNewOption(option, theme) {
    this.refs.chart.postMessage(JSON.stringify({option, theme}));
    console.log(theme);
  }
  

  render() {
    let sourceUrl = require('./tpl.html');
    
    return (
      <View style={{ flex: 1, height: this.props.height || 400 }}>
        <WebView
          ref="chart"
          scrollEnabled={false}
          injectedJavaScript={renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent',
          }}
          scalesPageToFit={Platform.OS !== 'ios'}
          source={sourceUrl}
          onMessage={(event) => this.props.onClick ? this.props.onClick(JSON.parse(event.nativeEvent.data)) : null}
        />

      </View>
    );
  }
}
