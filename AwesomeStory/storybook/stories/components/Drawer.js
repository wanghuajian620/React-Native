import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import Drawer from 'cap4m/lib/Drawer';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function change($event) {
		    console.log("改变了")
		}
		function close1($event) {
		    $Drawer('drawer1').closeDrawer();
		}
		function open1() {
		    $Drawer('drawer1').openDrawer();
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
 <View style={{ fontSize : px2rn(28) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) }}>
  <Text style={{ fontSize : px2rn(28) , fontWeight :"800"}}>
   Drawer 抽屉
  </Text>
 </View>
 <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
  <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   open初始化抽屉是否弹出（true）弹出
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   position测滑页出现的位置（right/left可选，目前是right）
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   drawerWidth测滑页的宽度(150px)
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   drawerBackgroundColor支持（英文，#f00,rgba）目前是（#f00）
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   openChange方法->抽屉改变时的回调
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   openDrawer方法->打开抽屉
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   closeDrawer方法->关闭抽屉
  </Text>
 </View>
 <Drawer amtype="Drawer" id="drawer1" openChange="change($event)" open="true" position="right" drawerWidth={px2rn(300)} drawerBackgroundColor="#F00" onOpenChange={($event)=>change($event)} autoref="drawer1" ref="_drawer1">
  <Drawer.SlideBar amtype="Drawer.SlideBar">
   <View>
    <View>
     <Text>
      Menu
     </Text>
    </View>
    <Button amtype="Button" click="close1($event)" text="closeDrawer方法" onClick={($event)=>close1($event)}></Button>
   </View>
  </Drawer.SlideBar>
  <Drawer.Content amtype="Drawer.Content">
   <View style={{ marginTop : px2rn(400) }}>
    <Button amtype="Button" click="open1($event)" text="openDrawer方法" onClick={($event)=>open1($event)}></Button>
   </View>
  </Drawer.Content>
 </Drawer>
</ScrollView>    
</View>);
  }
}
