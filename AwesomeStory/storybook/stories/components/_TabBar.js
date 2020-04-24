import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import TabBar from 'cap4m/lib/TabBar';
import Button from 'cap4m/lib/Button';
import WingBlank from 'cap4m/lib/WingBlank';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
			function onPress($event) {
			   console.log(12)
			}
			function setBadge() {
			    $TabBar('tabbar').setBadge('1', 'hello world');
			}
			function setDot() {
			    $TabBar('tabbar').setDot('4', true);
			}
			function getBadge() {
			    console.log(12)
			}
			function getDot() {
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
<View style={{ display :"flex", flex :1}}>
 <TabBar amtype="TabBar" id="tabbar" barTintColor="green" tintColor="red" unselectedTintColor="#949494" selectedTab="1" marginTop={px2rn(0)} ref="_tabbar" autoref="tabbar">
  <TabBar.Item amtype="TabBar.Item" icon={require('../image/deposit.png')} selectedIcon={require('../image/deposit.png')} title="主页" index="1">
   <ScrollView amtype="ScrollView">
    <View style={{ fontSize : px2rn(28) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) }}>
     <Text style={{ fontSize : px2rn(28) , fontWeight :"800"}}>
      TabBar 标签栏
     </Text>
    </View>
    <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
     <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
      内置方法:
     </Text>
    </View>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      setBadge 设置徽标值
     </Text>
    </View>
    <WingBlank amtype="WingBlank" size="lg">
     <Button click="setBadge()" amtype="Button" text="setBage" type="primary" onClick={($event)=>setBadge()}></Button>
    </WingBlank>
    <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      getBadge 获取徽标值
     </Text>
    </View>
    <WingBlank amtype="WingBlank" size="lg">
     <Button click="getBadge()" amtype="Button" text="getBadge" type="primary" onClick={($event)=>getBadge()}></Button>
    </WingBlank>
    <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      setDot 设置红点
     </Text>
    </View>
    <WingBlank amtype="WingBlank" size="lg">
     <Button click="setDot()" amtype="Button" text="setDot" type="primary" onClick={($event)=>setDot()}></Button>
    </WingBlank>
    <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
    <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
     <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
      getDot 获取红点
     </Text>
    </View>
    <WingBlank amtype="WingBlank" size="lg">
     <Button click="getDot()" amtype="Button" text="getDot" type="primary" onClick={($event)=>getDot()}></Button>
    </WingBlank>
   </ScrollView>
  </TabBar.Item>
  <TabBar.Item amtype="TabBar.Item" index="2" title="附近" icon={require('../image/deposit.png')} selectedIcon="https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     Tab2
    </Text>
   </View>
  </TabBar.Item>
  <TabBar.Item amtype="TabBar.Item" index="3" title="逛一逛" icon={require('../image/deposit.png')} selectedIcon="https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     Tab3
    </Text>
   </View>
  </TabBar.Item>
  <TabBar.Item amtype="TabBar.Item" index="4" title="想一想" icon="https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg" selectedIcon="https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg">
   <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
    <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     Tab4
    </Text>
   </View>
  </TabBar.Item>
 </TabBar>
</View>    
</View>);
  }
}
