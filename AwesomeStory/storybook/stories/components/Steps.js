import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Steps from 'cap4m/lib/Steps';
import ScrollView from 'cap4m/lib/ScrollView';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
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
<ScrollView amtype="ScrollView" contentContainerStyle={{ backgroundColor :"rgb(255, 255, 255)"}}>
 <View style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
  <Text style={{ fontSize : px2rn(24) , fontWeight :"600"}}>
   Steps 步骤条
  </Text>
 </View>
 <View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
  <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
    属性：
   </Text>
  </View>
 </View>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   direction=vertical
  </Text>
 </View>
 <Steps amtype="Steps" current={0} direction="vertical">
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
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   direction=horizontal
  </Text>
 </View>
 <Steps amtype="Steps" current={0} direction="horizontal">
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
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   current=0(title=一开始、然后、最后)
  </Text>
 </View>
 <Steps amtype="Steps" current={0} direction="horizontal">
  <Steps.Step amtype="Steps.Step" index={0} title="一开始">
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", backgroundColor :"rgb(255, 255, 255)", height : px2rn(200) }}>
    <Text>
      steps1 
    </Text>
   </View>
  </Steps.Step>
  <Steps.Step amtype="Steps.Step" index={1} title="然后">
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", backgroundColor :"rgb(255, 255, 255)", height : px2rn(200) }}>
    <Text>
      steps2 
    </Text>
   </View>
  </Steps.Step>
  <Steps.Step amtype="Steps.Step" index={2} title="最后">
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", backgroundColor :"rgb(255, 255, 255)", height : px2rn(200) }}>
    <Text>
      steps2 
    </Text>
   </View>
  </Steps.Step>
 </Steps>
 <View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   current=2
  </Text>
 </View>
 <Steps amtype="Steps" current={2} direction="horizontal">
  <Steps.Step amtype="Steps.Step" index={0} title="一开始">
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", backgroundColor :"rgb(255, 255, 255)", height : px2rn(200) }}>
    <Text>
      steps1 
    </Text>
   </View>
  </Steps.Step>
  <Steps.Step amtype="Steps.Step" index={1} title="然后">
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", backgroundColor :"rgb(255, 255, 255)", height : px2rn(200) }}>
    <Text>
      steps2 
    </Text>
   </View>
  </Steps.Step>
  <Steps.Step amtype="Steps.Step" index={2} title="最后">
   <View style={{ display :"flex", alignItems :"center", justifyContent :"center", backgroundColor :"rgb(255, 255, 255)", height : px2rn(200) }}>
    <Text>
      steps2 
    </Text>
   </View>
  </Steps.Step>
 </Steps>
</ScrollView>    
</View>);
  }
}
