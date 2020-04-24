import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import WingBlank from 'cap4m/lib/WingBlank';
import Image from 'cap4m/lib/Image';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR={};
function onClick($event) {
    console.log("onClick: " + JSON.stringify($event));
}
var loadingUrl=require("../image/loadingUrl.jpg")
function setUrl($event) {
    $Image('image').setUrl(loadingUrl);
}
function removeBadge() {
    $Image('image').removeBadge(true);
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
<View style={{ display :"flex", flex :1}}>
 <ScrollView amtype="ScrollView" style={{ display :"flex", flex :1}}>
  <View style={{ fontSize : px2rn(28) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) }}>
   <Text style={{ fontSize : px2rn(28) , fontWeight :"800"}}>
    Image 图片组件
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    内置方法:
   </Text>
  </View>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <Image id={'image'} amtype="Image" zoomable="true" url={require('../image/url.png')} loadingUrl={require('../image/loadingUrl.jpg')} failUrl={require('../image/failUrl.png')} radius={px2rn(50)} click="onClick($event)" badge={'3折'} onClick={($event)=>onClick($event)} autoref={'image'} ref={'_'+'image'}></Image>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     setUrl 设置图片url 
   </Text>
  </View>
  <WingBlank amtype="WingBlank" size="lg">
   <Button amtype="Button" text="setUrl" click="setUrl()" type="primary" onClick={($event)=>setUrl()}></Button>
  </WingBlank>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    removeBadge 移除徽标 
   </Text>
  </View>
  <WingBlank amtype="WingBlank" size="lg">
   <Button amtype="Button" text="removeBadge" click="removeBadge()" type="primary" onClick={($event)=>removeBadge()}></Button>
  </WingBlank>
 </ScrollView>
</View>    
</View>);
  }
}
