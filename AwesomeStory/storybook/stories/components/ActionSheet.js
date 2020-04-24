import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import WhiteSpace from 'cap4m/lib/WhiteSpace';
import {$ActionSheet} from '../../src/util/index';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function basic1() {
		    var options = ["action 1", "action 2", "action 3"];
		    $ActionSheet.showActionSheetWithOptions({
		        options: options
		    });
		}
		function basic2() {
		    var options = ["action 1", "action 2", "action 3"];
		    $ActionSheet.showActionSheetWithOptions({
		        options: options,
		        title: 'title',
		        message: "message"
		    });
		}
		function basic3() {
		    var options = ["action 1", "action 2", "action 3"];
		    $ActionSheet.showActionSheetWithOptions({
		        options: options,
		        maskClosable: true
		    });
		}
		function basic4() {
		    var options = ["action 1", "action 2", "action 3"];
		    $ActionSheet.showActionSheetWithOptions({
		        options: options,
		    }, function (value) {
		        console.log(value);
		    });
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
   ActionSheet动作面板
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   options (array of strings) - 按钮标题列表 (required) 
  </Text>
 </View>
 <Button amtype="Button" type="primary" text="打开动作面板" click="basic1()" onClick={($event)=>basic1()}></Button>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   title (string) - 顶部标题 message (string/React.element) - 顶部标题下的简要消息
  </Text>
 </View>
 <Button amtype="Button" type="primary" text="打开动作面板" click="basic2()" onClick={($event)=>basic2()}></Button>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   maskClosable (bool)(web only) - 点击蒙层是否允许关闭，默认允许
  </Text>
 </View>
 <Button amtype="Button" type="primary" text="打开动作面板" click="basic3()" onClick={($event)=>basic3()}></Button>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   callonBack函数支持返回（web only） 
  </Text>
 </View>
 <Button amtype="Button" type="primary" text="打开动作面板" click="basic4()" onClick={($event)=>basic4()}></Button>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
</ScrollView>    
</View>);
  }
}
