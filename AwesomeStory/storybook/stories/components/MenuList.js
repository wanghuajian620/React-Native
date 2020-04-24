import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import MenuList from 'cap4m/lib/MenuList';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {menuData2:[
{
value:'1',
label:'Food',
children:[
{
label:'foreign Food',
value:'2',
disabled:false
},
{
label:'Chinese Food',
value:'3'
}
]
},
{
value:'4',
label:'Supermarket',
children:[
{
label:'small Supermarkets',
value:'5'
},
{
label:'big Supermarkets',
value:'6'
}
]
}
],
menuData1:[
{
value:'1',
label:'Food'
},
{
value:'5',
label:'Supermarket'
},
{
value:'7',
label:'market'
}
]
};
    
 function change($event) {
     console.log(12)
}
//(value: Array): voautoref $event: {componentName: 'MenuList', value: Array}
function ok($event) {
     console.log(12)
}
//(): voautoref $event: {componentName: 'MenuList' }
function cancel($event) {
   console.log(12)
}

function show1() {
    $MenuList('_menu1').show();
}
function hide1() {
    $MenuList('_menu1').hide();
}
function show2() {
    $MenuList('_menu2').show();
}
function hide2() {
    $MenuList('_menu2').hide();
}
function show3() {
    $MenuList('_menu3').show();
}
function hide3() {
    $MenuList('_menu3').hide();
}
function show4() {
    $MenuList('_menu4').show();
}
function hide4 (){
    $MenuList('_menu4').hide();
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
    MenuList 菜单
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    属性:
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    level=1 菜单级数，可选1/2
   </Text>
  </View>
  <Button amtype="Button" type="primary" click="show1()" text="show" onClick={($event)=>show1()}></Button>
  <Button amtype="Button" type="primary" click="hide1()" text="hide" onClick={($event)=>hide1()}></Button>
  <MenuList amtype="MenuList" id="_menu1" data={this.state.menuData1} level={1} change="change($event)" height={200} multiSelect="false" onChange={($event)=>change($event)} autoref="_menu1" ref="_menu1"></MenuList>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    level=2
   </Text>
  </View>
  <Button amtype="Button" type="primary" click="show2()" text="show" onClick={($event)=>show2()}></Button>
  <Button amtype="Button" type="primary" click="hide2()" text="hide" onClick={($event)=>hide2()}></Button>
  <MenuList amtype="MenuList" id="_menu2" data={this.state.menuData2} level={2} change="change($event)" height={200} multiSelect="false" onChange={($event)=>change($event)} autoref="_menu2" ref="_menu2"></MenuList>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    height=400px 菜单高度
   </Text>
  </View>
  <Button amtype="Button" type="primary" click="show3()" text="show" onClick={($event)=>show3()}></Button>
  <Button amtype="Button" type="primary" click="hide3()" text="hide" onClick={($event)=>hide3()}></Button>
  <MenuList amtype="MenuList" id="_menu3" data={this.state.menuData1} level={1} change="change($event)" height={400} multiSelect="false" onChange={($event)=>change($event)} autoref="_menu3" ref="_menu3"></MenuList>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    multiSelect=true 菜单是否可多选
   </Text>
  </View>
  <Button amtype="Button" type="primary" click="show4()" text="show" onClick={($event)=>show4()}></Button>
  <Button amtype="Button" type="primary" click="hide4()" text="hide" onClick={($event)=>hide4()}></Button>
  <MenuList amtype="MenuList" id="_menu4" data={this.state.menuData1} level={1} change="change($event)" ok="ok($event)" cancel="cancel($event)" height={200} multiSelect="true" onChange={($event)=>change($event)} onOk={($event)=>ok($event)} onCancel={($event)=>cancel($event)} autoref="_menu4" ref="_menu4"></MenuList>
 </ScrollView>
</View>    
</View>);
  }
}
