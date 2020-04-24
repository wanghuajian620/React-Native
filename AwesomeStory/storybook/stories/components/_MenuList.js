import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import MenuList from 'cap4m/lib/MenuList';
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
var amVAR = {menuData:[
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
label:'Market'
}
]
};
	//(): void $event: {componentName: 'MenuList', item: Array}
	function change($event) {
    console.log('change:  ' + JSON.stringify($event));
}
//(value: Array): voautoref $event: {componentName: 'MenuList', value: Array}
function ok($event) {
    console.log('ok:  ' + JSON.stringify($event));
}
//(): voautoref $event: {componentName: 'MenuList' }
function cancel($event) {
    console.log('cancel:  ' + JSON.stringify($event));
}
function show() {
    $MenuList('menu').show();
}
function hide() {
    //hide	关闭MenuList	(): voautoref
    $MenuList('menu').hide();
}
function getValue() {
    console.log(12)
}
function setData() {
    //setData	设置菜单选项值	Array<{label: ReactNode, value, disabled?, children?, isLeaf?}>
    $MenuList('menu').setData([{ value: '1', label: 'Fruit' },{value: '2', label: 'Good' },{value: '3', label: 'Fish' }]);
}
function addOption() {
    //setData	设置菜单选项值	Array<{label: ReactNode, value, disabled?, children?, isLeaf?}>
    $MenuList('menu').addOption({ value: '8', label: 'Hero' });
}
function setValue() {
    //setValue	设置选中的值	(): voautoref （参数）一级和二级筛选数据的value组成的数组。
    //在多选状态下，如果为二级菜单，则数组的第一个元素为一级菜单的选项，数组的第二个元素是一个数组，里面包含了二级菜单的多选项；
    //如果为一级菜单，则数组所有元素都是多选项
    $MenuList('menu').setValue('1');
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
    内置方法:
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    show 打开菜单列表、hide 隐藏菜单列表
   </Text>
  </View>
  <Button amtype="Button" click="show()" id="show" text="show" onClick={($event)=>show()} ref="_show" autoref="show"></Button>
  <Button amtype="Button" click="hide()" id="hide" text="hide" onClick={($event)=>hide()} ref="_hide" autoref="hide"></Button>
  <MenuList amtype="MenuList" id="menu" data={this.state.menuData} level={1} change="change($event)" ok="ok($event)" cancel="cancel($event)" height={200} multiSelect="true" onChange={($event)=>change($event)} onOk={($event)=>ok($event)} onCancel={($event)=>cancel($event)} autoref="menu" ref="menu"></MenuList>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    setValue 设置选中的项 
   </Text>
  </View>
  <Button amtype="Button" click="setValue()" id="show" text="setValue" onClick={($event)=>setValue()} ref="_show" autoref="show"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    getValue 返回选中的项 
   </Text>
  </View>
  <Button amtype="Button" click="getValue()" id="show" text="getValue" onClick={($event)=>getValue()} ref="_show" autoref="show"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    setData 设置菜单选项
   </Text>
  </View>
  <Button amtype="Button" click="setData()" id="show" text="setData" onClick={($event)=>setData()} ref="_show" autoref="show"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    addOption 增加菜单选项
   </Text>
  </View>
  <Button amtype="Button" click="addOption()" id="show" text="addOption" onClick={($event)=>addOption()} ref="_show" autoref="show"></Button>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 </ScrollView>
</View>    
</View>);
  }
}
