import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Stepper from 'cap4m/lib/Stepper';

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
   Stepper 步进器
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   min属性->最小值（1）
  </Text>
 </View>
 <View>
  <Text>
   max属性->最大值（10）
  </Text>
 </View>
 <View>
  <Text>
   step属性->改变的步数（2）
  </Text>
 </View>
 <View>
  <Text>
   defaultValue属性->初始值（2）
  </Text>
 </View>
 <View style={{ display :"flex", flexDirection :"row", width : px2rn(200) }}>
  <Stepper amtype="Stepper" min={1} max={10} step={2} defaultValue={2}></Stepper>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   value属性->当前值（10）
  </Text>
 </View>
 <View>
  <Text>
   change属性->变化时的回调
  </Text>
 </View>
 <View style={{ display :"flex", flexDirection :"row", width : px2rn(200) }}>
  <Stepper amtype="Stepper" value={10} change="change($event)" onChange={($event)=>change($event)}></Stepper>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   disabled属性->禁止（"true"）
  </Text>
 </View>
 <View style={{ display :"flex", flexDirection :"row", width : px2rn(200) }}>
  <Stepper amtype="Stepper" disabled="true"></Stepper>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   readOnly属性->只读（"true"）
  </Text>
 </View>
 <View style={{ display :"flex", flexDirection :"row", width : px2rn(200) }}>
  <Stepper amtype="Stepper" readOnly="true"></Stepper>
 </View>
</ScrollView>    
</View>);
  }
}
