import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Radio from 'cap4m/lib/Radio';

// import scope from '../../src/until/this';
import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
//import { WebSDK } from  '../../src/sdk/index';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {
			
			gender:[
				{
					value:"0",
					label:"male"
				},
				{
					value:"1",
					label:"female"
				}
			],
			 data: [{
                value: '0',
                label: 'Ph.D.'
            }, {
                value: '1',
                label: 'Bachelor',
            }, {
                value: '2',
                label: 'College diploma',
            }]
		};
		function change($event) {
		    console.log('change:' + JSON.stringify($event));
		}
let _amVAR = _.cloneDeep(amVAR)
export default class App extends Component {
constructor(props) {
super(props);
// scope(this);
// var omap = {};omap[this.props.navigation.state.routeName] = this;
// $.instanceList.push(omap);
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
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   type="block" 单选框类型 
  </Text>
 </View>
 <Radio amtype="Radio" data={this.state.data} change="change($event)" type="block" onChange={($event)=>change($event)}></Radio>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   type="inline"
  </Text>
 </View>
 <Radio amtype="Radio" data={this.state.data} type="inline"></Radio>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   value="2" 默认选中的单选框的值
  </Text>
 </View>
 <Radio amtype="Radio" data={this.state.data} value="2"></Radio>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   spacing="20" 单选框按钮与右侧文字距离
  </Text>
 </View>
 <Radio amtype="Radio" data={this.state.data} spacing={20}></Radio>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   fontColor="red" fontSize="13" 文字大小和文字颜色
  </Text>
 </View>
 <Radio amtype="Radio" data={this.state.data} fontColor="red" fontSize={13}></Radio>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   title属性->title(gender)
  </Text>
 </View>
 <View>
  <Text>
   titleStyles属性->title的样式
  </Text>
 </View>
 <Radio amtype="Radio" data={this.state.gender} type="inline" fontColor="red" title="gender" titleStyles={{ color :"red"}}></Radio>
 <View style={{ marginTop : px2rn(20) }}></View>
</ScrollView>    
</View>);
  }
}
