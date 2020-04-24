import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
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
function onClickList() {
$Calendar('_calendar').setVisible(true);
}
function _onClickList() {

$Calendar('calendar').setVisible(true);
}
function confirm3(e) {
 console.log(12)

}
function cancel(e) {

 console.log(12)
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
    Calendar 日历
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    属性:
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    format=yyyy-MM-DD 日期格式
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    minDate=2019-01-01 最大日期
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    maxDate=2019-12-31 最小日期
   </Text>
  </View>
  <List amtype="List">
   <List.Item amtype="List.Item" click="onClickList()" onClick={($event)=>onClickList()}>
    <Text>
      点击选择日期区间 
    </Text>
   </List.Item>
  </List>
  <Calendar amtype="Calendar" id="_calendar" format="yyyy-MM-DD" minDate="2019-01-01" maxDate="2019-12-31" confirm="confirm3($event)" cancel="cancel($event)" onCancel={($event)=>cancel($event)} onConfirm={($event)=>confirm3($event)} autoref="_calendar" ref="__calendar"></Calendar>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    startDate=2019-11-1 默认的开始日期
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    endDate=2019-11-7 默认的结束日期
   </Text>
  </View>
  <List amtype="List">
   <List.Item amtype="List.Item" click="_onClickList()" onClick={($event)=>_onClickList()}>
    <Text>
      点击选择日期区间 
    </Text>
   </List.Item>
  </List>
  <Calendar amtype="Calendar" id="calendar" format="yyyy-MM-dd" startDate="2019-11-1" endDate="2019-11-7" confirm="confirm3($event)" cancel="cancel($event)" onCancel={($event)=>cancel($event)} onConfirm={($event)=>confirm3($event)} autoref="calendar" ref="_calendar"></Calendar>
 </ScrollView>
</View>    
</View>);
  }
}
