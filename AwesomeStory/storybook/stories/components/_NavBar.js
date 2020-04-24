import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import NavBar from 'cap4m/lib/NavBar';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = { 
                     popData: [
                         { disabled: false, icon: '../image/cap4m_hf.png', value: 'Scan' },
                         { disabled: true, icon: '../image/cap4m_jjk.png', value: 'My Qrcode' },
                         { disabled: false, icon: '../image/cap4m_qd.png', value: 'Help' }
                     ],
                  
                    
                 };
    //onBack	导航左边点击回调	(): void
function setTitle($event) {
    $NavBar('_title').setTitle('hello world')
}
function setVisible($event) {
    $NavBar('_NavBar').setVisible(true)
}
function onBack($event) {
    console.log("onBack:" + JSON.stringify($event));
}
//onRight	导航右边点击回调	(): voautoref
function right($event) {
    console.log("right:" + JSON.stringify($event));
}
function select($event) {
    console.log("select:" + JSON.stringify($event));
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
    NavBar 导航栏
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    内置方法:
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    setTitle 设置导航栏标题
   </Text>
  </View>
  <NavBar amtype="NavBar" mode="dark" id="_title" data={this.state.popData} rightIcon="ellipsis" back="onBack($event)" select={($event)=>select($event)} right="right($event)" onBack={($event)=>onBack($event)} onRight={($event)=>right($event)} ref="__title" autoref="_title"></NavBar>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Button amtype="Button" type="primary" text="setTitle" click="setTitle()" onClick={($event)=>setTitle()}></Button>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    setVisible (web only) 设置导航栏是否显示
   </Text>
  </View>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <NavBar amtype="NavBar" mode="dark" rightIcon="ellipsis" data={this.state.popData} back="onBack($event)" select={($event)=>select($event)} right="right($event)" id="_NavBar" show="false" onBack={($event)=>onBack($event)} onRight={($event)=>right($event)} ref="__NavBar" autoref="_NavBar"></NavBar>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Button amtype="Button" type="primary" text="setVisible" click=" setVisible()" onClick={($event)=> setVisible()}></Button>
 </ScrollView>
</View>    
</View>);
  }
}
