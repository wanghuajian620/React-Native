import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import WhiteSpace from 'cap4m/lib/WhiteSpace';
import {$Local} from '../../src/util/index';
import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
function setVisable() {
    $Button('visable').setVisable(false);
}
function setText() {
    $Button('setText').setText('hello world');
}
function setDisabled() {
    $Button('disabled').setDisabled(true);
}
function setTextStyle() {
    $Button('setTextStyle').setTextStyle("color:gold;font-size:20px;font-weight:bold");
}
function setContainerStyle() {
    $Button('setContainerStyle').setContainerStyle("background-color:red;width:300px;height:50px;border-radius:20px");
}
function getVisable() {
    alert("getVisable:  " + $Button('visable').getVisable());
}
function getDisabled() {
    alert("getDisabled  " + $Button('disabled').getDisabled());
}
function setData() {
    $Local.setCache('user', '{"name": "小坤", "age": "20"}');
    alert('success');
  }
  function getData() {
    $Local.getCache('user', function(data) {
      alert(JSON.stringify(data));
    });
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
<View style={{ display :"flex", flex :1}}>
 <ScrollView amtype="ScrollView" style={{ display :"flex", flex :1}}>
  <View style={{ fontSize : px2rn(28) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) }}>
   <Text style={{ fontSize : px2rn(28) , fontWeight :"800"}}>
    Button 按钮
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    内置方法:
   </Text>
  </View>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Button amtype="Button" type="primary" id="visable" text="visable" ref="_visable" autoref="visable"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    setVisable 设置按钮是否可见
   </Text>
  </View>
  <Button amtype="Button" type="primary" id="setVisable" text="setVisable" click="setVisable()" onClick={($event)=>setVisable()} ref="_setVisable" autoref="setVisable"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    getVisable 获取按钮是否可见
   </Text>
  </View>
  <Button amtype="Button" type="primary" id="getVisable" text="getVisable" click="getVisable()" onClick={($event)=>getVisable()} ref="_getVisable" autoref="getVisable"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Button amtype="Button" type="primary" id="disabled" text="disabled" ref="_disabled" autoref="disabled"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    setDisabled 设置按钮禁用
   </Text>
  </View>
  <Button amtype="Button" type="primary" id="setDisabled" text="setDisabled" click="setDisabled()" onClick={($event)=>setDisabled()} ref="_setDisabled" autoref="setDisabled"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    getDisabled 获取按钮是否禁用
   </Text>
  </View>
  <Button amtype="Button" type="primary" id="getDisabled" text="getDisabled" click="getDisabled()" onClick={($event)=>getDisabled()} ref="_getDisabled" autoref="getDisabled"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setTextStyle 设置按钮文本样式 
   </Text>
  </View>
  <Button amtype="Button" type="primary" id="setTextStyle" text="setTextStyle" click="setTextStyle()" onClick={($event)=>setTextStyle()} ref="_setTextStyle" autoref="setTextStyle"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setContainerStyle 设置按钮容器样式 
   </Text>
  </View>
  <Button amtype="Button" type="primary" id="setContainerStyle" text="setContainerStyle" click="setContainerStyle()" onClick={($event)=>setContainerStyle()} ref="_setContainerStyle" autoref="setContainerStyle"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setText（rn only）设置按钮文字 
   </Text>
  </View>
  <Button amtype="Button" type="primary" id="setText" text="setText" click="setText()" onClick={($event)=>setText()} ref="_setText" autoref="setText"></Button>
  <WhiteSpace></WhiteSpace>
    <Button amtype="Button" type='primary' click="setData()" text='存数据' onClick={($event)=>setData()}></Button>
    <WhiteSpace></WhiteSpace>
    <Button amtype="Button" type='primary' click="getData()" text='取数据' onClick={($event)=>getData()}></Button> 
 </ScrollView>
</View>    
</View>);
  }
}
