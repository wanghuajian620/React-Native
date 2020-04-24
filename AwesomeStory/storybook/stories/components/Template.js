import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Template from 'cap4m/lib/Template';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {}; 
    var data = {title: '这是标题title',text: '这是text'};
    var data1 = {title: '东方',text: '龙的传人'};
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
<View style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
 <Text style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
  Template 模板组件
 </Text>
</View>
<View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
 <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
  <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   属性：
  </Text>
 </View>
</View>
<View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  data: 组件数据源
 </Text>
</View>
<Template amtype="Template" style={{ display :"flex", height : px2rn(100) , width : px2rn(300) , backgroundColor :"yellow"}} data={data} template={(info)=><React.Fragment>
 <View> 
  <View> 
   <Text>
     {info&&info.title} 
   </Text> 
  </View> 
  <View> 
   <Text>
     {info&&info.text} 
   </Text> 
  </View> 
 </View>
</React.Fragment>}></Template>
<View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  style: 背景色pink
 </Text>
</View>
<Template amtype="Template" style={{ display :"flex", height : px2rn(100) , width : px2rn(300) , backgroundColor :"pink"}} data={data1} template={(info)=><React.Fragment>
 <View> 
  <View> 
   <Text>
     {info&&info.title} 
   </Text> 
  </View> 
  <View> 
   <Text>
     {info&&info.text} 
   </Text> 
  </View> 
 </View>
</React.Fragment>}></Template>    
</View>);
  }
}
