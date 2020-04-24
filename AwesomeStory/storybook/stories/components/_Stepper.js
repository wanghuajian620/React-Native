import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import Stepper from 'cap4m/lib/Stepper';
import WingBlank from 'cap4m/lib/WingBlank';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

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
		function getValue() {
		    console.log($Stepper('Stepper123').getValue());
		}
		function setValue() {
		    $Stepper('Stepper123').setValue(5);
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
   内置方法:
  </Text>
 </View>
 <View style={{ color :"red", marginTop : px2rn(15) , marginBottom : px2rn(5) }}>
  <Text style={{ color :"red"}}>
   注意:设置值时，必须是数字，否则显示最大值
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   getValue方法->获取显示值
  </Text>
 </View>
 <View>
  <Text>
   setValue方法->设置显示值(5)
  </Text>
 </View>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Stepper amtype="Stepper" id="Stepper123" min={0} max={18} step={2} change="change($event)" onChange={($event)=>change($event)} ref="_Stepper123" autoref="Stepper123"></Stepper>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="getValue()" text="getValue" type="primary" onClick={($event)=>getValue()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="setValue()" text="setValue" type="primary" onClick={($event)=>setValue()}></Button>
 </WingBlank>
</ScrollView>    
</View>);
  }
}
