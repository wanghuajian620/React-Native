import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
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
    属性:
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    type=default/ghost/warning/primary 按钮类型
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    text=default/ghost/warning/primary 按钮文本
   </Text>
  </View>
  <Button amtype="Button" type="default" text="default"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Button amtype="Button" type="ghost" text="ghost"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Button amtype="Button" type="warning" text="warning"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Button amtype="Button" type="primary" text="primary"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    size=large/small 按钮大小
   </Text>
  </View>
  <Button amtype="Button" type="primary" text="large" size="large"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Button amtype="Button" type="primary" text="small" size="small"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    visable=false 按钮是否可见
   </Text>
  </View>
  <Button amtype="Button" type="primary" visable="false"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    disabled=false 按钮是否禁用
   </Text>
  </View>
  <Button amtype="Button" type="primary" disabled="false" text="disabled"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    textStyle=(color:red,fontSize:20,fontWeight:700) 文字样式
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    icon=loading 图标类型
   </Text>
  </View>
  <Button amtype="Button" icon="loading" text="textStyle" type="primary" textStyle={{ color :"red", fontSize : px2rn(20) , fontWeight :"700"}}></Button>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    textStyle=(color:#0000FF,fontSize:30,fontWeight:700) 文字样式
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    icon=loading 图标类型
   </Text>
  </View>
  <Button amtype="Button" icon="loading" text="textStyle" type="primary" textStyle={{ color :"rgb(0, 0, 255)", fontSize : px2rn(30) , fontWeight :"700"}}></Button>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    textStyle=(color:rgb(0,255,0),fontSize:10,fontWeight:bold) 文字样式
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    icon=loading 图标类型
   </Text>
  </View>
  <Button amtype="Button" icon="loading" text="textStyle" type="primary" textStyle={{ color :"rgb(0, 255, 0)", fontSize : px2rn(10) , fontWeight :"bold"}}></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    containerStyle=(backgroundColor:red,width:300,height:50,borderRadius:20) 按钮样式
   </Text>
  </View>
  <Button amtype="Button" text="containerStyle" containerStyle={{ backgroundColor :"red", width : px2rn(300) , height : px2rn(50) , borderRadius : px2rn(20) }} type="primary"></Button>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    containerStyle=(backgroundColor:rgb(255,0,0),width:400,height:60,borderRadius:30) 按钮样式
   </Text>
  </View>
  <Button amtype="Button" text="containerStyle" containerStyle={{ backgroundColor :"rgb(255, 0, 0)", width : px2rn(400) , height : px2rn(60) , borderRadius : px2rn(30) }} type="primary"></Button>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    containerStyle=(backgroundColor:#FF000F,width:200,height:40,borderRadius:0px) 按钮样式
   </Text>
  </View>
  <Button amtype="Button" text="containerStyle" containerStyle={{ backgroundColor :"rgb(255, 0, 15)", width : px2rn(200) , height : px2rn(40) , borderRadius : px2rn(0) }} type="primary"></Button>
 </ScrollView>
</View>    
</View>);
  }
}
