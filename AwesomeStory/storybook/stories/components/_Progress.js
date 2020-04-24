import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Progress from 'cap4m/lib/Progress';
import Button from 'cap4m/lib/Button';
import WingBlank from 'cap4m/lib/WingBlank';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
    function click1(){
    	console.log(12)
    } 
    function click2(){
    	$Progress('Progress1').setPercent(70);
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
<View style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
 <Text style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
  Progress 进度条
 </Text>
</View>
<View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
 <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
  <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   内置方法：
  </Text>
 </View>
</View>
<View style={{ marginTop : px2rn(20) , height : px2rn(20) }}>
 <Progress amtype="Progress" id="Progress1" percent={50} position="normal" unfilled="true" barStyle={{ backgroundColor :"pink"}} style={{ backgroundColor :"rgb(56, 180, 139)"}} ref="_Progress1" autoref="Progress1"></Progress>
</View>
<WingBlank amtype="WingBlank" size="lg">
 <Button amtype="Button" text="getPercent" click="click1()" type="primary" onClick={($event)=>click1()}></Button>
</WingBlank>
<WingBlank amtype="WingBlank" size="lg">
 <Button amtype="Button" text="setPercent" click="click2()" type="primary" onClick={($event)=>click2()}></Button>
</WingBlank>    
</View>);
  }
}
