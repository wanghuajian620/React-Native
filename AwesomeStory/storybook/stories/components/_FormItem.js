import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import Button from 'cap4m/lib/Button';
import FormItem from 'cap4m/lib/FormItem';
import WingBlank from 'cap4m/lib/WingBlank';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {district:[
{
'value':'340000',
'label':'安徽省',
'children':[
]
},
{
'value':'340001',
'label':'河北省',
'children':[
]
},
{
'value':'340002',
'label':'山东省',
'children':[
]
}
]
};
	
		var array = [{
		    componentType: 'InputItem',
		    placeholder: 'ssss',
		    id: 'input',
		    autoref: 'input'
		}, {
		    componentType: 'Picker',
		    title: '请选择',
		    cols: '1',
		    text: '一级联动',
		    data: amVAR.district
		},{
		    componentType: 'TextareaItem',
		    placeholder: 'textareaItem',
		    id: 'textareaItem',
		    autoref: 'textareaItem'
		},{
		    componentType: 'Switch'
		},{
		    componentType: 'Image',
		    url:'../image/1.jpg',
		    style:{width:100,height:100}
		}];
		
		var array1 = [{
		    componentType: 'InputItem',
		    placeholder: 'ssss',
		    id: 'input',
		    autoref: 'input'
		},{
		    componentType: 'TextareaItem',
		    placeholder: 'textareaItem',
		    id: 'textareaItem',
		    autoref: 'textareaItem'
		}];
		
		function changeData(){
			$FormItem('formItem').setForms(array1);
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
  FormItem 动态表单
 </Text>
</View>
<View style={{ marginBottom : px2rn(20) , marginTop : px2rn(20) }}>
 <View style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
  <Text style={{ fontSize : px2rn(20) , fontWeight :"600", color :"blue"}}>
   内置方法：
  </Text>
 </View>
</View>
<FormItem amtype="FormItem" id="formItem" forms={array} autoref="formItem" ref="_formItem"></FormItem>
<WingBlank amtype="WingBlank" size="lg">
 <Button amtype="Button" click="changeData()" text="更换数据源" type="primary" onClick={($event)=>changeData()}></Button>
</WingBlank>    
</View>);
  }
}
