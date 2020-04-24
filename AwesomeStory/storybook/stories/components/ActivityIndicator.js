import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ActivityIndicator from 'cap4m/lib/ActivityIndicator';

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
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
 <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
  ActivityIndicator加载图标 
 </Text>
</View>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
 <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  属性:
 </Text>
</View>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  animating->控制显示（true）
 </Text>
</View>
<ActivityIndicator amtype="ActivityIndicator" animating="true" color="red" size="large"></ActivityIndicator>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  color->控制颜色（red）
 </Text>
</View>
<ActivityIndicator amtype="ActivityIndicator" animating="true" color="red" size="small"></ActivityIndicator>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  color->控制颜色（#f00）
 </Text>
</View>
<ActivityIndicator amtype="ActivityIndicator" animating="true" color="#f00" size="small"></ActivityIndicator>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  color->控制颜色（rgb(255,0,0)）
 </Text>
</View>
<ActivityIndicator amtype="ActivityIndicator" animating="true" color="rgb(255,0,0)" size="small"></ActivityIndicator>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  size->控制大小（small）
 </Text>
</View>
<ActivityIndicator amtype="ActivityIndicator" animating="true" color="red" size="small"></ActivityIndicator>    
</View>);
  }
}
