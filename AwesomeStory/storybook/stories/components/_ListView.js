import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ListView from 'cap4m/lib/ListView';
import ScrollView from 'cap4m/lib/ScrollView';
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

			function setData() {
				
				$ListView('ListView').setData([{
					title : 'We will we will rock you',
					des : 'Kicking your can over the place'
				}, {
					title : 'Buddy you are yong man poor man',
					des : 'We will we will rock you'
				}, {
					title : 'You big disgrace',
					des : 'Singing'
				}]);
			}
			
			function append() {
				$ListView('ListView').append([{
					title : 'Singing',
					des : 'Give me five'
				}]);
			}
			
			function getData() {
				var lv=$ListView('ListView').getData();
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
<ScrollView amtype="ScrollView" contentContainerStyle={{ backgroundColor :"yellow"}}>
 <View style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
  <Text style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
   ListView 长列表
  </Text>
 </View>
 <View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
  <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
    内置方法：
   </Text>
  </View>
 </View>
 <ListView amtype="ListView" init={($event)=>init($event)} id="ListView" up="false" down="false" autoref="ListView" ref="_ListView" template={(info)=><React.Fragment>
 <View style={{ marginBottom : px2rn(10) , backgroundColor :"rgb(255, 255, 255)", padding : px2rn(20) }}> 
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
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" text="setData" click="setData()" type="primary" onClick={($event)=>setData()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" text="append" click="append()" type="primary" onClick={($event)=>append()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" text="getData" click="getData()" type="primary" onClick={($event)=>getData()}></Button>
 </WingBlank>
</ScrollView>    
</View>);
  }
}
