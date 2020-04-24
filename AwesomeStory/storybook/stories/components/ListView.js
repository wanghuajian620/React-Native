import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ListView from 'cap4m/lib/ListView';
import Button from 'cap4m/lib/Button';

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
des:'不是所有的兼职汪都需要风吹日晒1'
},
{
title:'McDonalds invites you',
des:'不是所有的兼职汪都需要风吹日晒2'
},
{
title:'Eat the week',
des:'不是所有的兼职汪都需要风吹日晒3'
}
]
};
			function init(instance) {
				instance.refresh(function(resolove) {
					setTimeout(function() {
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
  ListView 长列表
 </Text>
</View>
<View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
 <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
  <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   属性：
  </Text>
 </View>
</View>
<ListView amtype="ListView" numColumns={2} init={($event)=>init($event)} up="false" down="false" template={(info)=><React.Fragment>
 <View style={{ backgroundColor :"rgb(255, 255, 255)", width :"50%"}}> 
  <View style={{ lineHeight : px2rn(50) , color :"rgb(136, 136, 136)", fontSize : px2rn(18) }}> 
   <Text style={{ lineHeight : px2rn(50) , color :"rgb(136, 136, 136)", fontSize : px2rn(18) }}>
     {info&&info.title} 
   </Text> 
  </View> 
  <View style={{ display :"flex", padding : px2rn(15) }}> 
   <View style={{ lineHeight : px2rn(35) }}> 
    <View style={{ lineHeight : px2rn(35) , marginBottom : px2rn(8) , fontWeight :"bold"}}> 
     <Text style={{ lineHeight : px2rn(35) , fontWeight :"bold"}}>
       {info&&info.des} 
     </Text> 
    </View> 
    <View style={{ lineHeight : px2rn(35) }}> 
     <Text style={{ lineHeight : px2rn(35) }}>
       35 
     </Text> 
     <Text style={{ lineHeight : px2rn(35) }}>
       ¥ 
     </Text> 
    </View> 
   </View> 
  </View> 
  <Button amtype="Button" type="primary" text="ccc"></Button> 
 </View>
</React.Fragment>}></ListView>    
</View>);
  }
}
