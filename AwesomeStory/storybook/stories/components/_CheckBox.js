import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import CheckBox from 'cap4m/lib/CheckBox';
import WingBlank from 'cap4m/lib/WingBlank';
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
value:'0',
label:'Ph.D.'
},
{
value:'1',
label:'Bachelor'
},
{
value:'2',
label:'College diploma',
detail:'detail'
}
]
};
function change($event) {
    console.log("change：" + JSON.stringify($event));
}
function addOption() {
    //添加选选框
    $CheckBox('checkBox').addOption({ value: '5', label: 'javascript' });
}
function setData() {
    //添加选选框
    $CheckBox('checkBox').setData([{ value: '3', label: 'hello world' }]);
}
function getValue() {
    //添加选选框
    alert($CheckBox('checkBox').getValue());
}
function setValue() {
    //添加选选框
    $CheckBox('checkBox').setValue('0,1');
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
    CheckBox 复选框
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    内置方法:
   </Text>
  </View>
  <CheckBox amtype="CheckBox" id="checkBox" data={this.state.data} change="change($event)" onChange={($event)=>change($event)} ref="_checkBox" autoref="checkBox"></CheckBox>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    setValue 设置选中项
   </Text>
  </View>
  <WingBlank amtype="WingBlank" size="lg">
   <Button amtype="Button" click="setValue()" text="setValue" type="primary" onClick={($event)=>setValue()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    getValue 获取选中项
   </Text>
  </View>
  <WingBlank amtype="WingBlank" size="lg">
   <Button amtype="Button" click="getValue()" text="getValue" type="primary" onClick={($event)=>getValue()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    setData 重置数据
   </Text>
  </View>
  <WingBlank amtype="WingBlank" size="lg">
   <Button amtype="Button" click="setData()" text="setData" type="primary" onClick={($event)=>setData()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    addOption 添加选项框
   </Text>
  </View>
  <WingBlank amtype="WingBlank" size="lg">
   <Button amtype="Button" click="addOption()" text="addOption" type="primary" onClick={($event)=>addOption()}></Button>
  </WingBlank>
 </ScrollView>
</View>    
</View>);
  }
}
