import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function setHeight(){
			$ScrollView("id").setHeight(100);
		}
		
		function setWidth(){
			$ScrollView("id").setWidth(100);
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
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
 <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
  ScrollView滚动条 
 </Text>
</View>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
 <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  内置方法:
 </Text>
</View>
<ScrollView amtype="ScrollView" horizontal="false" id="id" ref="_id" autoref="id">
 <View style={{ backgroundColor :"red", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"orange", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"blue", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"green", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
 <View style={{ backgroundColor :"blue", height : px2rn(90) }}>
  <Text>
    123 
  </Text>
 </View>
</ScrollView>
<Button amtype="Button" type="primary" text="setHeight方法" click="setHeight()" onClick={($event)=>setHeight()}></Button>
<Button amtype="Button" type="primary" text="setWidth方法" click="setWidth()" onClick={($event)=>setWidth()}></Button>    
</View>);
  }
}
