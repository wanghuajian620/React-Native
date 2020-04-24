import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import SearchBar from 'cap4m/lib/SearchBar';
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
		    console.log(12)
		}
		function setValue() {
		    $SearchBar('SearchBar1').setValue('hello');
		}
		function setFocus() {
		   $SearchBar('SearchBar1').setFocus();
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
   SearchBar 搜索栏 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   内置方法:
  </Text>
 </View>
 <SearchBar amtype="SearchBar" id="SearchBar1" ref="_SearchBar1" autoref="SearchBar1"></SearchBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
    setValue 设置搜索框的值
   </Text>
  </View>
  <Button amtype="Button" click="setValue()" text="setValue" type="primary" onClick={($event)=>setValue()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
    getValue 获取搜索框的值
   </Text>
  </View>
  <Button amtype="Button" click="getValue()" text="getValue" type="primary" onClick={($event)=>getValue()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
    setFocus 设置焦点（web端）
   </Text>
  </View>
  <Button amtype="Button" click="setFocus()" text="setFocus" type="primary" onClick={($event)=>setFocus()}></Button>
 </WingBlank>
</ScrollView>    
</View>);
  }
}
