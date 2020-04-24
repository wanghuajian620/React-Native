import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import Calendar from 'cap4m/lib/Calendar';
import List from 'cap4m/lib/List';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
	 
	function setMaxDate() {
$Calendar('calendar1').setMaxDate('2019-10-1');
}
function setMinDate() {
$Calendar('calendar1').setMinDate('2019-7-1');
}

function onClickList1() {
$Calendar('calendar1').setVisible(true);
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
 <ScrollView amtype="ScrollView" style="style=&quot;display:flex;flex:1;&quot;">
  <View style={{ fontSize : px2rn(28) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) }}>
   <Text style={{ fontSize : px2rn(28) , fontWeight :"800"}}>
    Calendar 日历
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    内置方法
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    setMaxDate 设置最大日期、setMinDate 设置最小日期 
   </Text>
  </View>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <List amtype="List">
   <List.Item amtype="List.Item" click="onClickList1()" onClick={($event)=>onClickList1()}>
    <Text>
      点击选择日期区间 
    </Text>
   </List.Item>
  </List>
  <Calendar amtype="Calendar" id="calendar1" format="yyyy-MM-dd" minDate="2019-01-01" maxDate="2019-12-31" autoref="calendar1" ref="_calendar1"></Calendar>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Button amtype="Button" text="setMaxDate" click=" setMaxDate()" type="primary" onClick={($event)=> setMaxDate()}></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Button amtype="Button" text="setMinDate" click="setMinDate()" type="primary" onClick={($event)=>setMinDate()}></Button>
 </ScrollView>
</View>    
</View>);
  }
}
