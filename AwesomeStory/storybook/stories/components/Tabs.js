import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Tabs from 'cap4m/lib/Tabs';
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
title:'1st Tab'
},
{
title:'2nd Tab'
},
{
title:'3rd Tab'
}
]
};
  function tabClick($event) {
   console.log(12)
}
function change($event) {
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
<Tabs amtype="Tabs" tabClick="tabClick($event)" change="change($event)" tabs={this.state.data} tabBarActiveTextStyle={{ fontSize : px2rn(40) , color :"red"}} onChange={($event)=>change($event)} onTabClick={($event)=>tabClick($event)}>
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", height : px2rn(150) , backgroundColor :"gray"}}>
    <View>
     <Text>
      Content of first tab
     </Text>
    </View>
   </View>
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", height : px2rn(150) , backgroundColor :"gray"}}>
    <View>
     <Text>
      Content of second tab
     </Text>
    </View>
   </View>
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", height : px2rn(150) , backgroundColor :"gray"}}>
    <View>
     <Text>
       Content of third tab
     </Text>
    </View>
   </View>
  </Tabs>    
</View>);
  }
}
