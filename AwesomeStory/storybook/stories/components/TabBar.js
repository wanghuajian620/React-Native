import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import TabBar from 'cap4m/lib/TabBar';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR={};
function onPress($event) {
    console.log('onPress:' + JSON.stringify($event));
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
 <TabBar amtype="TabBar" barTintColor="green" tintColor="red" unselectedTintColor="blue" selectedTab="1" marginTop={px2rn(0)}>
  <TabBar.Item amtype="TabBar.Item" icon={require('../image/deposit.png')} selectedIcon={require('../image/deposit.png')} title="主页" index="1" unselectedTintColor="#949494">
   <ScrollView amtype="ScrollView">
    <View style={{ fontSize : px2rn(28) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) }}>
     <Text style={{ fontSize : px2rn(28) , fontWeight :"800"}}>
      TabBar 标签栏
     </Text>
    </View>
    <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
     <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
      属性:
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      barTintColor=green 底部栏背景色,也支持rgb/十六进制表示
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      tintColor=red 选中字体颜色，也支持rgb/十六进制表示
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      unselectedTintColor=blue 未选中字体颜色，也支持rgb/十六进制表示
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      selectedTab=1 选中的底部标签
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      marginTop=0px 距离顶部位置
     </Text>
    </View>
    <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
    <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
     <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
      TabBar.Item 属性:
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      index="1" 设置标识 
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      title="主页" 标题文字 
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      icon="../image/deposit.png" 默认展示图片
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      selectedIcon="../image/deposit.png" 选中后展示的图片
     </Text>
    </View>
   </ScrollView>
  </TabBar.Item>
  <TabBar.Item amtype="TabBar.Item" dot="true" index="2" title="附近" icon={require('../image/deposit.png')} selectedIcon="https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg">
   <ScrollView amtype="ScrollView">
    <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
     <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
      TabBar.Item 属性:
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      index="2" 设置标识 
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      dot="true" 显示红点 
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      title="附近" 标题文字 
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      icon="../image/deposit.png" 默认展示图片
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      selectedIcon="https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg" 选中后展示的图片
     </Text>
    </View>
   </ScrollView>
  </TabBar.Item>
  <TabBar.Item amtype="TabBar.Item" index="3" title="逛一逛" badge="打折" icon={require('../image/deposit.png')} selectedIcon="https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg">
   <ScrollView amtype="ScrollView">
    <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
     <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
      TabBar.Item 属性:
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      index="3" 设置标识 
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      badge="打折" 显示徽标值
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      title="逛一逛" 标题文字 
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      icon="../image/deposit.png" 默认展示图片
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      selectedIcon="https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg" 选中后展示的图片
     </Text>
    </View>
   </ScrollView>
  </TabBar.Item>
  <TabBar.Item amtype="TabBar.Item" index="4" title="想一想" icon="https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg" selectedIcon="https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg">
   <ScrollView amtype="ScrollView">
    <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
     <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
      TabBar.Item 属性:
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      index="4" 设置标识 
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      title="想一想" 标题文字 
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      icon="https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg" 默认展示图片
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      selectedIcon="https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg" 选中后展示的图片
     </Text>
    </View>
   </ScrollView>
  </TabBar.Item>
 </TabBar>
</View>    
</View>);
  }
}
