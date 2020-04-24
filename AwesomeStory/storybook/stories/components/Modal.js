import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Button from 'cap4m/lib/Button';
import {$Modal, $Toast} from '../../src/util/index';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function modal() {
		    $Modal.alert('title', 'message', [{
		        text: '确定',
		        onPress: function () {
		            $Toast.info('onPress promise resolve', 1);
		        }
		    }]);
		}
		function confirm() {
		    $Modal.confirm('title', 'message', [{
		        text: '关闭',
		        onPress: function () {
		            $Toast.info('onPress promise resolve', 1);
		        }
		    }, {
		        text: '确定',
		        onPress: function () {
		            $Toast.info('onPress promise resolve', 1);
		        }
		    }]);
		}
		function prompt() {
		    $Modal.prompt('title', 'message', [{
		        text: '取消',
		        onPress: function () {
		            $Toast.info('onPress promise resolve', 1);
		        }
		    }, {
		        text: '确定',
		        onPress: function () {
		            $Toast.info('onPress promise resolve', 1);
		        }
		    }]);
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
  Modal
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
  普通提示框
 </Text>
</View>
<Button amtype="Button" text="Show Alert" type="primary" click="modal()" onClick={($event)=>modal()}></Button>
<View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  确认框
 </Text>
</View>
<Button amtype="Button" text="Show Alert" type="primary" click="confirm()" onClick={($event)=>confirm()}></Button>
<View style={{ fontSize : px2rn(16) , marginTop : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  输入弹窗
 </Text>
</View>
<Button amtype="Button" text="Show Alert" type="primary" click="prompt()" onClick={($event)=>prompt()}></Button>    
</View>);
  }
}
