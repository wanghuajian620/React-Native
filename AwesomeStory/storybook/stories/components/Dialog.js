import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import Dialog from 'cap4m/lib/Dialog';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function open() {
		    $Dialog("Dialog").open();
		}
		function close() {
		    $Dialog("Dialog").close();
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
   Dialog 弹出窗口
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   内置方法:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    open方法->打开弹出窗 
  </Text>
 </View>
 <View>
  <Text>
    close方法->关闭弹出窗 
  </Text>
 </View>
 <Dialog amtype="Dialog" id="Dialog" autoref="Dialog" ref="_Dialog">
  <View style={{ backgroundColor :"blue", width : px2rn(300) , height : px2rn(200) , marginTop : px2rn(30) }}>
   <Text>
     popContent 
   </Text>
   <View style={{ marginTop : px2rn(130) }}>
    <Button amtype="Button" type="primary" text="关闭弹出窗" click="close()" onClick={($event)=>close()}></Button>
   </View>
  </View>
 </Dialog>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(260) }}>
  <View>
   <Button amtype="Button" type="primary" text="打开弹出窗" click="open()" onClick={($event)=>open()}></Button>
  </View>
 </View>
</ScrollView>    
</View>);
  }
}
