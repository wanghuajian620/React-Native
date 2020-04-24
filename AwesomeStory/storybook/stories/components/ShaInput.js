import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ShaInput from  '../../src/component/ShaInput';
import scope, { $Router, $Ajax, $listenRemoteNoticeInfo, $removeRemoteNoticeInfo, $listenKeyboardBack, $removeKeyboardBack, $addListenAppStateChange, $removeListenAppStateChange, $Local } from '../../src/util/index';
import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
import { WebSDK } from  '../../src/sdk/index';

let $Page ={};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window');
const $ = {};
window.$ = $;
$.instanceList = [];
/**
		 * 影响页面刷新的数据
		*/
		var amVAR = {};

		/**
		 * 页面全局数据
		*/
		var pgVAR = {};

export default class App extends Component {
  constructor(props) {
      super(props);
      scope(this);
      $.instanceList.push(this);
      this.state= this.getStates();
  }
  getStates(){
  	const oMap = {};
  	for (const pop in amVAR) {
  		oMap[pop] = amVAR[pop];
  	}
  	return oMap;
  }
  observer() {
      amVAR = new ProxyFill(amVAR, (property, value) => {
          const key = property.split('.')[0];
          setTimeout(() => {
          	this.setState({
              	[key]: amVAR[key]
           	});
      	});
  	});
  }
  componentWillMount() {
      $Page.willMount && $Page.willMount();
  }
  componentDidMount(){
 		this.amVAR = _.cloneDeep(amVAR);
 		if (typeof pgVAR != 'undefined') this.pgVAR = _.cloneDeep(pgVAR);
 		this.observer();
      window.onload&&window.onload();
      $Page.didMount &&$Page.didMount();
  }
  componentWillUnmount() {
      amVAR = this.amVAR;
      if(typeof pgVAR != 'undefined') pgVAR = this.pgVAR;
      $Page.willUnmount && $Page.willUnmount();
  }
  render() {
      return (
          <React.Fragment>
              <View style={{ display :"flex", flexDirection :"column", flex :1}}>
 <ShaInput amtype="ShaInput" text="密码" showLevel="true" placeholder="请输入密码"></ShaInput>
</View>  
          </React.Fragment>);
  }
}
