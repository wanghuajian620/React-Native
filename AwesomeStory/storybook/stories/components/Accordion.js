import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Accordion from 'cap4m/lib/Accordion';
import ScrollView from 'cap4m/lib/ScrollView';
import List from 'cap4m/lib/List';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function change($event) {
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
   Accordion 手风琴
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   defaultActiveKey属性->默认展开的索引（1）
  </Text>
 </View>
 <View>
  <Text>
   change属性->点击是否展开
  </Text>
 </View>
 <Accordion amtype="Accordion" defaultActiveKey="1" change="change($event)" onChange={($event)=>change($event)}>
  <Accordion.Panel amtype="Accordion.Panel" header="China" key="0">
   <List amtype="List">
    <List.Item amtype="List.Item" arrow="horizontal">
     <Text>
       上海 
     </Text>
    </List.Item>
   </List>
  </Accordion.Panel>
  <Accordion.Panel amtype="Accordion.Panel" header="America" key="1">
   <List amtype="List">
    <List.Item amtype="List.Item" arrow="horizontal">
     <Text>
       圣地亚哥 
     </Text>
    </List.Item>
   </List>
  </Accordion.Panel>
 </Accordion>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   activeKey属性->当前激活的索引（0）
  </Text>
 </View>
 <View>
  <Text>
   expandMultiple属性->是否可多项展开（false）
  </Text>
 </View>
 <Accordion amtype="Accordion" activeKey="0" expandMultiple="false" change="change($event)" onChange={($event)=>change($event)}>
  <Accordion.Panel amtype="Accordion.Panel" header="China" key="0">
   <List amtype="List">
    <List.Item amtype="List.Item" arrow="horizontal">
     <Text>
       上海 
     </Text>
    </List.Item>
   </List>
  </Accordion.Panel>
  <Accordion.Panel amtype="Accordion.Panel" header="America" key="1">
   <List amtype="List">
    <List.Item amtype="List.Item" arrow="horizontal">
     <Text>
       圣地亚哥 
     </Text>
    </List.Item>
   </List>
  </Accordion.Panel>
 </Accordion>
</ScrollView>    
</View>);
  }
}
