import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import DatePicker from 'cap4m/lib/DatePicker';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
	function init() {
	 console.log(12)
	}
	function ok($event) {
	 console.log(12)
	}
	function dismiss($event) {
	 console.log(12)
	}
	function valueChange($event) {
	 console.log(12)
	}
	function change($event) {
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
    DatePicker 复选框
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    属性
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    mode=date 日期选择类型
   </Text>
  </View>
  <DatePicker amtype="DatePicker" text="date" mode="date" init={($event)=>init()} change="change($event)" ok="ok($event)" dismiss="dismiss($event)" valueChange="valueChange($event)" onChange={($event)=>change($event)} onValueChange={($event)=>valueChange($event)} onDismiss={($event)=>dismiss($event)} onOk={($event)=>ok($event)}></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    mode=time
   </Text>
  </View>
  <DatePicker amtype="DatePicker" text="time" mode="time"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    mode=datetime
   </Text>
  </View>
  <DatePicker amtype="DatePicker" text="datetime" mode="datetime"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    mode=year
   </Text>
  </View>
  <DatePicker amtype="DatePicker" text="year" mode="year"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    mode=month
   </Text>
  </View>
  <DatePicker amtype="DatePicker" text="month" mode="month"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    text=date 组件左侧标题
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    title=日期选择器 弹框标题
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    extra=picker 显示文案
   </Text>
  </View>
  <DatePicker amtype="DatePicker" text="date" title="日期选择器" extra="picker"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    minDate=2019-01-01 最小日期
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    maxDate=2019-12-31 最大日期
   </Text>
  </View>
  <DatePicker amtype="DatePicker" text="date" minDate="2019-01-01" maxDate="2019-12-31"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    value=2019-11-01 默认选中日期
   </Text>
  </View>
  <DatePicker amtype="DatePicker" text="date" value="2019-11-01"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    disabled=true 是否可用
   </Text>
  </View>
  <DatePicker amtype="DatePicker" text="date" disabled="true"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    minuteStep=2 分钟递增数
   </Text>
  </View>
  <DatePicker amtype="DatePicker" minuteStep="6" mode="datetime"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    format=yyyy-MM-dd HH:mm 格式化选中的值,可选YYYY-MM-DD，HH:mm
   </Text>
  </View>
  <DatePicker amtype="DatePicker" format="yyyy-MM-dd HH:mm"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    format=YYYY-MM-dd 
   </Text>
  </View>
  <DatePicker amtype="DatePicker" format="YYYY-MM-DD"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    format=HH:mm 
   </Text>
  </View>
  <DatePicker amtype="DatePicker" format="HH:mm"></DatePicker>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    showMode=false 是否显示组件
   </Text>
  </View>
  <DatePicker amtype="DatePicker" showMode="false"></DatePicker>
 </ScrollView>
</View>    
</View>);
  }
}
