import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Switch from 'cap4m/lib/Switch';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
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
		    $Switch('Switch123').setDisabled(true);
		}
		function setChecked() {
		    //setChecked	设置是否选中
		    $Switch('Switch123').setChecked(false);
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
   内置方法：
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   color属性->开关打开后的背景色（red）
  </Text>
 </View>
 
    <Switch amtype="Switch" id="Switch123" checked="true" click="onClick($event)" color="red" platform="androautoref" onClick={($event)=>onClick($event)} autoref="Switch123" ref="_Switch123"></Switch>

 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   getDisable方法->获取是否可用的值
  </Text>
 </View>
 <View>
  <Text>
   getChecked方法->获取是否选中
  </Text>
 </View>
 <View>
  <Text>
   setDisable方法->设置是否可用
  </Text>
 </View>
 <View>
  <Text>
   setChecked方法->设置是否选中
  </Text>
 </View>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="getDisable()" text="getDisable" type="primary" onClick={($event)=>getDisable()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="getChecked()" text="getChecked" type="primary" onClick={($event)=>getChecked()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="setDisable()" text="setDisable" type="primary" onClick={($event)=>setDisable()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="setChecked()" text="setChecked" type="primary" onClick={($event)=>setChecked()}></Button>
 </WingBlank>
</ScrollView>    
</View>);
  }
}
