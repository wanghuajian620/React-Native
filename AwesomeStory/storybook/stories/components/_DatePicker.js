import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import WingBlank from 'cap4m/lib/WingBlank';
import DatePicker from 'cap4m/lib/DatePicker';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
			function getDisabled() {
var getDisabled = $DatePicker('DatePicker1').getDisabled();
 console.log(12)
}
function setDisabled() {
$DatePicker('DatePicker1').setDisabled(true);
}
function getMinDate() {
 console.log(12);
}
function setMinDate() {
$DatePicker('DatePicker1').setMinDate('2018-01-01 00:00');
}
function getMaxDate() {
 console.log(12)
}
function setMaxDate() {
$DatePicker('DatePicker1').setMaxDate('2019-12-31 00:00');
}
function getValue() {
 console.log(12)
}
function setValue() {
$DatePicker('DatePicker1').setValue('2019-12-17 17:17');
}
function open() {
    $DatePicker('DatePicker0').open();
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
    DatePicker 日期选择
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    内置方法:
   </Text>
  </View>
  <DatePicker amtype="DatePicker" id="DatePicker1" minDate="2019-01-01 00:00" maxDate="2030-11-30 23:59" autoref="DatePicker1" ref="_DatePicker1"></DatePicker>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setMinDate 设置最小日期
    </Text>
   </View>
   <Button amtype="Button" text="setMinDate" click="setMinDate()" type="primary" onClick={($event)=>setMinDate()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setMaxDate 设置最大日期
    </Text>
   </View>
   <Button amtype="Button" text="setMaxDate" click="setMaxDate()" type="primary" onClick={($event)=>setMaxDate()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     getMinDate 获取最小日期
    </Text>
   </View>
   <Button amtype="Button" text="getMinDate" click="getMinDate()" type="primary" onClick={($event)=>getMinDate()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     getMaxDate 获取最大日期
    </Text>
   </View>
   <Button amtype="Button" text="getMaxDate" type="primary" click="getMaxDate()" onClick={($event)=>getMaxDate()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setValue 设置日期值
    </Text>
   </View>
   <Button amtype="Button" text="setValue" type="primary" click="setValue()" onClick={($event)=>setValue()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     getValue 获取日期值
    </Text>
   </View>
   <Button amtype="Button" text="getValue" type="primary" click="getValue()" onClick={($event)=>getValue()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setDisabled 设置禁用
    </Text>
   </View>
   <Button amtype="Button" text="setDisabled" type="primary" click="setDisabled()" onClick={($event)=>setDisabled()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     getDisabled 获取禁用状态
    </Text>
   </View>
   <Button amtype="Button" text="getDisabled" type="primary" click="getDisabled()" onClick={($event)=>getDisabled()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     open 当showMode="false"时，调用该方法显示组件
    </Text>
   </View>
   <Button amtype="Button" text="open" type="primary" click="open()" onClick={($event)=>open()}></Button>
  </WingBlank>
  <DatePicker amtype="DatePicker" id="DatePicker0" showMode="false" autoref="DatePicker0" ref="_DatePicker0"></DatePicker>
 </ScrollView>
</View>    
</View>);
  }
}
