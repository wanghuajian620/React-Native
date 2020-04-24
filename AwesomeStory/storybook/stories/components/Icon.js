import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Icon from 'cap4m/lib/Icon';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
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
   Icon图标 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性：
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   type属性->内置icon名称(qq) 
  </Text>
 </View>
 <Icon amtype="Icon" type="qq"></Icon>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View>
  <Text>
   size属性->图标大小 (lg)
  </Text>
 </View>
 <Icon amtype="Icon" type="qq" size="lg"></Icon>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View>
  <Text>
   color属性->图标颜色（red）
  </Text>
 </View>
 <Icon amtype="Icon" type="qq" color="red"></Icon>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View>
  <Text>
   color属性->图标颜色（#f00）
  </Text>
 </View>
 <Icon amtype="Icon" type="qq" color="#f00"></Icon>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View>
  <Text>
   color属性->图标颜色（rgba(255,0,0,1)）
  </Text>
 </View>
 <Icon amtype="Icon" type="qq" color="rgba(255,0,0,1)"></Icon>
</ScrollView>    
</View>);
  }
}
