import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import Tabs from 'cap4m/lib/Tabs';
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
title:'1st Tab'
},
{
title:'2nd Tab'
},
{
title:'3rd Tab'
}
]
};

function getBadge() {
    console.log(12)
}
function setVisible() {
    $Tabs('test_tabs').setVisible(true);
}
function setBadge() {
    $Tabs('test_tabs').setBadge(2, '1');
}
function setDot() {
    $Tabs('test_tabs').setDot('1', true);
}
function getDot() {
  console.log(12)
}
function goToTab() {
    $Tabs('test_tabs').goToTab('2');
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
    Tabs 标签页
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    内置方法:
   </Text>
  </View>
  <Tabs amtype="Tabs" id="test_tabs" tabs={this.state.data} tabBarPosition="top" animated={true} swipeable={true} height={px2rn(150)} ref="_test_tabs" autoref="test_tabs">
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", height : px2rn(150) , backgroundColor :"gray"}}>
    <View>
     <Text>
      Content of first tab
     </Text>
    </View>
   </View>
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", height : px2rn(150) , backgroundColor :"gray"}}>
    <View>
     <Text>
      Content of second tab
     </Text>
    </View>
   </View>
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", height : px2rn(150) , backgroundColor :"gray"}}>
    <View>
     <Text>
      Content of third tab
     </Text>
    </View>
   </View>
  </Tabs>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setBadge 设置徽标值 
   </Text>
  </View>
  <Button amtype="Button" text="setBadge" click="setBadge()" type="primary" onClick={($event)=>setBadge()}></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     getBadge 返回徽标值 
   </Text>
  </View>
  <Button amtype="Button" text="getBadge" click="getBadge()" type="primary" onClick={($event)=>getBadge()}></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setDot 设置红点 
   </Text>
  </View>
  <Button amtype="Button" text="setDot" click=" setDot()" type="primary" onClick={($event)=> setDot()}></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     getDot 获取红点 
   </Text>
  </View>
  <Button amtype="Button" text="getDot" click="getDot()" type="primary" onClick={($event)=>getDot()}></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     goToTab 定位到指定标签 
   </Text>
  </View>
  <Button amtype="Button" text="goToTab" click=" goToTab()" type="primary" onClick={($event)=> goToTab()}></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setVisible（web only）是否显示 
   </Text>
  </View>
  <Button amtype="Button" text="setVisible" click="setVisible()" type="primary" onClick={($event)=>setVisible()}></Button>
 </ScrollView>
</View>    
</View>);
  }
}
