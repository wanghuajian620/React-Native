import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
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
    	//onOpenChange	open 状态切换时调用	(open: bool): void
   	     
			function closeDrawer() {
			    $Drawer('_drawer').closeDrawer();
			}
			function openDrawer() {
			    $Drawer('_drawer').openDrawer();
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
 <View style={{ fontSize : px2rn(28) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) }}>
  <Text style={{ fontSize : px2rn(28) , fontWeight :"800"}}>
   Drawer 抽屉
  </Text>
 </View>
 <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
  <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
   方法:
  </Text>
 </View>
 <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
  <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
   openDrawer 打开测滑页、closeDrawer 关闭测滑页
  </Text>
 </View>
 <Drawer amtype="Drawer" id="_drawer" openChange="openChange($event)" open="false" position="left" drawerWidth={300} onOpenChange={($event)=>openChange($event)} autoref="_drawer" ref="__drawer">
  <Drawer.SlideBar amtype="Drawer.SlideBar">
   <View style={{ backgroundColor :"rgb(204, 204, 204)", height :"100%"}}>
    <Button amtype="Button" click="close($event)" text="点击关闭" onClick={($event)=>close($event)}></Button>
    <View>
     <Text>
      Menu
     </Text>
    </View>
   </View>
  </Drawer.SlideBar>
  <Drawer.Content amtype="Drawer.Content">
   <View>
    <Button amtype="Button" click="open($event)" text="点击打开" onClick={($event)=>open($event)}></Button>
    <View>
     <Text>
      onClick left drawer
     </Text>
    </View>
   </View>
  </Drawer.Content>
 </Drawer>
</View>    
</View>);
  }
}
