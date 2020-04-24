import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
import WingBlank from 'cap4m/lib/WingBlank';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page ={};
var amVAR = {};
const px2rn = px=>PixelRatio.roundToNearestPixel(px);
const rem2rn = rem=>px2rn(rem*16);
let {width, height } = Dimensions.get('window')
var amVAR = {};
		function scrollView() {
			$Router.load('ScrollView');
		}
		
		
		function _Tabs() {
			$Router.load('_Tabs');
		}
		function _TabBar() {
			$Router.load('_TabBar');
		}
		function _NavBar() {
			$Router.load('_NavBar');
		}
		function _MenuList() {
			$Router.load('_MenuList');
		}
		function _InputItem() {
			$Router.load('_InputItem');
		}
		function _Image() {
			$Router.load('_Image');
		}
		function _Drawer() {
			$Router.load('_Drawer');
		}
		function _DatePicker() {
			$Router.load('_DatePicker');
		}
		function _CheckBox() {
			$Router.load('_CheckBox');
		}
		function _Calendar() {
			$Router.load('_Calendar');
		}
		function _Button() {
			$Router.load('_Button');
		}
		function wingBlank() {
			$Router.load('WingBlank');
		}
		function whiteSpace() {
			$Router.load('WhiteSpace');
		}

		function Tabs() {
			$Router.load('Tabs');
		}
		function TabBar() {
			$Router.load('TabBar');
		}
		function NavBar() {
			$Router.load('NavBar');
		}
		function MenuList() {
			$Router.load('MenuList');
		}
		function InputItem() {
			$Router.load('InputItem');
		}
		function Image() {
			$Router.load('Image');
		}
		function Drawer() {
			$Router.load('Drawer');
		}
		function DatePicker() {
			$Router.load('DatePicker');
		}
		function CheckBox() {
			$Router.load('CheckBox');
		}
		function Calendar() {
			$Router.load('Calendar');
		}
		function button() {
			$Router.load('Button');
		}

		function NoticeBar() {
			$Router.load('NoticeBar');
		}
		function Label() {
			$Router.load('Label');
		}
		function List() {
			$Router.load('List');
		}
		function Icon() {
			$Router.load('Icon');
		}
		function Grid() {
			$Router.load('Grid');
		}
		function Dialog() {
			$Router.load('Dialog');
		}
		function CircleProgress() {
			$Router.load('CircleProgress');
		}
		function Charts() {
			$Router.load('Charts');
		}
		function CategoryList() {
			$Router.load('CategoryList');
		}
		function Carousel() {
			$Router.load('Carousel');
		}
		function Accordion() {
			$Router.load('Accordion');
		}
		function TextareaItem() {
			$Router.load('TextareaItem');
		}
		function Switch() {
			$Router.load('Switch');
		}
		function Stepper() {
			$Router.load('Stepper');
		}
		function Secret() {
			$Router.load('Secret');
		}
		
		function FormItem() {
			$Router.load('FormItem');
		}
		function ListView() {
			$Router.load('ListView');
		}
		function Progress() {
			$Router.load('Progress');
		}
		function SectionList() {
			$Router.load('SectionList');
		}
		function Steps() {
			$Router.load('Steps');
		}
		function Template() {
			$Router.load('Template');
		}
		
		function LinearGradient() {
			$Router.load('LinearGradient');
		}
		function Toast() {
			$Router.load('Toast');
		}
		function TouchView() {
			$Router.load('TouchView');
		}
		function WebView() {
			$Router.load('WebView');
		}
		function Tag() {
			$Router.load('Tag');
		}
		function Modal() {
			$Router.load('Modal');
		}
		
		function NoticeBar() {
			$Router.load('NoticeBar');
		}
		function SearchBar() {
			$Router.load('SearchBar');
		}
		function Radio() {
			$Router.load('Radio');
		}
		function Picker() {
			$Router.load('Picker');
		}
		
		function _ListView() {
			$Router.load('_ListView');
		}
		function _Progress() {
			$Router.load('_Progress');
		}
		function _SectionList() {
			$Router.load('_SectionList');
		}
		function _Steps() {
			$Router.load('_Steps');
		}
		function _Template() {
			$Router.load('_Template');
		}
		function _NoticeBar() {
			$Router.load('_NoticeBar');
		}
		function _Label() {
			$Router.load('_Label');
		}
		function _Grid() {
			$Router.load('_Grid');
		}
		function _CircleProgress() {
			$Router.load('_CircleProgress');
		}
		function _Charts() {
			$Router.load('_Charts');
		}
		function _CategoryList() {
			$Router.load('_CategoryList');
		}
		function _TextareaItem() {
			$Router.load('_TextareaItem');
		}
		function _Switch() {
			$Router.load('_Switch');
		}
		function _Stepper() {
			$Router.load('_Stepper');
		}
		function _Secret() {
			$Router.load('_Secret');
		}
		function _Picker() {
			$Router.load('_Picker');
		}
		function _SearchBar() {
			$Router.load('_SearchBar');
		}
		function _Radio() {
			$Router.load('_Radio');
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
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="scrollView()" amtype="Button" text="ScrollView" type="primary" onClick={($event)=>scrollView()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="NoticeBar()" amtype="Button" text="NoticeBar" type="primary" onClick={($event)=>NoticeBar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Label()" amtype="Button" text="Label" type="primary" onClick={($event)=>Label()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="List()" amtype="Button" text="List" type="primary" onClick={($event)=>List()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Icon()" amtype="Button" text="Icon" type="primary" onClick={($event)=>Icon()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Grid()" amtype="Button" text="Grid" type="primary" onClick={($event)=>Grid()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Dialog()" amtype="Button" text="Dialog" type="primary" onClick={($event)=>Dialog()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="CircleProgress()" amtype="Button" text="CircleProgress" type="primary" onClick={($event)=>CircleProgress()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Charts()" amtype="Button" text="Charts" type="primary" onClick={($event)=>Charts()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="CategoryList()" amtype="Button" text="CategoryList" type="primary" onClick={($event)=>CategoryList()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Carousel()" amtype="Button" text="Carousel" type="primary" onClick={($event)=>Carousel()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Accordion()" amtype="Button" text="Accordion" type="primary" onClick={($event)=>Accordion()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="TextareaItem()" amtype="Button" text="TextareaItem" type="primary" onClick={($event)=>TextareaItem()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Switch()" amtype="Button" text="Switch" type="primary" onClick={($event)=>Switch()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Stepper()" amtype="Button" text="Stepper" type="primary" onClick={($event)=>Stepper()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Secret()" amtype="Button" text="Secret" type="primary" onClick={($event)=>Secret()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="FormItem()" amtype="Button" text="FormItem" type="primary" onClick={($event)=>FormItem()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="ListView()" amtype="Button" text="ListView" type="primary" onClick={($event)=>ListView()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Progress()" amtype="Button" text="Progress" type="primary" onClick={($event)=>Progress()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="SectionList()" amtype="Button" text="SectionList" type="primary" onClick={($event)=>SectionList()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Steps()" amtype="Button" text="Steps" type="primary" onClick={($event)=>Steps()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Template()" amtype="Button" text="Template" type="primary" onClick={($event)=>Template()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="LinearGradient()" amtype="Button" text="LinearGradient" type="primary" onClick={($event)=>LinearGradient()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Toast()" amtype="Button" text="Toast" type="primary" onClick={($event)=>Toast()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="TouchView()" amtype="Button" text="TouchView" type="primary" onClick={($event)=>TouchView()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="WebView()" amtype="Button" text="WebView" type="primary" onClick={($event)=>WebView()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Tag()" amtype="Button" text="Tag" type="primary" onClick={($event)=>Tag()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Modal()" amtype="Button" text="Modal" type="primary" onClick={($event)=>Modal()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="NoticeBar()" amtype="Button" text="NoticeBar" type="primary" onClick={($event)=>NoticeBar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="SearchBar()" amtype="Button" text="SearchBar" type="primary" onClick={($event)=>SearchBar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Radio()" amtype="Button" text="Radio" type="primary" onClick={($event)=>Radio()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Picker()" amtype="Button" text="Picker" type="primary" onClick={($event)=>Picker()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_FormItem()" amtype="Button" text="_FormItem方法" type="primary" onClick={($event)=>_FormItem()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_ListView()" amtype="Button" text="_ListView方法" type="primary" onClick={($event)=>_ListView()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Progress()" amtype="Button" text="_Progress方法" type="primary" onClick={($event)=>_Progress()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_SectionList()" amtype="Button" text="_SectionList方法" type="primary" onClick={($event)=>_SectionList()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Steps()" amtype="Button" text="_Steps方法" type="primary" onClick={($event)=>_Steps()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Template()" amtype="Button" text="_Template方法" type="primary" onClick={($event)=>_Template()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_NoticeBar()" amtype="Button" text="_NoticeBar方法" type="primary" onClick={($event)=>_NoticeBar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Label()" amtype="Button" text="_Label方法" type="primary" onClick={($event)=>_Label()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Grid()" amtype="Button" text="_Grid方法" type="primary" onClick={($event)=>_Grid()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_CircleProgress()" amtype="Button" text="_CircleProgress方法" type="primary" onClick={($event)=>_CircleProgress()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Charts()" amtype="Button" text="_Charts方法" type="primary" onClick={($event)=>_Charts()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_CategoryList()" amtype="Button" text="_CategoryList方法" type="primary" onClick={($event)=>_CategoryList()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_TextareaItem()" amtype="Button" text="_TextareaItem方法" type="primary" onClick={($event)=>_TextareaItem()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Switch()" amtype="Button" text="_Switch方法" type="primary" onClick={($event)=>_Switch()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Stepper()" amtype="Button" text="_Stepper方法" type="primary" onClick={($event)=>_Stepper()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Secret()" amtype="Button" text="_Secret方法" type="primary" onClick={($event)=>_Secret()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Picker()" amtype="Button" text="_Picker方法" type="primary" onClick={($event)=>_Picker()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_SearchBar()" amtype="Button" text="_SearchBar方法" type="primary" onClick={($event)=>_SearchBar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Radio()" amtype="Button" text="_Radio方法" type="primary" onClick={($event)=>_Radio()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="button()" amtype="Button" text="Button" type="primary" onClick={($event)=>button()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Calendar()" amtype="Button" text="Calendar" type="primary" onClick={($event)=>Calendar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="CheckBox()" amtype="Button" text="CheckBox" type="primary" onClick={($event)=>CheckBox()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="DatePicker()" amtype="Button" text="DatePicker" type="primary" onClick={($event)=>DatePicker()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Drawer()" amtype="Button" text="Drawer" type="primary" onClick={($event)=>Drawer()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Image()" amtype="Button" text="Image" type="primary" onClick={($event)=>Image()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="InputItem()" amtype="Button" text="InputItem" type="primary" onClick={($event)=>InputItem()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="MenuList()" amtype="Button" text="MenuList" type="primary" onClick={($event)=>MenuList()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="NavBar()" amtype="Button" text="NavBar" type="primary" onClick={($event)=>NavBar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="TabBar()" amtype="Button" text="TabBar" type="primary" onClick={($event)=>TabBar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="Tabs()" amtype="Button" text="Tabs" type="primary" onClick={($event)=>Tabs()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="whiteSpace()" amtype="Button" text="WhiteSpace" type="primary" onClick={($event)=>whiteSpace()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="wingBlank()" amtype="Button" text="WingBlank" type="primary" onClick={($event)=>wingBlank()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Button()" amtype="Button" text="_Button方法" type="primary" onClick={($event)=>_Button()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Calendar()" amtype="Button" text="_Calendar方法" type="primary" onClick={($event)=>_Calendar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_CheckBox()" amtype="Button" text="_CheckBox方法" type="primary" onClick={($event)=>_CheckBox()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_DatePicker()" amtype="Button" text="_DatePicker方法" type="primary" onClick={($event)=>_DatePicker()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Drawer()" amtype="Button" text="_Drawer方法" type="primary" onClick={($event)=>_Drawer()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Image()" amtype="Button" text="_Image方法" type="primary" onClick={($event)=>_Image()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_InputItem()" amtype="Button" text="_InputItem方法" type="primary" onClick={($event)=>_InputItem()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_MenuList()" amtype="Button" text="_MenuList方法" type="primary" onClick={($event)=>_MenuList()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_NavBar()" amtype="Button" text="_NavBar方法" type="primary" onClick={($event)=>_NavBar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_TabBar()" amtype="Button" text="_TabBar方法" type="primary" onClick={($event)=>_TabBar()}></Button>
 </WingBlank>
 <WhiteSpace amtype="WhiteSpace"></WhiteSpace>
 <WingBlank amtype="WingBlank" size="lg">
  <Button click="_Tabs()" amtype="Button" text="_Tabs方法" type="primary" onClick={($event)=>_Tabs()}></Button>
 </WingBlank>
</ScrollView>    
</View>);
  }
}
