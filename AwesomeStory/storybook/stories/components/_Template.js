import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Button from 'cap4m/lib/Button';
import WingBlank from 'cap4m/lib/WingBlank';
import Template from 'cap4m/lib/Template';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {}; 
    var data = {title: '这是标题title',text: '这是text'};
   
    
    function click() {
        var newdata = {title: '中国',text: '我的祖国'};;
    	$Template('template').setData(newdata);
    }
    	
   function append() {
        var adddata = {title: '上海',text: '东方明珠'};;
    	$Template('template').append(adddata);
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
  Template 模板组件
 </Text>
</View>
<View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
 <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
  <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   内置方法：
  </Text>
 </View>
</View>
<Template amtype="Template" id="template" style={{ display :"flex", height : px2rn(300) , width : px2rn(300) , backgroundColor :"yellow"}} data={data} autoref="template" ref="_template" template={(info)=><React.Fragment>
 <View> 
  <View> 
   <Text>
     {info&&info.title} 
   </Text> 
  </View> 
  <View> 
   <Text>
     {info&&info.text} 
   </Text> 
  </View> 
 </View>
</React.Fragment>}></Template>
<WingBlank amtype="WingBlank" size="lg">
 <Button amtype="Button" click="click()" text="setData" type="primary" onClick={($event)=>click()}></Button>
 <Button amtype="Button" click="append()" text="append" type="primary" onClick={($event)=>append()}></Button>
</WingBlank>    
</View>);
  }
}
