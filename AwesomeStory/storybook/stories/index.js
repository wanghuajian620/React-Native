import React from 'react';
import {storiesOf} from '@storybook/react-native';
window.$instanceMap = new Map();

import WhiteSpace from './components/WhiteSpace';
import WingBlank from './components/WingBlank';
import Drawer from './components/Drawer';
import MenuList from './components/MenuList';
import _MenuList from './components/_MenuList';
import NavBar from './components/NavBar';
import _NavBar from './components/_NavBar';
import Tabs from './components/Tabs';
import _Tabs from './components/_Tabs';
import TabBar from './components/TabBar';
import _TabBar from './components/_TabBar'
import Button from './components/Button';
import _Button from './components/_Button';
import Calendar from './components/Calendar';
import _Calendar from './components/_Calendar';
import CheckBox from './components/CheckBox';
import _CheckBox from './components/_CheckBox';
import DatePicker from './components/DatePicker';
import _DatePicker from './components/_DatePicker';
import Radio from './components/Radio';
import _Radio from './components/_Radio';
import Secret from './components/Secret';
import _Secret from './components/_Secret';
import Picker from './components/Picker';
import _Picker from './components/_Picker';
import ShaInput from './components/ShaInput';
import Stepper from './components/Stepper';
import _Stepper from './components/_Stepper';

import Switch from './components/Switch';
import _Switch from './components/_Switch';
import TextareaItem from './components/TextareaItem';
import _TextareaItem from './components/_TextareaItem';
import Accordion from './components/Accordion';
import _InputItem from './components/_InputItem';
import InputItem from './components/InputItem';
import SearchBar from './components/SearchBar';
import _SearchBar from './components/_SearchBar';
import Image from './components/Image';
import _Image from './components/_Image';
import Carousel from './components/Carousel';
import CategoryList from './components/CategoryList';
import _CategoryList from './components/_CategoryList';
import Charts from './components/Charts';
import _Charts from './components/_Charts';
import CircleProgress from './components/CircleProgress';
import _CircleProgress from './components/_CircleProgress';
import Dialog from './components/Dialog';
import Icon from './components/Icon';
import List from './components/List';
import Label from './components/Label';
import _Label from './components/_Label';
import NoticeBar from './components/NoticeBar';
import _NoticeBar from './components/_NoticeBar';
import ScrollView from './components/ScrollView';
import _ScrollView from './components/_ScrollView';
import Steps from './components/Steps';
import _Steps from './components/_Steps';
import Tag from './components/Tag';
 import _Tag from './components/_Tag';
import Template from './components/Template';
import _Template from './components/_Template';
import TouchView from './components/TouchView';
import ActionSheet from './components/ActionSheet';
import Modal from './components/Modal';
import Progress from './components/Progress';
import _Progress from './components/_Progress';
import Toast from './components/Toast';
import Grid from './components/Grid';
import _Grid from './components/_Grid';
import ListView from './components/ListView';
import _ListView from './components/_ListView';
import FormItem from './components/FormItem';
import _FormItem from './components/_FormItem';
import SectionList from './components/SectionList';
import _SectionList from './components/_SectionList';
import WebView from './components/WebView';
import LinearGraient from './components/LinearGradient';
import ActivityIndicator from './components/ActivityIndicator';
import SectionListContacts from './components/SectionListContacts';
import _SectionListContacts from './components/_SectionListContacts';
import TreeSelect from './components/TreeSelect';
import _TreeSelect from './components/_TreeSelect';

storiesOf('WhiteSpace 上下留白', module)
  .add('属性', () => (
    <WhiteSpace ></WhiteSpace>
  ));

storiesOf('WingBlank 两翼留白', module)
  .add('属性', () => (
    <WingBlank ></WingBlank>
  ));

storiesOf('Drawer 抽屉', module)
  .add("属性", () => (
    <Drawer></Drawer>
  ))


storiesOf('MenuList 菜单', module)
  .add("属性", () => (
    <MenuList ></MenuList>
  ))
  .add("内置方法", () => (
    <_MenuList ></_MenuList>
  ));

