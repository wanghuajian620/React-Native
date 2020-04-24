import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import CircleProgress from 'cap4m/lib/CircleProgress';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
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
   CircleProgress圆形进度条 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性：
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   bgcolor属性->设置进度条背景颜色（pink） 
  </Text>
 </View>
 <CircleProgress amtype="CircleProgress" bgcolor="pink" radius="20"></CircleProgress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   color属性->设置进度条填充颜色（blue） 
  </Text>
 </View>
 <CircleProgress amtype="CircleProgress" color="blue" radius="30"></CircleProgress>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   color属性->设置进度条填充颜色（#00f） 
  </Text>
 </View>
 <CircleProgress amtype="CircleProgress" color="#00f" percent="-20" radius="30"></CircleProgress>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   color属性->设置进度条填充颜色（rgba(0,0,255,1)） 
  </Text>
 </View>
 <CircleProgress amtype="CircleProgress" color="rgba(0,0,255,1)" percent="120" radius="30"></CircleProgress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   percent属性->设置进度条进度（60） 
  </Text>
 </View>
 <CircleProgress amtype="CircleProgress" percent="60" radius="20"></CircleProgress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   radius属性->设置进度条圆角值 （30） 
  </Text>
 </View>
 <CircleProgress amtype="CircleProgress" radius="20"></CircleProgress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   borderWidth属性->进度条宽度(10) 
  </Text>
 </View>
 <CircleProgress amtype="CircleProgress" borderWidth="10" radius="30"></CircleProgress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   percent属性->设置进度条进度（0）
  </Text>
 </View>
 <CircleProgress amtype="CircleProgress" borderWidth="0" percent="0" radius="30"></CircleProgress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   percent属性->设置进度条进度（100）
  </Text>
 </View>
 <CircleProgress amtype="CircleProgress" borderWidth="10" percent="100" radius="30"></CircleProgress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
</ScrollView>    
</View>);
  }
}
