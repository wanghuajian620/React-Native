import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import TextareaItem from 'cap4m/lib/TextareaItem';
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
		function getEditable() {
		    console.log(12)
		}
		function setEditable() {
		    $TextareaItem('text1').setEditable(false);
		}
		function getDisabled() {
		    console.log(12)
		}
		function setDisabled() {
		    $TextareaItem('text2').setDisabled(true);
		}
		function getValue() {
		    console.log($TextareaItem('text3').getValue());
		}
		function setValue() {
		    $TextareaItem('text3').setValue('hello world');
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
   TextareaItem 多行输入框
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   内置方法:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   getEditable方法->获取文本框编辑的值
  </Text>
 </View>
 <View>
  <Text>
   setEditable方法->设置文本框是否可编辑
  </Text>
 </View>
 <TextareaItem amtype="TextareaItem" id="text1" placeholder="text1" autoref="text1" ref="_text1"></TextareaItem>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="getEditable()" text="getEditable" type="primary" onClick={($event)=>getEditable()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="setEditable()" text="setEditable" type="primary" onClick={($event)=>setEditable()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   getDisabled方法->获取文本框是否禁用
  </Text>
 </View>
 <View>
  <Text>
   setDisabled方法->设置文本框禁用
  </Text>
 </View>
 <TextareaItem amtype="TextareaItem" id="text2" placeholder="text2" autoref="text2" ref="_text2"></TextareaItem>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="getDisabled()" text="getDisabled" type="primary" onClick={($event)=>getDisabled()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="setDisabled()" text="setDisabled" type="primary" onClick={($event)=>setDisabled()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <TextareaItem amtype="TextareaItem" id="text3" placeholder="text3" autoref="text3" ref="_text3"></TextareaItem>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   getValue方法->获取文本框的值
  </Text>
 </View>
 <View>
  <Text>
   setValue方法->设置文本框的值
  </Text>
 </View>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="getValue()" text="getValue" type="primary" onClick={($event)=>getValue()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="setValue()" text="setValue" type="primary" onClick={($event)=>setValue()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
</ScrollView>    
</View>);
  }
}
