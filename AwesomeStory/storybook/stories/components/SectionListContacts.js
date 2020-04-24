import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import TouchView from 'cap4m/lib/TouchView';
import SectionListContacts from 'cap4m/lib/SectionListContacts';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {data:[
{
key:'A',
data:[
{
name:'北京百度科技不一样啊'
},
{
name:'北京小米科技1'
},
{
name:'北京网易科技'
}
]
},
{
key:'B',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'C',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'D',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'E',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'F',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'G',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'H',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'I',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'J',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'K',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'L',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'M',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'N',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'O',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'P',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'Q',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'R',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'S',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'T',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'U',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'V',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
// {
// key:'V',
// data:[
// {
// name:'成都开心麻花文化传媒有限公司'
// },
// {
// name:'成都高新投资集团有限公司'
// },
// {
// name:'东方希望农业科技有限公司'
// },
// {
// name:'东方希望农业科技有限公司'
// },
// {
// name:'东方希望农业科技1有限公司'
// },
// {
// name:'东方希望农业科技有限公司'
// },
// {
// name:'东方希望农业科技有限公司'
// }
// ]
// },
{
key:'W',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'X',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'Y',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
},
{
key:'Z',
data:[
{
name:'成都开心麻花文化传媒有限公司'
},
{
name:'成都高新投资集团有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技1有限公司'
},
{
name:'东方希望农业科技有限公司'
},
{
name:'东方希望农业科技有限公司'
}
]
}
]
};
		function click(e){
			console.log(e)
		}
		function letterClick(e){		
    		console.log(e)
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
{/* <View amtype="ScrollView" style={{flex:1}}> */}
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
   SectionListContacts 通讯录
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
   属性:
  </Text>
 </View>
 <View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
  <Text style={{ fontSize : px2rn(16) }}>
   sectionListData属性->数据
  </Text>
 </View>
 <View>
  <Text>
   searchBtnStyles属性->搜索框提交按钮样式（background-color:green）
  </Text>
 </View>

 <View>
  <Text>
   isShowSearchCell属性->是否展示搜索框（true/false 当前是true）
  </Text>
 </View>
 <View>
  <Text>
   showAlphabet属性->是否显示右侧的字母栏（true/false 当前是true）
  </Text>
 </View>
 <View>
  <Text>
   scrollAnimation属性->是否显示动画效果（true/false 当前是true）
  </Text>
 </View>
 <View>
  <Text>
   isAllowLowerCase属性->是否对大小写敏感（true/false 当前是true）
  </Text>
 </View>
 <View>
  <Text>
   letterViewStyle属性->右侧字母表样式（background-color:rgba(0,0,0,0.5);overflow:auto）
  </Text>
 </View>
 <View style={{flex: 1}}>
 <SectionListContacts amtype="SectionListContacts" sectionListData={amVAR.data} searchBtnStyles="background-color:green" letterClick={($event)=>letterClick($event)} isShowSearchCell="true" showAlphabet="true" letterViewStyle={{ backgroundColor :"rgba(0, 0, 0, 0.5)", overflow :"scroll"}} isAllowLowerCase="true" scrollAnimation="true" cell={(info)=><React.Fragment>
 <View amtype="SectionListContacts.Cell"> 
  <TouchView amtype="TouchView" style={{ display :"flex" ,height:px2rn(50), paddingLeft : px2rn(20) , lineHeight : px2rn(30) , borderBottomWidth : px2rn(1) , borderBottomColor :"rgb(182, 182, 184)"}} click="click($event,info)" key="{key+index}" onClick={($event)=>click($event,info)}> 
   <Text>
     {info&&info.name} 
   </Text> 
  </TouchView> 
 </View>
</React.Fragment>} renderHeader={(info)=><React.Fragment>
 <View amtype="SectionListContacts.RenderHeader" style={{ backgroundColor :"rgb(182, 182, 184)"}}> 
  <View style={{   marginLeft : px2rn(16) ,height:px2rn(25) ,justifyContent :"center"}}> 
   <Text>
     {info&&info.key} 
   </Text> 
  </View> 
 </View>
</React.Fragment>}></SectionListContacts>
</View>
 </View>  
);
  }
}
