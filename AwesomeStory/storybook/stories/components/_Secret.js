import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Secret from 'cap4m/lib/Secret';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import WingBlank from 'cap4m/lib/WingBlank';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function getValue() {
		    console.log('getValue: ' + $Secret('Secret').getValue());
		}
		function setValue() {
		    $Secret('Secret').setValue("4165465");
		}
		function setRule() {
		    $Secret('Secret1').setRule("6,8");
		}
let _amVAR = _.cloneDeep(amVAR)
export default class App extends Component {
constructor(props) {
super(props);
this.state= {};
}
observer() {
const oMap = {};
for (const pop in amVAR) {
oMap[pop] = amVAR[pop];
}
this.setState(oMap, () => {
amVAR = new ProxyFill(amVAR, (property, value) => {
const key = property.split('.')[0];
setTimeout(() => {
this.setState({
[key]: amVAR[key]
});
});
});
});
}
componentWillMount() {
this.observer();
$Page.willMount && $Page.willMount();
}
componentWillUnmount() {
$Page.willUnmount && $Page.willUnmount();
}
componentDidMount(){
window.onload&&window.onload();
$Page.didMount &&$Page.didMount();
}
  render() {
    return (
<View style={{flex: 1}}>
<ScrollView amtype="ScrollView">
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   Secret 安全显示 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   内置方法:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   getValue方法->获取显示值
  </Text>
 </View>
 <View>
  <Text>
   setValue方法->设置显示值
  </Text>
 </View>
 <View>
  <Text>
   setRule方法->设置加密规则
  </Text>
 </View>
 <Secret amtype="Secret" id="Secret" fontColor="red" value="6217888899087654" rule="1,4" spaceAfter={3} fontWeight="800" autoref="Secret" ref="_Secret"></Secret>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" text="getValue方法" click="getValue()" type="primary" onClick={($event)=>getValue()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" text="setValue方法" click="setValue()" type="primary" onClick={($event)=>setValue()}></Button>
 </WingBlank>
 <Secret amtype="Secret" id="Secret1" fontColor="red" value="6217888899087654" rule="1,4" spaceAfter={3} fontWeight="800" autoref="Secret1" ref="_Secret1"></Secret>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" text="setRule方法" click="setRule()" type="primary" onClick={($event)=>setRule()}></Button>
 </WingBlank>
</ScrollView>    
</View>);
  }
}
