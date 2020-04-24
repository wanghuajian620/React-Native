import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Progress from 'cap4m/lib/Progress';
import ScrollView from 'cap4m/lib/ScrollView';
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
<ScrollView amtype="ScrollView" contentContainerStyle={{ backgroundColor :"rgb(255, 255, 255)"}}>
 <View style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
  <Text style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
   Progress 进度条
  </Text>
 </View>
 <View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
  <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
    属性：
   </Text>
  </View>
 </View>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   progress 进度百分比(以下分别是： 0、15、-55、110)
  </Text>
 </View>
 <Progress amtype="Progress" percent={0} position="normal"></Progress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="normal"></Progress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={-55} position="normal"></Progress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={110} position="normal"></Progress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   position 进度条的位置，fixed 将浮出固定在最顶层，可选: fixed(在容器组件中嵌套progress则无效) normal
  </Text>
 </View>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   position: fixed（在窗口顶部）
  </Text>
 </View>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="fixed"></Progress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   position: normal
  </Text>
 </View>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="normal"></Progress>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   unfilled:是否显示未填充的轨道(以下分别是true、false)
  </Text>
 </View>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="normal" unfilled="true"></Progress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="normal" unfilled="false"></Progress>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   barStyle 设置进度条进度的样式(以下分别是背景色black、#000、rgba(100,255,0,1))
  </Text>
 </View>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="normal" unfilled="true" barStyle={{ backgroundColor :"black"}}></Progress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="normal" unfilled="true" barStyle={{ backgroundColor :"rgb(0, 0, 0)"}}></Progress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="normal" unfilled="true" barStyle={{ backgroundColor :"rgba(100, 255, 0, 1)"}}></Progress>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   style设置进度框样式(以下分别是背景色green、#006e54、rgba(100,255,0,1))
  </Text>
 </View>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="normal" unfilled="true" barStyle={{ backgroundColor :"black"}} style={{ backgroundColor :"green"}}></Progress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="normal" unfilled="true" barStyle={{ backgroundColor :"black"}} style={{ backgroundColor :"rgb(0, 110, 84)"}}></Progress>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Progress amtype="Progress" percent={15} position="normal" unfilled="true" barStyle={{ backgroundColor :"black"}} style={{ backgroundColor :"rgba(100, 255, 0, 1)"}}></Progress>
</ScrollView>    
</View>);
  }
}
