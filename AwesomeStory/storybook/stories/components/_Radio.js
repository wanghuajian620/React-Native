import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import Radio from 'cap4m/lib/Radio';
import WingBlank from 'cap4m/lib/WingBlank';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {
			 data: [{
                value: '0',
                label: 'Ph.D.'
            }, {
                value: '1',
                label: 'Bachelor'
            }, {
                value: '2',
                label: 'College diploma',
            }]
		};
		function change($event) {
		    console.log('change:' + JSON.stringify($event));
		}
		function getValue() {
		    console.log(12)
		}
		function addOption() {
		    //addOption	添加选选框
		    $Radio('Radio1').addOption({
		        value: '6',
		        label: 'darling in the furancx',
		    });
		}
		function setData() {
		  
		    $Radio('Radio1').setData([{
		        value: '3',
		        label: 'darling in the furancx',
		           },{
		            value: '4',
		            label: 'furjavascriptancx',
		        } 
		]);
		}
		function setValue() {
		    //setValue	设置选中项	String
		    $Radio('Radio1').setValue('2');
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
   Radio 单选框 
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   内置方法:
  </Text>
 </View>
 <Radio amtype="Radio" id="Radio1" data={this.state.data} change="change($event)" onChange={($event)=>change($event)} ref="_Radio1" autoref="Radio1"></Radio>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   setValue 设置单选框的值
  </Text>
 </View>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="setValue()" text="setValue" type="primary" onClick={($event)=>setValue()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    getValue 获取单选框的值
  </Text>
 </View>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="getValue()" text="getValue" type="primary" onClick={($event)=>getValue()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    setData 重置数据
  </Text>
 </View>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="setData()" text="setData" type="primary" onClick={($event)=>setData()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
    addOption 增加选项框
  </Text>
 </View>
 <WingBlank amtype="WingBlank" size="lg">
  <Button amtype="Button" click="addOption()" text="addOption" type="primary" onClick={($event)=>addOption()}></Button>
 </WingBlank>
</ScrollView>    
</View>);
  }
}
