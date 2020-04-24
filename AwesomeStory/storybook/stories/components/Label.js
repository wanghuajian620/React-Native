import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Label from 'cap4m/lib/Label';

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
   Label标签 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   title->label左侧值 
  </Text>
 </View>
 <View style={{ height : px2rn(50) , backgroundColor :"rgb(255, 255, 255)"}}>
  <Label amtype="Label" title="title"></Label>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   text label右侧值
  </Text>
 </View>
 <View style={{ height : px2rn(50) }}>
  <Label amtype="Label" title="title左侧" text={'text右'}></Label>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   titleStyle title 样式（red） 
  </Text>
 </View>
 <View style={{ height : px2rn(50) }}>
  <Label amtype="Label" title="title" titleStyle={{ color :"red"}}></Label>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   textStyle text 样式（rgba(0,255,0,1)） 
  </Text>
 </View>
 <View style={{ height : px2rn(50) , backgroundColor :"rgb(255, 255, 255)"}}>
  <Label amtype="Label" title="title" text={'text'} textStyle={{ color :"rgba(0, 255, 0, 1)"}}></Label>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   textStyle text 样式（#f00） 
  </Text>
 </View>
 <View style={{ height : px2rn(50) , backgroundColor :"rgb(255, 255, 255)"}}>
  <Label amtype="Label" title="title" text={'text'} textStyle={{ color :"rgb(255, 0, 0)"}}></Label>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    width label宽度
  </Text>
 </View>
 <View style={{ height : px2rn(50) , backgroundColor :"blue", width : px2rn(100) }}>
  <Label amtype="Label" title="title" text={'text'} width={px2rn(100)}></Label>
 </View>
</ScrollView>    
</View>);
  }
}
