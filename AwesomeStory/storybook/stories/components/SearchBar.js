import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import SearchBar from 'cap4m/lib/SearchBar';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function submit($event) {
			 console.log(12)
		}
		//onChange	change 事件的回调
		function change($event) {
			 console.log(12)
		}
		//onFocus	focus 事件的回调
		var num1=0;
		function focus($event) {
			if(num1===0){
					alert('focus:' + JSON.stringify($event));
					num1++
			}
		
		}
		//onBlur	blur 事件的回调
		var num=0;
		function blur($event) {
			if(num===0){
				console.log('blur:' + JSON.stringify($event));
				num++
			}
		
		}
		//onCancel	点击取消按钮触发 (不再自动清除输入框的文字)
		function cancel($event) {
			 console.log(12)
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
   SearchBar 搜索栏 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   submit、change、blur、cancel、focus 事件回调
  </Text>
 </View>
 <SearchBar amtype="SearchBar" placeholder="onSubmit" submit="submit($event)" onSubmit={($event)=>submit($event)}></SearchBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <SearchBar amtype="SearchBar" placeholder="onChange" change="change($event)" onChange={($event)=>change($event)}></SearchBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <SearchBar amtype="SearchBar" placeholder="onBlur" blur="blur($event)" onBlur={($event)=>blur($event)}></SearchBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <SearchBar amtype="SearchBar" placeholder="onCancel" cancel="cancel($event)" onCancel={($event)=>cancel($event)}></SearchBar>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <SearchBar amtype="SearchBar" placeholder="onFocus" focus="focus($event)" onFocus={($event)=>focus($event)}></SearchBar>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   placeholder="value" 默认提示值
  </Text>
 </View>
 <SearchBar amtype="SearchBar" placeholder="value"></SearchBar>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   value="value" 搜索值
  </Text>
 </View>
 <SearchBar amtype="SearchBar" value="value"></SearchBar>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   disabled="true" 是否可用
  </Text>
 </View>
 <SearchBar amtype="SearchBar" disabled="true"></SearchBar>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    fontColor="green" 文字颜色
  </Text>
 </View>
 <SearchBar amtype="SearchBar" fontColor="green"></SearchBar>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    fontWeight="800" 文字粗细
  </Text>
 </View>
 <SearchBar amtype="SearchBar" fontWeight="800"></SearchBar>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    fontSize="80" 文字大小
  </Text>
 </View>
 <SearchBar amtype="SearchBar" fontSize={px2rn(80)}></SearchBar>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    style="background-color:grey; width:80%;border-radius:20px;padding-left:10%" 搜索栏样式(web端）
  </Text>
 </View>
 <SearchBar amtype="SearchBar" style={{ backgroundColor :"rgb(221, 221, 221)", width :"80%", borderRadius : px2rn(20) , paddingLeft :"10%"}}></SearchBar>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    inputStyle="background-color:grey; width:80%;border-radius:20;padding-left:10%" 搜索栏样式（RN端）
  </Text>
 </View>
 <SearchBar amtype="SearchBar" inputStyle={{ backgroundColor :"rgb(221, 221, 221)", width :"80%", borderRadius : px2rn(20) , paddingLeft :"10%"}}></SearchBar>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   showCancelButton="true" 是否一直显示取消按钮
  </Text>
 </View>
 <SearchBar amtype="SearchBar" showCancelButton="true"></SearchBar>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    cancelText="exit" 自定义取消按钮文字
  </Text>
 </View>
 <SearchBar amtype="SearchBar" cancelText="exit"></SearchBar>
</ScrollView>    
</View>);
  }
}
