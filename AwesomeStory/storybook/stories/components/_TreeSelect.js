import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import TreeSelect from 'cap4m/lib/TreeSelect';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
function onPressCollapse(e){
	    	console.log(e)
	    }
	    function init(){
	    	$TreeSelect("TreeSelect").setData(amVAR.data2);
	    }
		var amVAR = {
		data2: [
        {
            "id": "21010000",
            "name": "初始化的1层",
            "children": [{
                "id": "12100000",
                "name": "初始化的2层",
                "children": [
                    {
                        "id": "117022",
                        "name": "3层",
                        
                        "phone": "135070249752222",
                           "icon":"../image/cap4m_qd.png", 
                        "children": [{
                            "id": "11702",
                            "name": "4层",
                        }]                             
                    },
                    {
                        "id": "117022",
                        "name": "并列3层",  
                        "phone": "13507024975",
                           "icon": require("../image/cap4m_qd.png"),                              
                    },
                ],
                },
                {
                    "id": "12100000",
                    "name": "2层",
                    "children": [
                        {
                            "id": "117022",
                            "name": "叶志刚",
                            
                            "phone": "13507024975",
                            // "icon": require("../../components/TreeSelect/images/person_image.png"),                              
                        },
                        {
                            "id": "117022",
                            "name": "叶志刚12",
                           
                            "phone": "13507024975",
                            // "icon": require("../../components/TreeSelect/images/person_image.png"),                              
                        },
                    ],
                },
            ]
        },
        {
            "id": "2101000",
            "name": "并列第1层",
            "children": [
                {
                    "id": "12100000",
                    "name": "并列1层分支",
                    "children": [
                        {
                            "id": "117022",
                            "name": "叶志刚2",
                            
                            "phone": "13507024975",
                            // "icon": require("../../components/TreeSelect/images/person_image.png"),
                            
                        },
                        {
                          "id": "117022",
                          "name": "叶志刚2",                    
                          "phone": "13507024975",
                          // "icon": require("../../components/TreeSelect/images/person_image.png"),
                          
                      },
                      ],
                },
            ]
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
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700"}}>
 <Text style={{ fontSize : px2rn(16) , fontWeight :"700"}}>
  TreeSelect 树状列表 
 </Text>
</View>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
 <Text style={{ fontSize : px2rn(16) , fontWeight :"700", color :"blue"}}>
  内置方法:
 </Text>
</View>
<View style={{ marginTop : px2rn(20) , fontSize : px2rn(16) }}>
 <Text style={{ fontSize : px2rn(16) }}>
  init方法->初始化
 </Text>
</View>
<TreeSelect amtype="TreeSelect" id={'TreeSelect'} init={($event)=>init()} selectedBackgroudColor="red" selectedColor="#0f0" selectedFontSize={20} onPressCollapse={($event)=>onPressCollapse($event)} type="contact" autoref={'TreeSelect'} ref={'_'+'TreeSelect'}></TreeSelect>    
</View>);
  }
}
