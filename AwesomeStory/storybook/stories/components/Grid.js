import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Grid from 'cap4m/lib/Grid';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {data:[
{
icon:require("../image/cap4m_jjk.png"),
text:'兴业借记卡'
},
{
icon:require("../image/cap4m_xyk.png"),
text:'兴业信用卡'
},
{
icon:require("../image/cap4m_qd.png"),
text:'钱大掌柜'
},
{
icon:require("../image/cap4m_xf.png"),
text:'消费金融'
},
{
icon:require("../image/cap4m_xyjj.png"),
text:'华富证券'
},
{
icon:require("../image/cap4m_xyxt.png"),
text:'兴业基金'
},
{
icon:require("../image/cap4m_hf.png"),
text:'兴业信托'
},
{
icon:require("../image/cap4m_xyqh.png"),
text:'兴业期货'
},
{
icon:require("../image/cap4m_xyyj.png"),
text:'兴业研究'
}
]
};
		function onClick(e) {
		     console.log(12)
		}
		function afterChange(e) {
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
<ScrollView amtype="ScrollView">
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   Grid宫格组件
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    data属性->传入的菜单数据 
  </Text>
 </View>
 <View>
  <Text>
    imgWidth属性->设置图片宽度 
  </Text>
 </View>
 <View>
  <Text>
    imgHeight属性->设置图片高度 
  </Text>
 </View>
 <Grid amtype="Grid" data={this.state.data} imgWidth={32} imgHeight={22}></Grid>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   click属性->点击每个菜单的回调函数
  </Text>
 </View>
 <Grid amtype="Grid" data={this.state.data} click="onClick($event)" imgWidth={32 } imgHeight={22} onClick={($event)=>onClick($event)}></Grid>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    columnNum属性->列数 (5) 
  </Text>
 </View>
 <View>
  <Text>
    hasLine属性->是否有边框 (false) 
  </Text>
 </View>
 <Grid amtype="Grid" data={this.state.data} columnNum={5} hasLine="false" imgWidth={32} imgHeight={22}></Grid>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    isCarousel属性->是否启用跑马灯模式 （true） 
  </Text>
 </View>
 <View>
  <Text>
    carouselMaxRow属性->跑马灯需要展示的页数（2） 
  </Text>
 </View>
 <Grid amtype="Grid" data={this.state.data} imgWidth={32} imgHeight={22} isCarousel="true" carouselMaxRow={2}></Grid>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    itemStyle属性->每个格子自定义样式 
  </Text>
 </View>
 <Grid amtype="Grid" data={this.state.data} imgWidth={32} imgHeight={22} itemStyle={{ borderStyle :"solid", borderWidth : px2rn(1) , borderColor :"red"}}></Grid>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    fontColor属性->字体颜色 （orange） 
  </Text>
 </View>
 <View>
  <Text>
    fontSize属性->字体大小 (10） 
  </Text>
 </View>
 <Grid amtype="Grid" data={this.state.data} imgWidth={32} imgHeight={22} fontColor="orange" fontSize={10}></Grid>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    afterChange属性->切换面板后的回调函数 
  </Text>
 </View>
 <Grid amtype="Grid" data={this.state.data} imgWidth={32} imgHeight={22} isCarousel="true" carouselMaxRow={2} afterChange={($event)=>afterChange($event)}></Grid>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
</ScrollView>    
</View>);
  }
}
