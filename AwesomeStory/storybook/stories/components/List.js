import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import List from 'cap4m/lib/List';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function onClick() {
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
   List列表 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   header,footer属性->header=Basic Style; footer=Subtitle 
  </Text>
 </View>
 <List amtype="List" header="Basic Style" footer="Subtitle">
  <List.Item amtype="List.Item" arrow="up">
   <View>
    <View>
     <Text>
      内容
     </Text>
    </View>
   </View>
  </List.Item>
 </List>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   List.Item 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   click属性-> 点击事件的回调 
  </Text>
 </View>
 <List amtype="List" header="America" footer="China">
  <List.Item amtype="List.Item" align="top" click="onClick($event)" arrow="horizontal" thumb={require('../image/1.jpg')} onClick={($event)=>onClick($event)}>
   <View>
    <Text>
     horizontalsdsdsadsadsadsada
    </Text>
   </View>
   <View amtype="List.Extra">
    <View>
     <Text>
      top
     </Text>
    </View>
   </View>
  </List.Item>
 </List>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   thumb属性->图片的路径 
  </Text>
 </View>
 <List amtype="List" header="America" footer="China">
  <List.Item amtype="List.Item" align="mautorefdle" arrow="up" thumb={require('../image/2.jpg')}>
   <Text>
     up 
   </Text>
   <View amtype="List.Extra">
    <View>
     <Text>
      mautorefdle
     </Text>
    </View>
   </View>
  </List.Item>
 </List>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   arrow属性->箭头向下（down)
  </Text>
 </View>
 <View>
  <Text>
   align属性-> 底对齐（bottom） 
  </Text>
 </View>
 <List amtype="List" header="America" footer="China">
  <List.Item amtype="List.Item" align="bottom" arrow="down" thumb={require('../image/2.jpg')}>
   <View>
    <Text>
     down
    </Text>
   </View>
   <View amtype="List.Extra">
    <View>
     <Text>
      bottom
     </Text>
    </View>
   </View>
  </List.Item>
 </List>
 <List amtype="List" header="America" footer="China">
  <List.Item amtype="List.Item" arrow="empty" thumb={require('../image/1.jpg')}>
   <View>
    <Text>
     empty
    </Text>
   </View>
   <View amtype="List.Extra">
    <View>
     <Text>
      hello4
     </Text>
    </View>
   </View>
  </List.Item>
 </List>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
</ScrollView>    
</View>);
  }
}
