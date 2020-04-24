import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import InputItem from 'cap4m/lib/InputItem';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {rules1:[
{
pattern:/^[1]\d{10}$/,
required:true,
message:'请输入以1开头的11位手机号'
}
]
};
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
<View style={{ display :"flex", flex :1}}>
 <ScrollView amtype="ScrollView" style={{ display :"flex", flex :1}}>
  <View style={{ fontSize : px2rn(28) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) }}>
   <Text style={{ fontSize : px2rn(28) , fontWeight :"800"}}>
    InputItem 文本输入
   </Text>
  </View>
  <View style={{ fontSize : px2rn(24) , fontWeight :"800", marginTop : px2rn(18) , marginBottom : px2rn(18) , color :"blue"}}>
   <Text style={{ fontSize : px2rn(24) , fontWeight :"800", color :"blue"}}>
    属性:
   </Text>
  </View>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    type=text 输入框类型
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    type=bankCard 银行卡
   </Text>
  </View>
  <InputItem amtype="InputItem" type="bankCard" placeholder="请输入"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    type=phone 手机号，长度11位
   </Text>
  </View>
  <InputItem amtype="InputItem" type="phone" placeholder="请输入"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    type=password 密码
   </Text>
  </View>
  <InputItem amtype="InputItem" type="password" placeholder="请输入"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    type=number 数字 唤起数字键盘
   </Text>
  </View>
  <InputItem amtype="InputItem" type="number" placeholder="请输入"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    type=money 带小数点的数字
   </Text>
  </View>
  <InputItem amtype="InputItem" type="money" placeholder="请输入"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     placeholder=请输入内容 默认提示值;placeholderTextColor=blue 提示文本颜色，也支持rgb/十六进制表示（RN only）
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入" placeholderTextColor="blue"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    text=文本输入框 左侧文本;textStyle=（color:green,fontsize:30） 左侧文本样式,颜色也支持rgb/十六进制表示(RN only) 
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" text="文本输入框" textStyle={{ color :"green", fontSize : px2rn(30) }}></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    value=value 输入值
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" value="value"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    defaultValue=defaultValue 默认输入值
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" defaultValue="defaultValue"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     disabled=true 是否禁用
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入内容" disabled="true"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     editable=false 是否可编辑
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入内容" editable="false"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
     clear=true 是否带清除功能，仅当editable=true，disabled=false才生效
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入内容" disabled="false" editable="true" clear="true"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    maxLength=5 最大长度
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入内容" maxLength={5}></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    extra=注释 右边注释
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入内容" extra="注释"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    text="标题不能超过七个字"， labelNumber=7 标签文字个数，可用2-7
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入内容" labelNumber={7} text="标题不能超过七个字"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    labelIcon=left 左侧图标显示;labelIconStyle=(height:100px,color:red) 左侧图标样式，颜色也支持rgb/十六进制表示(RN only)
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入内容" labelIcon="left" labelIconStyle={{ height : px2rn(100) , color :"rgb(255, 0, 0)"}}></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    fontSize=20px fontColor=red fontWeight=800 设置字体大小/颜色/粗细，颜色也支持rgb/十六进制表示
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入内容" fontSize={px2rn(20)} fontColor="rgb(255,0,0)" fontWeight="800"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    textAlign=right 设置对齐方式，可选left/right 
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入内容" textAlign="right"></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    rules=rules1 设置规则
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" placeholder="请输入内容" rules={this.state.rules1}></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    containerStyle=background-color:red; width:100px;height:50px 设置输入框样式,颜色也支持rgb/十六进制表示
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" containerStyle={{ backgroundColor :"rgb(255, 0, 0)", width : px2rn(100) , height : px2rn(50) }}></InputItem>
  <View style={{ fontSize : px2rn(20) , fontWeight :"400", marginTop : px2rn(23) , marginBottom : px2rn(23) }}>
   <Text style={{ fontSize : px2rn(20) , fontWeight :"400"}}>
    text="标题不能超过七个字"，leftContentStyle=height:100px 设置左侧容器样式（RN only）
   </Text>
  </View>
  <InputItem amtype="InputItem" type="text" text="标题不能超过七个字" placeholder="请输入内容" leftContentStyle={{ fontSize : px2rn(30) , fontWeight :"600"}}></InputItem>
 </ScrollView>
</View>    
</View>);
  }
}
