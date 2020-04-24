import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import SectionList from 'cap4m/lib/SectionList';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {data:[
{
title:'Meet hotel',
data:[
{
content:'单元格1-1'
},
{
content:'单元格1-2'
}
]
},
{
title:'McDonald invites you',
data:[
{
content:'单元格1-1'
},
{
content:'单元格1-2'
}
]
},
{
title:'Eat the week',
data:[
{
content:'单元格1-1'
},
{
content:'单元格1-2'
}
]
}
],
data1:[
{
title:'hhh',
data:[
{
content:'单元格1-1'
},
{
content:'单元格1-2'
}
]
},
{
title:'www',
data:[
{
content:'单元格1-1'
},
{
content:'单元格1-2'
}
]
},
{
title:'eee',
data:[
{
content:'单元格1-1'
},
{
content:'单元格1-2'
}
]
}
]
};
	
		function init(instance) {
		    instance.refresh(function (resolove) {
		        setTimeout(function () {
		            resolove(amVAR.data);
		        }, 1000);
		    });
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
  SectionList 分组列表
 </Text>
</View>
<View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
 <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
  <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   属性：
  </Text>
 </View>
</View>
<SectionList amtype="SectionList" init={($event)=>init($event)} up="true" down="true" cell={(info)=><React.Fragment>
 <View amtype="SectionList.Cell"> 
  <View style={{ marginBottom : px2rn(8) , fontWeight :"bold"}}> 
   <Text style={{ fontWeight :"bold"}}>
     {info&&info.content} 
   </Text> 
  </View> 
 </View>
</React.Fragment>} sectionHeader={(info)=><React.Fragment>
 <View amtype="SectionList.SectionHeader"> 
  <View style={{ lineHeight : px2rn(50) , color :"rgb(136, 136, 136)", fontSize : px2rn(18) }}> 
   <Text style={{ lineHeight : px2rn(50) , color :"rgb(136, 136, 136)", fontSize : px2rn(18) }}>
     {info&&info.title} 
   </Text> 
  </View> 
 </View>
</React.Fragment>}>
 <View amtype="SectionList.Header">
  <Text>
    Header 
  </Text>
 </View>
 <View amtype="SectionList.Footer">
  <Text>
    Footer 
  </Text>
 </View>
</SectionList>    
</View>);
  }
}
