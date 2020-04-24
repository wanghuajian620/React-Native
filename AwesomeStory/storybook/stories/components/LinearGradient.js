import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import LinearGradient from 'cap4m/lib/LinearGradient';
import ScrollView from 'cap4m/lib/ScrollView';

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
<ScrollView amtype="ScrollView" contentContainerStyle={{ backgroundColor :"rgb(255, 255, 255)"}}>
 <View style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
  <Text style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
   渐变色
  </Text>
 </View>
 <View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
  <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
    属性：
   </Text>
  </View>
 </View>
 <View style={{ marginTop : px2rn(16) }}>
  <View style={{ fontSize : px2rn(18) , color :"red"}}>
   <Text style={{ fontSize : px2rn(18) , color :"red"}}>
    注意：暂不支持rgba的颜色值表示法
   </Text>
  </View>
 </View>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   start:渐变起始位置(左上角为0,0.5)；end:渐变结束位置(1,1) 
  </Text>
 </View>
 <LinearGradient amtype="LinearGradient" start="0,0.5" end="1,1" colors="yellow,green" style={{ height : px2rn(100) , width : px2rn(300) }}></LinearGradient>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   start:渐变起始位置(左上角为1,0)；end:渐变结束位置(0,1) 
  </Text>
 </View>
 <LinearGradient amtype="LinearGradient" start="1,0" end="0,1" colors="yellow,green" style={{ height : px2rn(100) , width : px2rn(300) }}></LinearGradient>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   colors:yellow, green 
  </Text>
 </View>
 <LinearGradient amtype="LinearGradient" start="0,0" end="1,1" colors="yellow,green" style={{ height : px2rn(100) , width : px2rn(300) }}></LinearGradient>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   colors:yellow, red, green 
  </Text>
 </View>
 <LinearGradient amtype="LinearGradient" start="0,0" end="1,1" colors="yellow,red,green" style={{ height : px2rn(100) , width : px2rn(300) }}></LinearGradient>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    colors:#ffea00,#d9333f,#ffffff 
  </Text>
 </View>
 <LinearGradient amtype="LinearGradient" start="0,0" end="1,1" colors="#ffea00,#d9333f,#ffffff" style={{ height : px2rn(100) , width : px2rn(300) }}></LinearGradient>
</ScrollView>    
</View>);
  }
}
