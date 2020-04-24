import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import WingBlank from 'cap4m/lib/WingBlank';

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
<View style={{ display :"flex", flex :1}}>
 <ScrollView amtype="ScrollView" style={{ display :"flex", flex :1}}>
  <View style={{ fontSize : px2rn(28) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) }}>
   <Text style={{ fontSize : px2rn(28) , fontWeight :"800"}}>
    WingBlank 两翼留白
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    属性:
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    size=lg
   </Text>
  </View>
  <WingBlank amtype="WingBlank" size="lg">
   <View style={{ backgroundColor :"rgb(187, 187, 187)", textAlign :"center", height : px2rn(50) , lineHeight : px2rn(50) }}></View>
  </WingBlank>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    size=md
   </Text>
  </View>
  <WingBlank amtype="WingBlank" size="md">
   <View style={{ backgroundColor :"rgb(187, 187, 187)", textAlign :"center", height : px2rn(50) , lineHeight : px2rn(50) }}></View>
  </WingBlank>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    size=sm
   </Text>
  </View>
  <WingBlank amtype="WingBlank" size="sm">
   <View style={{ backgroundColor :"rgb(187, 187, 187)", textAlign :"center", height : px2rn(50) , lineHeight : px2rn(50) }}></View>
  </WingBlank>
 </ScrollView>
</View>    
</View>);
  }
}
