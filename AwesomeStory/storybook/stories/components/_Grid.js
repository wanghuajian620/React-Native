import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import Grid from 'cap4m/lib/Grid';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {data:[
{
icon:require("../image/cap4m_jjk.png"),
text:'兴业借记卡'
},
{
icon:require("../image/cap4m_xyk.png"),
text:'兴业信用卡'
},
{
icon:require("../image/cap4m_qd.png"),
text:'钱大掌柜'
},
{
icon:require("../image/cap4m_xf.png"),
text:'消费金融'
},
{
icon:require("../image/cap4m_hf.png"),
text:'华富证券'
},
{
icon:require("../image/cap4m_xyjj.png"),
text:'兴业基金'
},
{
icon:require("../image/cap4m_xyxt.png"),
text:'兴业信托'
},
{
icon:require("../image/cap4m_xyqh.png"),
text:'兴业期货'
},
{
icon:require("../image/cap4m_xyyj.png"),
text:'兴业研究'
}
]
};
		function addOption() {
		    var data = [
		        { icon: require("../image/cap4m_hf.png"), text: '华富证券' },
		        { icon: require("../image/cap4m_xyjj.png"), text: '兴业基金' }
		    ];
		    $Grid("_Grid1").addOption(data);
		}
		function setData(e) {
		    var data = [
		        { icon:require("../image/cap4m_hf.png"), text: '华富证券' }
		    ];
		    $Grid("_Grid2").setData(data);
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
   Grid宫格组件
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   内置方法：
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   addOption属性->添加grid单元格
  </Text>
 </View>
 <Grid amtype="Grid" data={this.state.data} imgWidth={32} imgHeight={22} id="_Grid1" ref="__Grid1" autoref="_Grid1"></Grid>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Button amtype="Button" text="addOption方法" click="addOption()" type="primary" onClick={($event)=>addOption()}></Button>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   setData属性->重置grid数据
  </Text>
 </View>
 <Grid amtype="Grid" data={this.state.data} imgWidth={32} imgHeight={22} id="_Grid2" ref="__Grid2" autoref="_Grid2"></Grid>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Button amtype="Button" text="setData方法" click="setData()" type="primary" onClick={($event)=>setData()}></Button>
</ScrollView>    
</View>);
  }
}
