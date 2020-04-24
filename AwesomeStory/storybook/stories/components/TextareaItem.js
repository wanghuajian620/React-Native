import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import TextareaItem from 'cap4m/lib/TextareaItem';
import ScrollView from 'cap4m/lib/ScrollView';

//import scope from '../../src/until/this';
import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
//import { WebSDK } from  '../../src/sdk/index';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function change($event) {
		     console.log(12)
		}
		//blur 事件触发的回调函数
		function blur($event) {
		     console.log(12)
		}
		//focus 事件触发的回调函数
		var i=0;
		function focus($event) { 
		    if(i===0){
		         console.log(12)
		        i++;
		    }  
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
<ScrollView amtype="ScrollView">
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   TextareaItem多行输入框
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性：
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   rows属性->控制显示的行数（1）
  </Text>
 </View>
 <View>
  <Text>
   count属性->控制显示的字数（10）
  </Text>
 </View>
 <View>
  <Text>
   change属性->改变时触发事件
  </Text>
 </View>
 <TextareaItem amtype="TextareaItem" rows={1} count={10} placeholder="onChange" change="change($event)" onChange={($event)=>change($event)}></TextareaItem>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   blur属性->失去焦点时触发事件
  </Text>
 </View>
 <TextareaItem amtype="TextareaItem" rows={2} count={50} placeholder="onBlur" blur="blur($event)" onBlur={($event)=>blur($event)}></TextareaItem>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   focus属性->聚焦时触发事件
  </Text>
 </View>
 <TextareaItem amtype="TextareaItem" rows={3} count={50} placeholder="onFocus" focus="focus($event)" onFocus={($event)=>focus($event)}></TextareaItem>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   value属性->value值
  </Text>
 </View>
 <TextareaItem amtype="TextareaItem" rows={1} count={50} value="hello world"></TextareaItem>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   autoHeight属性->高度自适应
  </Text>
 </View>
 <View>
  <Text>
   fontSize属性->设置placeholder字体大小（20px）
  </Text>
 </View>
 <TextareaItem amtype="TextareaItem" autoHeight="true" count={50} placeholder="高度自适应" fontSize="20px"></TextareaItem>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   editable属性->可编辑（false）
  </Text>
 </View>
 <TextareaItem amtype="TextareaItem" editable="false" placeholder="editable"></TextareaItem>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   disabled属性->不可编辑（true）
  </Text>
 </View>
 <TextareaItem amtype="TextareaItem" disabled="true" placeholder="disabled"></TextareaItem>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   textareaStyles属性->title的样式
  </Text>
 </View>
 <TextareaItem amtype="TextareaItem" title="新增" textareaStyles={{ borderWidth : px2rn(1) , borderStyle :"solid", marginTop : px2rn(10) }}></TextareaItem>
</ScrollView>    
</View>);
  }
}