storiesOf('NavBar 导航栏', module)
  .add("属性", () => (
    <NavBar></NavBar>
  ))
  .add("内置方法", () => (
    <_NavBar ></_NavBar>
  ));

storiesOf('Tabs 标签页', module)
  .add("属性", () => (
    <Tabs></Tabs>
  ))
  .add("内置方法", () => (
    <_Tabs></_Tabs>
  ));

storiesOf('TabBar 标签栏', module)
  .add("属性", () => (
   
      <TabBar></TabBar>
    

  ))
  .add("内置方法", () => (
   
    <_TabBar></_TabBar>
  

));

storiesOf('Button 按钮', module)
  .add("属性", () => (
    <Button></Button>

  ))
  .add("内置方法", () => (
    <_Button></_Button>

  ));


storiesOf('Calendar 日历', module)
  .add("属性", () => (
    <Calendar></Calendar>

  ))
  .add("内置方法", () => (
    <_Calendar></_Calendar>

  ));

storiesOf('CheckBox 复选框', module)
  .add("属性", () => (
    <CheckBox></CheckBox>

  ))
  .add("内置方法", () => (
    <_CheckBox></_CheckBox>

  ));

storiesOf('DatePicker 日期选择', module)
  .add("属性", () => (
    <DatePicker></DatePicker>

  ))
  .add("内置方法", () => (
    <_DatePicker></_DatePicker>

  ));

  storiesOf('Image 图片', module)
  .add("属性", () => (
   <Image></Image>

  ))
  .add("内置方法", () => (
    <_Image></_Image>
 
   ));
  

storiesOf('InputItem 文本输入框', module)
  .add("属性", () => (
    <InputItem></InputItem>

  ))
  .add("内置方法", () => (
    <_InputItem></_InputItem>

  ));
  
storiesOf('Picker 选择器', module)
  .add("属性", () => (
    <_Picker></_Picker>

  ))
  .add("内置方法", () => (
    <Picker></Picker>

  ));

storiesOf('Radio 单选框', module)
  .add("属性", () => (
    <Radio></Radio>

  ))
  .add("内置方法", () => (
    <_Radio></_Radio>
  ));

  storiesOf('SearchBar 搜索栏', module)
  .add("属性", () => (
    <SearchBar></SearchBar>
  ))
  .add("内置方法", () => (
    <_SearchBar></_SearchBar>
  ));

storiesOf('Secret 安全显示', module)
  .add("属性", () => (
    <Secret></Secret>
  ))
  .add("内置方法", () => (
    <_Secret></_Secret>
  ));

storiesOf('ShaInput 密码加密组件', module)
  .add("属性", () => (
    <ShaInput></ShaInput>

  ))


storiesOf('Stepper 步进器', module)
  .add("属性", () => (
    <Stepper></Stepper>
  ))
  .add("内置方法", () => (
    <_Stepper></_Stepper>
  ));

storiesOf('Switch 滑动开关', module)
  .add("属性", () => (
    <Switch></Switch>
  ))
  .add("内置方法", () => (
    <_Switch></_Switch>
  ));

storiesOf('TextareaItem 多行输入框', module)
  .add("属性", () => (
    <TextareaItem></TextareaItem>

  ))
  .add("内置方法", () => (
    <_TextareaItem></_TextareaItem>

  ));

