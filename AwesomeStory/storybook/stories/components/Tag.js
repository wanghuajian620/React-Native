import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Tag from 'cap4m/lib/Tag';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
     
    //onChange	切换选中回调函数	(selected: bool): void
    function change($event){
    	 console.log(12)
    }
    //onClose	点关闭时的回调函数	(): void
    function close($event){
    	 console.log(12)
    }
    //afterClose	关闭后的回调	(): void
    function afterClose($event){
    	
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
<View style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
 <Text style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
  Tag 标签
 </Text>
</View>
<View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
 <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
  <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   属性：
  </Text>
 </View>
</View>
<Tag amtype="Tag" small="true" change="change($event)" text="Basic" onChange={($event)=>change($event)}></Tag>
<WhiteSpace amtype="WhiteSpace"></WhiteSpace>
<Tag amtype="Tag" disabled="true" text="Basic"></Tag>
<WhiteSpace amtype="WhiteSpace"></WhiteSpace>
<Tag amtype="Tag" closable="true" close="close($event)" afterClose={($event)=>afterClose($event)} text="Basic" onClose={($event)=>close($event)}></Tag>
<WhiteSpace amtype="WhiteSpace"></WhiteSpace>
<Tag amtype="Tag" selected="true" text="Basic"></Tag>
<WhiteSpace amtype="WhiteSpace"></WhiteSpace>
<Tag amtype="Tag" text="Disabled"></Tag>
<WhiteSpace amtype="WhiteSpace"></WhiteSpace>
<Tag amtype="Tag" text="Selected"></Tag>    
</View>);
  }
}
