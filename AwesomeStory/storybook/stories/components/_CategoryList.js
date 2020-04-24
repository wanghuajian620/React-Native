import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import CategoryList from 'cap4m/lib/CategoryList';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {categoryList_data:[
{
value:'1',
title:'1st Tab'
},
{
value:'2',
title:'2nd Tab'
},
{
value:'3',
title:'3rd Tab'
}
]
};
		
		function onClick(e) { console.log(12)}
		function setData() {
		    var data = [
		        {
		            value: '1',
		            title: 'aaaaa'
		        },
		        {
		            value: '2',
		            title: 'bbbbb'
		        },
		        {
		            value: '3',
		            title: 'ccccc'
		        }
		    ];
		    $CategoryList("_CategoryList").setData(data);
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
   CategoryList 菜单分栏 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   内置方法：
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   setData方法
  </Text>
 </View>
 <Button amtype="Button" type="primary" text="setData方法" click="setData()" onClick={($event)=>setData()}></Button>
 <CategoryList amtype="CategoryList" data={this.state.categoryList_data} click="onClick($event)" id="_CategoryList" onClick={($event)=>onClick($event)} autoref="_CategoryList" ref="__CategoryList">
  <View style={{ display :"flex", flexDirection :"row", alignItems :"center", justifyContent :"center", height : px2rn(150) , backgroundColor :"rgb(255, 255, 255)"}}>
   <View>
    <Text>
      Content of first tab
    </Text>
   </View>
  </View>
  <View style={{ display :"flex", flexDirection :"row", alignItems :"center", justifyContent :"center", height : px2rn(150) , backgroundColor :"rgb(255, 255, 255)"}}>
   <View>
    <Text>
      Content of first tab
    </Text>
   </View>
  </View>
  <View style={{ display :"flex", flexDirection :"row", alignItems :"center", justifyContent :"center", height : px2rn(150) , backgroundColor :"rgb(255, 255, 255)"}}>
   <View>
    <Text>
      Content of first tab
    </Text>
   </View>
  </View>
 </CategoryList>
</ScrollView>    
</View>);
  }
}
