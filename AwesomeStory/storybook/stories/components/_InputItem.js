import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import InputItem from 'cap4m/lib/InputItem';
import WingBlank from 'cap4m/lib/WingBlank';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {rules1:[
{
pattern:/^[1]\d{10}$/,
required:true,
message:'请输入以1开头的11位手机号'
}
]
};
			function erroronClick($event) {
    console.log("erroronClick: " + JSON.stringify($event));
}
function getDisabled() {
     console.log(12)
}
function getValue() {
console.log(12)
}
function getEditable() {
    console.log(12)
}
function setDisabled() {
    $InputItem('InputItem25').setDisabled(true);
}
function setValue() {
    $InputItem('InputItem35').setValue('hello world');
}
function setEditable() {
    $InputItem('InputItem15').setEditable(false);
}
function validate() {
  console.log(12)
}
function setRules() {
    var rule = [{
        pattern: /^[2]\d{10}$/,
        required: true,
        message: '请输入以2开头的11位手机号'
    }];
    $InputItem('setRules5').setRules(rule);
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
    InputItem 文本输入
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    内置方法:
   </Text>
  </View>
  <InputItem amtype="InputItem" id="InputItem15" type="text" placeholder="请输入" text="文本输入框" autoref="InputItem15" ref="_InputItem15"></InputItem>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     getEditable 获取文本框编辑状态
    </Text>
   </View>
   <Button amtype="Button" click="getEditable()" text="getEditable" type="primary" onClick={($event)=>getEditable()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setEditable 设置文本框编辑状态
    </Text>
   </View>
   <Button amtype="Button" click="setEditable()" text="setEditable" type="primary" onClick={($event)=>setEditable()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <InputItem amtype="InputItem" id="InputItem25" type="text" placeholder="请输入" text="文本输入框" autoref="InputItem25" ref="_InputItem25"></InputItem>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     getDisabled 获取文本框禁用状态
    </Text>
   </View>
   <Button amtype="Button" click="getDisabled()" text="getDisabled" type="primary" onClick={($event)=>getDisabled()}></Button>
   <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
   <WingBlank amtype="WingBlank" size="lg">
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      setDisabled 设置文本框禁用
     </Text>
    </View>
    <Button amtype="Button" click="setDisabled()" text="setDisabled" type="primary" onClick={($event)=>setDisabled()}></Button>
   </WingBlank>
   <InputItem amtype="InputItem" id="InputItem35" type="text" placeholder="请输入" text="文本输入框" autoref="InputItem35" ref="_InputItem35"></InputItem>
   <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
   <WingBlank amtype="WingBlank" size="lg">
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      getValue 获取文本框输入值
     </Text>
    </View>
    <Button amtype="Button" click="getValue()" text="getValue" type="primary" onClick={($event)=>getValue()}></Button>
   </WingBlank>
   <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
   <WingBlank amtype="WingBlank" size="lg">
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      setValue 设置文本框输入值
     </Text>
    </View>
    <Button amtype="Button" click="setValue()" text="setValue" type="primary" onClick={($event)=>setValue()}></Button>
   </WingBlank>
   <InputItem amtype="InputItem" id="validate5" rules={this.state.rules1} type="text" text="文本输入框" errorClick="erroronClick($event)" onErrorClick={($event)=>erroronClick($event)} autoref="validate5" ref="_validate5"></InputItem>
   <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
   <WingBlank amtype="WingBlank" size="lg">
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      validate 表单校验
     </Text>
    </View>
    <Button amtype="Button" click="validate()" text="validate" type="primary" onClick={($event)=>validate()}></Button>
   </WingBlank>
   <InputItem amtype="InputItem" id="setRules5" rules={this.state.rules1} type="text" text="文本输入框" errorClick="erroronClick($event)" onErrorClick={($event)=>erroronClick($event)} autoref="setRules5" ref="_setRules5"></InputItem>
   <WingBlank amtype="WingBlank" size="lg">
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      setRules 设置文本框校验规则
     </Text>
    </View>
    <Button amtype="Button" click="setRules()" text="setRules" type="primary" onClick={($event)=>setRules()}></Button>
   </WingBlank>
  </WingBlank>
 </ScrollView>
</View>    
</View>);
  }
}
