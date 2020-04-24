import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Button from 'cap4m/lib/Button';
import Tag from 'cap4m/lib/Tag';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
  function getdisa() {
   console.log($Tag('tag').getDisabled())
  }
  function setdisa() {
   $Tag('tag').setDisabled(false)
  }
  
  function getse() {
   console.log($Tag('ta').getSelected())
  }
  function setse() {
   $Tag('ta').setSelected(false)
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
<Tag amtype="Tag" id="tag" text="Basic" disabled="true" autoref="tag" ref="_tag"></Tag>
<Button amtype="Button" text="getDisabled" type="primary" click="getdisa()" onClick={($event)=>getdisa()}></Button>
<Button amtype="Button" text="setDisabled" type="primary" click="setdisa()" onClick={($event)=>setdisa()}></Button>
<WhiteSpace amtype="WhiteSpace"></WhiteSpace>
<Tag amtype="Tag" id="ta" text="Basic" selected="true" autoref="ta" ref="_ta"></Tag>
<Button amtype="Button" text="getSelected" type="primary" click="getse()" onClick={($event)=>getse()}></Button>
<Button amtype="Button" text="setSelected" type="primary" click="setse()" onClick={($event)=>setse()}></Button>    
</View>);
  }
}
