import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Button from 'cap4m/lib/Button';
import WingBlank from 'cap4m/lib/WingBlank';
import WhiteSpace from 'cap4m/lib/WhiteSpace';
import {$Toast} from '../../src/util/index';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {}; 
    function showToast() {
        $Toast.info('This is a toast tips !!!', 1,function() {
           console.log(12)
      }, false);
      }
      function showToastNoMask() {
        $Toast.info('Toast without mask !!!', 2, function() {
           console.log(12)
        }, false);
      }

      function successToast() {
        $Toast.success('Load success !!!', 1,function() {
           console.log(12)
        }, false);
      }

      function failToast() {
        $Toast.fail('Load failed !!!', 1,function() {
           console.log(12)
        }, false);
      }

      function offline() {
        $Toast.offline('Network connection failed !!!', 1,function() {
           console.log(12)
        }, false);
      }

      function loadingToast() {
      	 $Toast.loading('loading!!!', 2,function() {
           console.log(12)
        }, false);
      }
      
	 function click (){
	 	$Toast.hide();
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
  Toast 轻提示
 </Text>
</View>
<View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
 <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
  <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   属性：
  </Text>
 </View>
</View>
<WingBlank amtype="WingBlank">
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Button amtype="Button" text="text only" click="showToast()" onClick={($event)=>showToast()}></Button>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Button amtype="Button" text="without mask" click="showToastNoMask()" onClick={($event)=>showToastNoMask()}></Button>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Button amtype="Button" click="successToast()" text="success" onClick={($event)=>successToast()}></Button>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Button amtype="Button" click="failToast()" text="fail" onClick={($event)=>failToast()}></Button>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Button amtype="Button" click="offline()" text="network failure" onClick={($event)=>offline()}></Button>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <Button amtype="Button" click="loadingToast()" text="loading" onClick={($event)=>loadingToast()}></Button>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
</WingBlank>
<WingBlank amtype="WingBlank" size="lg">
 <Button amtype="Button" text="hide" click="click()" onClick={($event)=>click()}></Button>
</WingBlank>    
</View>);
  }
}
