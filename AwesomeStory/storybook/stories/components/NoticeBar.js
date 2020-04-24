import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import NoticeBar from 'cap4m/lib/NoticeBar';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {marqueeProps:{
loop:true,
leading:3000,
fps:500,
style:{
color:"blue"
}
}
};
		function onClick(e) {
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
   NoticeBar通告栏
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   mode属性->提示类型，可选 closable,link 
  </Text>
 </View>
 <NoticeBar amtype="NoticeBar" mode="link">
  <Text>
    Notice: The arrival time of incomes and transfers of Yu 'E Bao will END
  </Text>
 </NoticeBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   icon属性->在开始位置设置图标 （up）
  </Text>
 </View>
 <NoticeBar amtype="NoticeBar" icon="up">
  <Text>
    Notice: The arrival time of incomes and transfers of Yu 'E Bao will END
  </Text>
 </NoticeBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   click属性->点击关闭或者操作区域的回调函数
  </Text>
 </View>
 <NoticeBar amtype="NoticeBar" click="onClick($event)" onClick={($event)=>onClick($event)}>
  <Text>
    Notice: The arrival time of incomes and transfers of Yu 'E Bao will END
  </Text>
 </NoticeBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   marqueeProps属性->参数（loop:true,leading:3000,fps:500,style:color:blue） 
  </Text>
 </View>
 <NoticeBar amtype="NoticeBar" marqueeProps={this.state.marqueeProps}>
  <Text>
    Notice: The arrival time of incomes and transfers of Yu 'E END 
  </Text>
 </NoticeBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   actionText属性->用于替换操作 icon 的文案（不再提示） 
  </Text>
 </View>
 <NoticeBar amtype="NoticeBar" mode="link" actionText="不再提示">
  <Text>
    Notice: The arrival time of incomes and transfers of Yu 'E Bao will END
  </Text>
 </NoticeBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   actionStyle属性->用于替换操作 icon 样式（color: red） 
  </Text>
 </View>
 <NoticeBar amtype="NoticeBar" mode="closable" actionText="不再提示" actionStyle={{ color :"red"}}>
  <Text>
    Notice: The arrival time of incomes and transfers of Yu 'E Bao will END
  </Text>
 </NoticeBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   actionStyle属性->用于替换操作 icon 样式（color: rgba(255,0,0,1)） 
  </Text>
 </View>
 <NoticeBar amtype="NoticeBar" mode="closable" actionText="不再提示" actionStyle={{ color :"rgba(255, 0, 0, 1)"}}>
  <Text>
    Notice: The arrival time of incomes and transfers of Yu 'E Bao will END
  </Text>
 </NoticeBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   actionStyle属性->用于替换操作 icon 样式（color: #f00） 
  </Text>
 </View>
 <NoticeBar amtype="NoticeBar" mode="closable" actionText="不再提示" actionStyle={{ color :"rgb(255, 0, 0)"}}>
  <Text>
    Notice: The arrival time of incomes and transfers of Yu 'E Bao will END
  </Text>
 </NoticeBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
</ScrollView>    
</View>);
  }
}
