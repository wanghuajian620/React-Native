import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Steps from 'cap4m/lib/Steps';
import Button from 'cap4m/lib/Button';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
   
    function setStep(){
   	  $Steps('step').setStep(1);
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
  Steps 步骤条
 </Text>
</View>
<View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
 <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
  <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   内置方法：
  </Text>
 </View>
</View>
<Steps amtype="Steps" current={0} id="step" direction="vertical" autoref="step" ref="_step">
 <Steps.Step amtype="Steps.Step" index={0} title="steps1">
  <View style={{ display :"flex", alignItems :"center", justifyContent :"center", backgroundColor :"rgb(255, 255, 255)", height : px2rn(200) }}>
   <Text>
     steps1 
   </Text>
  </View>
 </Steps.Step>
 <Steps.Step amtype="Steps.Step" index={1} title="欢迎来到第二步">
  <View style={{ display :"flex", alignItems :"center", justifyContent :"center", backgroundColor :"rgb(255, 255, 255)", height : px2rn(200) }}>
   <Text>
     steps2 
   </Text>
  </View>
 </Steps.Step>
 <Steps.Step amtype="Steps.Step" index={2} title="欢迎来到第三步">
  <View style={{ display :"flex", alignItems :"center", justifyContent :"center", backgroundColor :"rgb(255, 255, 255)", height : px2rn(200) }}>
   <Text>
     steps2 
   </Text>
  </View>
 </Steps.Step>
</Steps>
<Button amtype="Button" click="setStep()" text="设置step位置" onClick={($event)=>setStep()}></Button>    
</View>);
  }
}
