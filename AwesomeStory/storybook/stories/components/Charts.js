import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Charts from 'cap4m/lib/Charts';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {charts_radar:{
title:{
text:'基础雷达图'
},
tooltip:{
},
legend:{
data:[
'预算分配（Allocated Budget）',
'实际开销（Actual Spending）'
]
},
radar:{
name:{
textStyle:{
color:'#fff',
backgroundColor:'#999',
borderRadius:3,
padding:[
3,
5
]
}
},
indicator:[
{
name:'销售（sales）',
max:6500
},
{
name:'管理（Administration）',
max:16000
},
{
name:'信息技术（Information Techology）',
max:30000
},
{
name:'客服（Customer Support）',
max:38000
},
{
name:'研发（Development）',
max:52000
},
{
name:'市场（Marketing）',
max:25000
}
]
},
series:[
{
name:'预算 vs 开销（Budget vs spending）',
type:'radar',
data:[
{
value:[
4300,
10000,
28000,
35000,
50000,
19000
],
name:'预算分配（Allocated Budget）'
},
{
value:[
5000,
14000,
28000,
31000,
42000,
21000
],
name:'实际开销（Actual Spending）'
}
]
}
]
},
charts_line:{
title:{
text:'折线图堆叠',
x:'center'
},
tooltip:{
trigger:'axis'
},
legend:{
data:[
'邮件营销',
'联盟广告',
'视频广告',
'直接访问',
'搜索引擎'
]
},
grautoref:{
left:'3%',
right:'4%',
bottom:'3%',
containLabel:true
},
toolbox:{
feature:{
saveAsImage:{
}
}
},
xAxis:{
type:'category',
boundaryGap:false,
data:[
'周一',
'周二',
'周三',
'周四',
'周五',
'周六',
'周日'
]
},
yAxis:{
type:'value'
},
series:[
{
name:'邮件营销',
type:'line',
stack:'总量',
data:[
120,
132,
101,
134,
90,
230,
210
]
},
{
name:'联盟广告',
type:'line',
stack:'总量',
data:[
220,
182,
191,
234,
290,
330,
310
]
},
{
name:'视频广告',
type:'line',
stack:'总量',
data:[
150,
232,
201,
154,
190,
330,
410
]
},
{
name:'直接访问',
type:'line',
stack:'总量',
data:[
320,
332,
301,
334,
390,
330,
320
]
},
{
name:'搜索引擎',
type:'line',
stack:'总量',
data:[
820,
932,
901,
934,
1290,
1330,
1320
]
}
]
},
charts_pie:{
title:{
text:'饼图',
subtext:'纯属虚构',
x:'center'
},
tooltip:{
trigger:'item',
formatter:'{a} <br/>{b} : {c} ({d}%)'
},
legend:{
orient:'vertical',
left:'left',
data:[
'直接访问',
'邮件营销',
'联盟广告',
'视频广告',
'搜索引擎'
]
},
series:[
{
name:'访问来源',
type:'pie',
radius:'55%',
center:[
'50%',
'60%'
],
data:[
{
value:335,
name:'直接访问'
},
{
value:310,
name:'邮件营销'
},
{
value:234,
name:'联盟广告'
},
{
value:135,
name:'视频广告'
},
{
value:1548,
name:'搜索引擎'
}
],
itemStyle:{
emphasis:{
shadowBlur:10,
shadowOffsetX:0,
shadowColor:'rgba(0, 0, 0, 0.5)'
}
}
}
]
},
charts_bar:{
title:{
text:'柱状图'
},
tooltip:{
},
legend:{
data:[
'销量'
]
},
xAxis:{
data:[
'衬衫',
'羊毛衫',
'雪纺衫',
'裤子',
'高跟鞋',
'袜子'
]
},
yAxis:{
},
series:[
{
name:'销量',
type:'bar',
data:[
5,
20,
36,
10,
10,
20
]
}
]
}
};
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
   Charts 图表组件 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   option属性->图表的数据
  </Text>
 </View>
 <View>
  <Text>
   height属性->图表的高 （400）
  </Text>
 </View>
 <View>
  <Text>
   width属性->图表的宽 （400）
  </Text>
 </View>
 <Charts amtype="Charts" height={400} width={400} option={this.state.charts_radar}></Charts>
 <WhiteSpace amtype="WhiteSpace" size="xl"></WhiteSpace>
 <WhiteSpace amtype="WhiteSpace" size="xl"></WhiteSpace>
 <Charts amtype="Charts" height={400} width={400} option={this.state.charts_line}></Charts>
 <WhiteSpace amtype="WhiteSpace" size="xl"></WhiteSpace>
 <WhiteSpace amtype="WhiteSpace" size="xl"></WhiteSpace>
 <Charts amtype="Charts" height={400} width={400} option={this.state.charts_pie}></Charts>
 <WhiteSpace amtype="WhiteSpace" size="xl"></WhiteSpace>
 <WhiteSpace amtype="WhiteSpace" size="xl"></WhiteSpace>
 <Charts amtype="Charts" height={400} width={400} option={this.state.charts_bar}></Charts>
</ScrollView>    
</View>);
  }
}
