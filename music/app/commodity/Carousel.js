/**
 *   Revision   History:
 *      Initial:         2019/04/24       Author:  Wang  Huajian
 *      简短介绍 此页是轮播图，供index.js引用。
 */

import React from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions, TouchableHighlight, Alert } from 'react-native';

const circleSize = 8;
const circleMargin = 5;

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      currentPage: 0,
      imageArray: [
        {
          uri: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },{
          uri: 'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },{
          uri: 'https://images.pexels.com/photos/709817/pexels-photo-709817.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }, {
          uri: 'https://images.pexels.com/photos/1426191/pexels-photo-1426191.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
      ]
    };
  }

  componentDidMount() {
    this._startTimer()              // 页面渲染完成后调用定时器
  }

  componentWillUnmount() {
    clearInterval(this.interval)   // 清除定时器
  }

  _startTimer () {
    this.interval = setInterval(() => {
      nextPage = this.state.currentPage + 1;
      if (nextPage >= 4) {
        nextPage = 0
      };
      this.setState({currentPage: nextPage});
      const offSetX = nextPage * Dimensions.get('screen').width;
      this.refs.scrollView.scrollTo({x: offSetX, y: 0, animated: true});  // 调用ScrollView组件的实例方法scrollTo
    }, 2000)
  }

  render() {
    
    const advertisementCount = this.state.imageArray.length; // 指示器圆点的个数
    const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount * 2; // 计算指示器的宽度
    const left = (Dimensions.get('screen').width - indicatorWidth) / 2; // 计算指示器最左边的位置图标

    return (
      <View style={styles.advertisement}>
        <ScrollView ref='scrollView' horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
          {this.state.imageArray.map((advertisements, index) => {
            return (
              <TouchableHighlight key={index} onPress={() => {Alert.alert('你点击了轮播图', null, null)}}>
                <Image style={styles.image} source={{uri: advertisements.uri}} />
              </TouchableHighlight>
            )
          })}
        </ScrollView>

        <View style={[styles.indicator, {left: left}]}>
          {this.state.imageArray.map((advertisements ,item) => {
            return (
              <View
                key={item}
                style={(item === this.state.currentPage) ? styles.circleSelected : styles.circle}
              />
            )
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  advertisement: {
    marginTop: 5,
    height: 180
  },
  image: {
    width: Dimensions.get('screen').width,
    height: 180
  },
  indicator: {
    position: 'absolute',
    top: 160,
    flexDirection: 'row'
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'gray',
    marginHorizontal: circleMargin // 相当于同时设置 marginLeft 和 marginRight
  },
  circleSelected: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'white',
    marginHorizontal: circleMargin
  }
});
