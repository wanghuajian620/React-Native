import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import CheckBox from 'cap4m/lib/CheckBox';

//import scope from '../../src/until/this';
import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
//import { WebSDK } from  '../../src/sdk/index';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {gender:[
{
value:"0",
label:"male"
},
{
value:"1",
label:"female"
}
],
data:[
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
    console.log(12)
}
let _amVAR = _.cloneDeep(amVAR)
export default class App extends Component {
constructor(props) {
super(props);
// scope(this);
// var omap = {};omap[this.props.navigation.state.routeName] = this;
// $.instanceList.push(omap);
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
    属性:
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    type=block 复选框类型
   </Text>
  </View>
  <CheckBox amtype="CheckBox" data={this.state.data} change="change($event)" type="block" onChange={($event)=>change($event)}></CheckBox>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    type=inline
   </Text>
  </View>
  <CheckBox amtype="CheckBox" data={this.state.data} change="change($event)" type="inline" onChange={($event)=>change($event)}></CheckBox>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    value=1,2 默认选中的值
   </Text>
  </View>
  <CheckBox amtype="CheckBox" data={this.state.data} value="1,2" change="change($event)" onChange={($event)=>change($event)}></CheckBox>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    fontSize={30}、fontColor=skyblue 文字大小和颜色
   </Text>
  </View>
  <CheckBox amtype="CheckBox" data={this.state.data} change="change($event)" fontSize={px2rn(30)} fontColor="skyblue" onChange={($event)=>change($event)}></CheckBox>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    fontSize={10}、fontColor=#FF0000
   </Text>
  </View>
  <CheckBox amtype="CheckBox" data={this.state.data} change="change($event)" fontSize={px2rn(10)} fontColor="#FF0000" onChange={($event)=>change($event)}></CheckBox>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    fontSize={40}、fontColor=rgb(0,0,255)
   </Text>
  </View>
  <CheckBox amtype="CheckBox" data={this.state.data} change="change($event)" fontSize={px2rn(40)} fontColor="rgb(0,0,255)" onChange={($event)=>change($event)}></CheckBox>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    spacing={50} 复选框按钮图标与右侧文字距离
   </Text>
  </View>
  <CheckBox amtype="CheckBox" data={this.state.data} change="change($event)" spacing={px2rn(50)} onChange={($event)=>change($event)}></CheckBox>
  <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
   <Text style={{ fontSize : px2rn(16) }}>
    title属性->title(gender)
   </Text>
  </View>
  <View>
   <Text>
    titleStyles属性->title的样式
   </Text>
  </View>
  <CheckBox amtype="CheckBox" type="inline" data={this.state.gender} title="gender" titleStyles={{ color :"red", paddingLeft : px2rn(10) }} spacing={px2rn(50)}></CheckBox>
 </ScrollView>
</View>    
</View>);
  }
}
