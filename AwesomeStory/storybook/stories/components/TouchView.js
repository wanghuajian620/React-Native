import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import TouchView from 'cap4m/lib/TouchView';
import Button from 'cap4m/lib/Button';
import NavBar from 'cap4m/lib/NavBar';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
			function click($event) {
				 console.log(12)
			}
            function setVisible() {
            	$TouchView('touch').setVisible('false');
            }
            function setStyle() {
            	$TouchView('touch').setStyle('backgroundColor: red;height:200px;width:300px;background-color: red;');
            }
			function back1() {
				$Router.back();
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
<NavBar amtype="NavBar" back="back1($event)" title="NavBar" mode="dark" rightIcon="ellipsis" onBack={($event)=>back1($event)}></NavBar>
<TouchView amtype="TouchView" id={'touch'} click="click($event)" style={{ height : px2rn(20) , textAlign :"center", color :"red", lineHeight : px2rn(20) , backgroundColor :"orange"}} onClick={($event)=>click($event)} autoref={'touch'} ref={'_'+'touch'}>
 <View style={{ textAlign :"center", color :"red", lineHeight : px2rn(20) }}>
  <Text style={{ textAlign :"center", color :"red", lineHeight : px2rn(20) }}>
   增加点击事件
  </Text>
 </View>
</TouchView>
<WhiteSpace amtype="WhiteSpace"></WhiteSpace>
<Button amtype="Button" click="setVisible()" text="setVisible" onClick={($event)=>setVisible()}></Button>
<WhiteSpace amtype="WhiteSpace"></WhiteSpace>
<Button amtype="Button" click="setStyle()" text="setStyle" onClick={($event)=>setStyle()}></Button>    
</View>);
  }
}
