import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import ScrollView from 'cap4m/lib/ScrollView';
import Button from 'cap4m/lib/Button';
// import Charts from 'cap4m/lib/Charts';
import Charts from '../../src/component/Charts';
import WhiteSpace from 'cap4m/lib/WhiteSpace';

import ProxyFill from 'cap4m-observe';
import _ from 'lodash';
let $Page = {};
var amVAR = {};
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
let { width, height } = Dimensions.get('window')
var amVAR = {
	charts_radar: {
		title: {
			text: '基础雷达图'
		},
		tooltip: {
		},
		legend: {
			data: [
				'预算分配（Allocated Budget）',
				'实际开销（Actual Spending）'
			]
		},
		radar: {
			name: {
				textStyle: {
					color: '#fff',
					backgroundColor: '#999',
					borderRadius: 3,
					padding: [
						3,
						5
					]
				}
			},
			indicator: [
				{
					name: '销售（sales）',
					max: 6500
				},
				{
					name: '管理（Administration）',
					max: 16000
				},
				{
					name: '信息技术（Information Techology）',
					max: 30000
				},
				{
					name: '客服（Customer Support）',
					max: 38000
				},
				{
					name: '研发（Development）',
					max: 52000
				},
				{
					name: '市场（Marketing）',
					max: 25000
				}
			]
		},
		series: [
			{
				name: '预算 vs 开销（Budget vs spending）',
				type: 'radar',
				data: [
					{
						value: [
							4300,
							10000,
							28000,
							35000,
							50000,
							19000
						],
						name: '预算分配（Allocated Budget）'
					},
					{
						value: [
							5000,
							14000,
							28000,
							31000,
							42000,
							21000
						],
						name: '实际开销（Actual Spending）'
					}
				]
			}
		]
	}
};
function setData() {
	var data = {
		title: { text: '折线图堆叠', x: 'center' },
		tooltip: { trigger: 'axis' },
		legend: {
			data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
		},
		grautoref: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name: '邮件营销',
				type: 'line',
				stack: '总量',
				data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
				name: '联盟广告',
				type: 'line',
				stack: '总量',
				data: [220, 182, 191, 234, 290, 330, 310]
			},
			{
				name: '视频广告',
				type: 'line',
				stack: '总量',
				data: [150, 232, 201, 154, 190, 330, 410]
			},
			{
				name: '直接访问',
				type: 'line',
				stack: '总量',
				data: [320, 332, 301, 334, 390, 330, 320]
			},
			{
				name: '搜索引擎',
				type: 'line',
				stack: '总量',
				data: [820, 932, 901, 934, 1290, 1330, 1320]
			}
		]
	};
	$Charts("_Charts").setOption(data, 'dark');
}
let _amVAR = _.cloneDeep(amVAR)
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
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
	componentDidMount() {
		window.onload && window.onload();
		$Page.didMount && $Page.didMount();
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView amtype="ScrollView">
					<View style={{ marginTop: px2rn(20), fontSize: px2rn(16), fontWeight: "700" }}>
						<Text style={{ fontSize: px2rn(16), fontWeight: "700" }}>
							Charts 图表
  </Text>
					</View>
					<View style={{ marginTop: px2rn(20), fontSize: px2rn(16), fontWeight: "700", color: "blue" }}>
						<Text style={{ fontSize: px2rn(16), fontWeight: "700", color: "blue" }}>
							内置方法：
  </Text>
					</View>
					<View style={{ marginTop: px2rn(20), fontSize: px2rn(16) }}>
						<Text style={{ fontSize: px2rn(16) }}>
							setOption方法
  </Text>
					</View>
					<Charts amtype="Charts" height={400} width={400} option={this.state.charts_radar} id="_Charts" autoref="_Charts" ref="__Charts"></Charts>
					<WhiteSpace amtype="WhiteSpace"></WhiteSpace>
					<Button amtype="Button" type="primary" text="setOption方法" click="setData()" onClick={($event) => setData()}></Button>
				</ScrollView>
			</View>);
	}
}
