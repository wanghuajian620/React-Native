import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Switch from 'cap4m/lib/Switch';
import ScrollView from 'cap4m/lib/ScrollView';


import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function change($event) {
		    console.log(12)
		}
		//ononClick	onClick事件触发的回调函数，当switch为disabled时，入参的值始终是默认传入的checked值。
		function onClick($event) {
		     console.log(12)
		}
		function getDisable() {
		     console.log(12)
		}
		function getChecked() {
		     console.log(12)
		}
		function setDisable() {
		    //setDisabled	设置是否可用
		    $Switch('Switch1').setDisabled(true);
		}
		function setChecked() {
		    //setChecked	设置是否选中
		    $Switch('Switch2').setChecked(false);
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
   Switch 滑动开关
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性：
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   checked属性->是否默认选中（true）
  </Text>
 </View>
 <View>
  <Text>
   platform属性->根据平台自适应（ios）
  </Text>
 </View>
 <View>
  <Text>
   change属性->改变状态的回调
  </Text>
 </View>
 
    <Switch amtype="Switch" id="Switch1" checked="true" change="change($event)" platform="ios" onChange={($event)=>change($event)} autoref="Switch1" ref="_Switch1"></Switch>
  
 
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   color属性->开关打开后的背景色（red）
  </Text>
 </View>
 
    <Switch amtype="Switch" id="Switch2" checked="true" click="onClick($event)" color="red" platform="androautoref" onClick={($event)=>onClick($event)} autoref="Switch2" ref="_Switch2"></Switch>
  
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   color属性->开关打开后的背景色（#f00）
  </Text>
 </View>
 
    <Switch amtype="Switch" id="Switch2" checked="true" click="onClick($event)" color="#f00" platform="androautoref" onClick={($event)=>onClick($event)} autoref="Switch2" ref="_Switch2"></Switch>
 
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   color属性->开关打开后的背景色（rgba(255,0,0,1)）
  </Text>
 </View>
 
    <Switch amtype="Switch" id="Switch2" checked="true" click="onClick($event)" color="rgba(255,0,0,1)" platform="androautoref" onClick={($event)=>onClick($event)} autoref="Switch2" ref="_Switch2"></Switch>
</ScrollView>    
</View>);
  }
}
