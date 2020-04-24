import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Carousel from 'cap4m/lib/Carousel';
import Image from 'cap4m/lib/Image';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function afterChange(e) {
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
   Carousel 走马灯 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    screen属性->是否全屏展示(false)
  </Text>
 </View>
 <Carousel amtype="Carousel" screen="false" selectedIndex={1} dots="true" autoplay="true" infinite="true" autoplayInterval={2000} dotStyle={{ backgroundColor :"yellow"}} dotActiveStyle={{ backgroundColor :"red"}}>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/1.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/2.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/3.jpg')} badge={''}></Image>
 </Carousel>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   vertical属性->是否垂直展示(true)
  </Text>
 </View>
 <Carousel amtype="Carousel" vertical="true" selectedIndex={1} dots="true" autoplay="true" infinite="true" autoplayInterval={2000} dotStyle={{ backgroundColor :"yellow"}} dotActiveStyle={{ backgroundColor :"red"}}>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/1.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/2.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/3.jpg')} badge={''}></Image>
 </Carousel>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   selectedIndex属性->手动设置当前显示的索引(2)
  </Text>
 </View>
 <Carousel amtype="Carousel" selectedIndex={2} dots="true" infinite="true" dotStyle={{ backgroundColor :"yellow"}} dotActiveStyle={{ backgroundColor :"red"}}>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/1.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/2.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/3.jpg')} badge={''}></Image>
 </Carousel>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   dots属性->是否显示面板指示点(false)
  </Text>
 </View>
 <Carousel amtype="Carousel" autoplay="true" autoplayInterval={2000} dots="false" selectedIndex={0} infinite="true" dotStyle={{ backgroundColor :"yellow"}} dotActiveStyle={{ backgroundColor :"red"}}>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/1.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/2.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/3.jpg')} badge={''}></Image>
 </Carousel>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    autoplay属性->是否自动播放（true） 
  </Text>
 </View>
 <View>
  <Text>
    autoplayInterval属性->自动切换的时间间隔（5s） 
  </Text>
 </View>
 <View>
  <Text>
    infinite属性->是否循环播放（false） 
  </Text>
 </View>
 <Carousel amtype="Carousel" autoplay="true" autoplayInterval={5000} selectedIndex={0} infinite="false" dotStyle={{ backgroundColor :"yellow"}} dotActiveStyle={{ backgroundColor :"red"}}>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/1.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/2.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/3.jpg')} badge={''}></Image>
 </Carousel>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   afterChange属性->切换面板后的回调函数
  </Text>
 </View>
 <Carousel amtype="Carousel" autoplay="false" afterChange={($event)=>afterChange($event)} selectedIndex={0} infinite="true" dotStyle={{ backgroundColor :"yellow"}} dotActiveStyle={{ backgroundColor :"red"}}>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/1.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/2.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/3.jpg')} badge={''}></Image>
 </Carousel>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    dotStyle属性->指示点样式(#f00) 
  </Text>
 </View>
 <View>
  <Text>
    dotActiveStyle属性->当前激活的指示点样式(rgba(0,255,0,1)) 
  </Text>
 </View>
 <Carousel amtype="Carousel" autoplay="true" selectedIndex={0} infinite="true" dotStyle={{ backgroundColor :"rgb(255, 0, 0)"}} dotActiveStyle={{ backgroundColor :"rgba(0, 255, 0, 1)"}}>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/1.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/2.jpg')} badge={''}></Image>
  <Image amtype="Image" width={px2rn(500)} height={px2rn(200)} url={require('../image/3.jpg')} badge={''}></Image>
 </Carousel>
</ScrollView>    
</View>);
  }
}
