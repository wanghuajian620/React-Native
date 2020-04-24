import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import Picker from 'cap4m/lib/Picker';
import WingBlank from 'cap4m/lib/WingBlank';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {district:[
{
'value':'1',
'label':'安徽省',
'children':[
]
},
{
'value':'2',
'label':'河北省',
'children':[
]
},
{
'value':'3',
'label':'山东省',
'children':[
]
}
]
};
		function getValue() {
		    console.log(12)
		}
		function getCols() {
		    console.log(12)
		}
		function setValue() {
		    $Picker('Picker1').setValue('3');
		}
		function setCols() {
		    $Picker('Picker1').setCols('3');
		}
		function setData() {
		    $Picker('Picker2').setData([{ 'value': '4', 'label': '新疆省' }, { 'value': '5', 'label': '云南省' }, { 'value': '6', 'label': '贵州省' }]);
		}
		function addOption() {
		    $Picker('Picker2').addOption({ 'value': '8', 'label': '江苏省' });
		}
		function setDisabled() {
		    $Picker('Picker2').setDisabled("true");
		}
		function getDisabled() {
		    console.log(12)
		}
		function open() {
		    $Picker('open').open()
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
   Picker 选择器
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   内置方法:
  </Text>
 </View>
 <Picker amtype="Picker" id="Picker1" data={this.state.district} cols={1} text="一级联动" okText="确定" dismissText="取消" title="Areas" extra="请选择" ref="_Picker1" autoref="Picker1"></Picker>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
     setValue 设置选中值
   </Text>
  </View>
  <Button amtype="Button" click="setValue()" text="setValue" type="primary" onClick={($event)=>setValue()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
     setCols 设置列数
   </Text>
  </View>
  <Button amtype="Button" click="setCols()" text="setCols" type="primary" onClick={($event)=>setCols()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
     getValue 获取选中值
   </Text>
  </View>
  <Button amtype="Button" click="getValue()" text="getValue" type="primary" onClick={($event)=>getValue()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
     getCols 获取列数
   </Text>
  </View>
  <Button amtype="Button" click="getCols()" text="getCols" type="primary" onClick={($event)=>getCols()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Picker amtype="Picker" id="Picker2" data={this.state.district} value="2" cols={1} text="一级联动" dismissText="取消" title="Areas" extra="请选择(可选)" ref="_Picker2" autoref="Picker2"></Picker>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
     setData 重置数据 
   </Text>
  </View>
  <Button amtype="Button" click="setData()" text="setData" type="primary" onClick={($event)=>setData()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
     addOption 单列添加元素，只在cols=1有效 
   </Text>
  </View>
  <Button amtype="Button" click="addOption()" text="addOption" type="primary" onClick={($event)=>addOption()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
     setDisabled 设置禁用 
   </Text>
  </View>
  <Button amtype="Button" click="setDisabled()" text="setDisabled" type="primary" onClick={($event)=>setDisabled()}></Button>
 </WingBlank>
 <WingBlank amtype="WingBlank" size="lg">
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
     getDisabled 返回禁用状态 
   </Text>
  </View>
  <Button amtype="Button" click="getDisabled()" text="getDisabled" type="primary" onClick={($event)=>getDisabled()}></Button>
 </WingBlank>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    open 当mode="open"时，调用该方法显示组件
  </Text>
 </View>
 <Picker amtype="Picker" id="open" mode="open" data={this.state.district} cols={1} text="一级联动" okText="确定" dismissText="取消" title="Areas" extra="请选择" ref="_open" autoref="open"></Picker>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="open()" text="open" type="primary" onClick={($event)=>open()}></Button>
 </WingBlank>
</ScrollView>    
</View>);
  }
}