storiesOf('Accordion 手风琴', module)
  .add("属性", () => (
    <Accordion></Accordion>

  ));

  storiesOf('Carousel 走马灯', module) 
  .add("属性", () => (
    <Carousel></Carousel>
    
  ));
   
  storiesOf('CategoryList 菜单分栏', module) 
  .add("属性", () => (
    <CategoryList></CategoryList>
  ))
  .add("内置方法", () => (
    <_CategoryList></_CategoryList>
  ));
  
  storiesOf('Charts 图表', module) 
  .add("属性", () => (
    <Charts></Charts>
  ))
  .add("内置方法", () => (
    <_Charts></_Charts>
  ));
  
  storiesOf('CircleProgress 圆形进度条', module) 
  .add("属性", () => (
    <CircleProgress></CircleProgress>
  ))
  .add("内置方法", () => (
    <_CircleProgress></_CircleProgress>
  ));
  
  storiesOf('Dialog弹出窗口', module) 
  .add("内置方法", () => (
    <Dialog></Dialog>
  ));
  
  storiesOf('Grid宫格', module) 
  .add("属性", () => (
    <Grid></Grid>
  ))
  .add("内置方法", () => (
    <_Grid></_Grid>
  ));
  
  
  
  storiesOf('Icon 图标', module) 
  .add("属性", () => (
    <Icon></Icon>
  ));
  
  
  storiesOf('List列表', module) 
  .add("属性", () => (
    <List></List>
  ));
  
  storiesOf('Label标签', module) 
  .add("属性", () => (
    <Label></Label>
  ))
  .add("内置方法", () => (
    <_Label></_Label>
  ));
  
  
  storiesOf('NoticeBar通告栏', module) 
  .add("属性", () => (
    <NoticeBar></NoticeBar>
  ))
  .add("内置方法", () => (
    <_NoticeBar></_NoticeBar>
  ));
  
  
  storiesOf('ScrollView滚动条', module) 
  .add("属性", () => (
    <ScrollView></ScrollView>
  ))
  .add("内置方法", () => (
    <_ScrollView></_ScrollView>
  ));
  
  
  storiesOf('Steps步骤条', module) 
  .add("属性", () => (
    <Steps></Steps>
  ))
  .add("内置方法", () => (
    <_Steps></_Steps>
  ));
  
  
  storiesOf('Tag标签', module) 
  .add("属性", () => (
    <Tag></Tag>
  ))
  .add("内置方法", () => (
    <_Tag></_Tag>
  ));
  
  storiesOf('Template模板组件', module) 
  .add("属性", () => (
    <Template></Template>
  ))
  .add("内置方法", () => (
    <_Template></_Template>
  ));
  
  storiesOf('TouchView点击事件容器', module) 
  .add("属性", () => (
    <TouchView></TouchView>
  ));
  
  storiesOf('ActionSheet动作面板', module) 
  .add("属性", () => (
    <ActionSheet></ActionSheet>
  ));
  
  
  storiesOf('Modal对话框', module) 
  .add("属性", () => (
    <Modal></Modal>
  ));
  
  storiesOf('Progress进度条', module) 
  .add("属性", () => (
    <Progress></Progress>
  ))
  .add("内置方法", () => (
    <_Progress></_Progress>
  ));
  
  storiesOf('Toast轻提示', module) 
  .add("属性", () => (
    <Toast></Toast>
  ));

  storiesOf('ListView长列表', module) 
  .add("属性", () => (
    <ListView></ListView>
  ))
  .add("内置方法", () => (
    <_ListView></_ListView>
  ));

  storiesOf('FormItem动态表单', module)
  .add('属性', () => (
    <FormItem></FormItem>
  ))
  .add('内置方法', () => (
    <_FormItem></_FormItem>
  ));

  storiesOf('SectionList', module)
  .add('属性', () => (
    <SectionList></SectionList>
  ))
  .add('内置方法', () => (
    <_SectionList></_SectionList>
  ));

  storiesOf('WebView', module)
  .add('属性', () => (
    <WebView></WebView>
  ));

  storiesOf('LinearGraient', module)
  .add('属性', () => (
    <LinearGraient></LinearGraient>
  ));

  storiesOf('ActivityIndicator指示器', module) 
  .add("属性", () => (
    <ActivityIndicator></ActivityIndicator>
  ));
  
  storiesOf('SectionListContacts通讯录', module) 
  .add("属性", () => (
    <SectionListContacts></SectionListContacts>
  ))
  .add("内置方法", () => (
    <_SectionListContacts></_SectionListContacts>
  ));

  storiesOf('TreeSelect通讯录', module) 
  .add("属性", () => (
    <TreeSelect></TreeSelect>
  ))
  .add("内置方法", () => (
    <_TreeSelect></_TreeSelect>
  ));