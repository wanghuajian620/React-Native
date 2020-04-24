import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Secret from 'cap4m/lib/Secret';
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
<ScrollView amtype="ScrollView">
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   Secret 安全显示 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ color :"red"}}>
  <Text style={{ color :"red"}}>
   rule属性必须要有
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   fontColor属性->字体颜色（red)
  </Text>
 </View>
 <Secret amtype="Secret" fontColor="red" value="6217888899087654" rule="1,4" spaceAfter={4}></Secret>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   fontColor属性->字体颜色（#f00)
  </Text>
 </View>
 <Secret amtype="Secret" fontColor="#f00" value="6217888899087654" rule="1,4" spaceAfter={4}></Secret>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   fontColor属性->字体颜色（rgba(255,0,0,1))
  </Text>
 </View>
 <Secret amtype="Secret" fontColor="rgba(255,0,0,1)" value="6217888899087654" rule="1,4" spaceAfter={4}></Secret>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   value属性->显示的值（6217888899081234)
  </Text>
 </View>
 <Secret amtype="Secret" fontColor="blue" value="6217888899081234" rule="1,4" spaceAfter={4}></Secret>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   rule属性->需要加密的字符开始和结束位置（2,4） 
  </Text>
 </View>
 <Secret amtype="Secret" fontColor="pink" value="6217888899087654" rule="2,4" spaceAfter={4}></Secret>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   fontWeight属性->字体的粗细（800)
  </Text>
 </View>
 <Secret amtype="Secret" fontColor="pink" value="6217888899087654" rule="1,4" spaceAfter={4} fontWeight="800"></Secret>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   spaceAfter属性->分割的位数（3)
  </Text>
 </View>
 <Secret amtype="Secret" fontColor="pink" value="6217888899087654" rule="1,4" spaceAfter={3}></Secret>
</ScrollView>    
</View>);
  }
}
