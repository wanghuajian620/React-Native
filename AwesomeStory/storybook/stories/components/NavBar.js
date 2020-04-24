import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import NavBar from 'cap4m/lib/NavBar';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {popData:[
{
disabled:false,
icon:require('../image/deposit.png'),
value:"scan"
},
{
disabled:false,
icon:require('../image/deposit.png'),
value:"oracle"
},
{
disabled:true,
icon:require('../image/deposit.png'),
value:"hello wolrd"
}
]
}; 
			
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
    属性:
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    mode=dark 按钮模式，可选dark/light
   </Text>
  </View>
  <NavBar amtype="NavBar" mode="dark" back="onBack($event)" onBack={($event)=>onBack($event)}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    mode=light
   </Text>
  </View>
  <NavBar amtype="NavBar" mode="light" back="onBack($event)" onBack={($event)=>onBack($event)}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    rightTitle=气泡 右边文字
   </Text>
  </View>
  <NavBar amtype="NavBar" data={this.state.popData} mode="dark" back="onBack($event)" select={($event)=>select($event)} right="right($event)" rightTitle="气泡" onBack={($event)=>onBack($event)} onRight={($event)=>right($event)}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    rightIcon=ellipsis 右边图标
   </Text>
  </View>
  <NavBar amtype="NavBar" rightIcon="ellipsis" mode="dark" data={this.state.popData} back="onBack($event)" select={($event)=>select($event)} right="right($event)" onBack={($event)=>onBack($event)} onRight={($event)=>right($event)}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    popoverPosition=right 气泡展示位置
   </Text>
  </View>
  <NavBar amtype="NavBar" data={this.state.popData} rightIcon="ellipsis" mode="dark" back="onBack($event)" select={($event)=>select($event)} right="right($event)" popoverPosition="right" onBack={($event)=>onBack($event)} onRight={($event)=>right($event)}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    popoverPosition=left 气泡展示位置
   </Text>
  </View>
  <NavBar amtype="NavBar" data={this.state.popData} rightIcon="ellipsis" mode="dark" back="onBack($event)" select={($event)=>select($event)} right="right($event)" popoverPosition="left" onBack={($event)=>onBack($event)} onRight={($event)=>right($event)}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    title=NavBar 导航文字 
   </Text>
  </View>
  <NavBar amtype="NavBar" title="NavBar" mode="dark" back="onBack($event)" onBack={($event)=>onBack($event)}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    leftIcon=left 左边图标
   </Text>
  </View>
  <NavBar amtype="NavBar" leftIcon="left" mode="dark" back=" onBack($event)" onBack={($event)=> onBack($event)}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    titleStyle=(color:red;font-size:30px) 导航文字样式
   </Text>
  </View>
  <NavBar amtype="NavBar" title="NavBar" mode="dark" titleStyle={{ color :"red", fontSize :30}}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    titleStyle=(color:#00FF00;font-size:30px) 导航文字样式
   </Text>
  </View>
  <NavBar amtype="NavBar" title="NavBar" mode="dark" titleStyle={{ color :"rgb(0, 255, 0)", fontSize :30}}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    titleStyle=(color:rgb(0,0,255);font-size:30px) 导航文字样式
   </Text>
  </View>
  <NavBar amtype="NavBar" title="NavBar" mode="dark" titleStyle={{ color :"rgb(0, 0, 255)", fontSize :30}}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    navBarStyle=(backgroundColor:red) 导航栏样式
   </Text>
  </View>
  <NavBar amtype="NavBar" navBarStyle={{ backgroundColor :"red"}} mode="dark"></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    navBarStyle=(backgroundColor:rgb(0,0,255)) 导航栏样式
   </Text>
  </View>
  <NavBar amtype="NavBar" navBarStyle={{ backgroundColor :"rgb(0, 0, 255)"}} mode="dark"></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    navBarStyle=(backgroundColor:#00FF00) 导航栏样式
   </Text>
  </View>
  <NavBar amtype="NavBar" navBarStyle={{ backgroundColor :"rgb(0, 255, 0)"}} mode="dark"></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    showGoBack=false 是否展示回退图标
   </Text>
  </View>
  <NavBar amtype="NavBar" mode="dark" back="onBack($event)" showGoBack="false" onBack={($event)=>onBack($event)}></NavBar>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    showCancel=true 是否展示’取消‘文字,需要设置showGoBack=false
   </Text>
  </View>
  <NavBar amtype="NavBar" mode="dark" back="onBack($event)" select={($event)=>select($event)} right="right($event)" showCancel="true" showGoBack="false" onBack={($event)=>onBack($event)} onRight={($event)=>right($event)}></NavBar>
 </ScrollView>
</View>    
</View>);
  }
}
