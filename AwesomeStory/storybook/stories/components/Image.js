import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Image from 'cap4m/lib/Image';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
	function onClick($event) {
	    console.log("onClick: " + JSON.stringify($event));
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
    属性
   </Text>
  </View>
  <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     url=../image/url.png 支持本地和网络图片
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     loadingUrl=../image/loadingUrl.jpg 加载中图片地址
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     failUrl=../image/failUrl.png 加载失败图片地址 
   </Text>
  </View>
  <Image amtype="Image" style={{ backgroundColor :"red", width : px2rn(100) , height : px2rn(100) }} url={require('../image/url.png')} loadingUrl={require('../image/loadingUrl.jpg')} failUrl={require('../image/failUrl.png')} click="onClick($event)" onClick={($event)=>onClick($event)} badge={''}></Image>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     height={200} width={200} 图片宽度和高度 radius={50} 图片圆角值 
   </Text>
  </View>
  <Image amtype="Image" url={require('../image/url.png')} loadingUrl={require('../image/loadingUrl.jpg')} width={px2rn(200)} height={px2rn(200)} failUrl={require('../image/failUrl.png')} radius={px2rn(50)} badge={''}></Image>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     badge=3折 图片徽标 badgeStyle=(height:30,color:white,width:50) 图片徽标样式,颜色也支持rgb/十六进制表示 
   </Text>
  </View>
  <Image amtype="Image" url={require('../image/url.png')} loadingUrl={require('../image/loadingUrl.jpg')} failUrl={require('../image/failUrl.png')} badge={'你好啊啊 啊啊'} badgeStyle={{ color :"red"}}></Image>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     zoomable=true 是否支持手势缩放 
   </Text>
  </View>
  <Image amtype="Image" url={require('../image/url.png')} loadingUrl={require('../image/loadingUrl.jpg')} failUrl={require('../image/failUrl.png')} zoomable="true" badge={''}></Image>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     resizeMode（RN only）: resizeMode=cover 组件尺寸与图片尺寸不成比例时如何调整图片大小，cover 保持宽高比下放大图片 
   </Text>
  </View>
  <Image resizeMode="cover" amtype="Image" url={require('../image/url.png')} loadingUrl={require('../image/loadingUrl.jpg')} failUrl={require('../image/failUrl.png')} badge={''}></Image>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     resizeMode（RN only）: resizeMode=contain 保持宽高比下缩放图片 
   </Text>
  </View>
  <Image resizeMode="contain" amtype="Image" url={require('../image/url.png')} loadingUrl={require('../image/loadingUrl.jpg')} failUrl={require('../image/failUrl.png')} badge={''}></Image>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     resizeMode（RN only）: resizeMode = stretch 不维持宽高比 
   </Text>
  </View>
  <Image resizeMode="stretch" amtype="Image" url={require('../image/url.png')} loadingUrl={require('../image/loadingUrl.jpg')} failUrl={require('../image/failUrl.png')} badge={''}></Image>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     resizeMode（RN only）: resizeMode =repeat 重复平铺图片 
   </Text>
  </View>
  <Image resizeMode="repeat" amtype="Image" url={require('../image/url.png')} loadingUrl={require('../image/loadingUrl.jpg')} failUrl={require('../image/failUrl.png')} badge={''}></Image>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     resizeMode（RN only）: resizeMode =center 居中不拉伸 
   </Text>
  </View>
  <Image resizeMode="center" amtype="Image" url={require('../image/url.png')} loadingUrl={require('../image/loadingUrl.jpg')} failUrl={require('../image/failUrl.png')} badge={''}></Image>
 </ScrollView>
</View>    
</View>);
  }
}
