import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
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
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
 <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
  ScrollView滚动条 
 </Text>
</View>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
 <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  属性:
 </Text>
</View>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  horizontal属性->控制是水平还是垂直滑动（true）
 </Text>
</View>
<ScrollView amtype="ScrollView" horizontal="true">
 <View style={{ backgroundColor :"red", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"orange", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"blue", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"green", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"blue", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
</ScrollView>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  horizontal属性->控制是水平还是垂直滑动（false）
 </Text>
</View>
<ScrollView amtype="ScrollView" horizontal="false">
 <View style={{ backgroundColor :"red", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"orange", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"blue", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"green", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"blue", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
</ScrollView>    
</View>);
  }
}
