/**
 * Revision History
 *    Initial:     2019/04/23         Wang Huajian
 */

import React from 'react';
import { View, StyleSheet, TextInput, Button, Platform, ScrollView, Dimensions, Image } from 'react-native';

export default class Commodity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    }
  }

  componentDidMount() {
    this._startTimer(); // 待页面渲染完后 启动定时器。这也是组件生命周期的一部分
  }

  componentWillUnmount() {
    clearInterval(this.interval); // 卸载组件时，销毁定时器
  }

  _startTimer() {
    this.interval = setInterval(() => {
      nextPage = this.state.currentPage + 1;
      if (nextPage >= 3) {
        nextPage = 0;
      }
      this.setState({currentPage: nextPage});
      const offSetX = nextPage * Dimensions.get('screen').width;
      this.refs.scrollView.scrollTo({x: offSetX, y: 0, animated: true});
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.searchbar}>
          <TextInput style={styles.input} placeholder='搜索商品'></TextInput>
          <Button style={styles.button} title='搜索'></Button>
        </View>

        <View style={styles.advertisement}>
           <ScrollView ref='scrollView' horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
             <Image style={styles.image} source={{uri: 'https://images.pexels.com/photos/2110937/pexels-photo-2110937.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}} />
             <Image style={styles.image} source={{uri: 'https://images.pexels.com/photos/2120084/pexels-photo-2120084.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}/>
             <Image style={styles.image} source={{uri: 'https://images.pexels.com/photos/2118174/pexels-photo-2118174.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}/>
           </ScrollView>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchbar: {
    marginTop: Platform.OS === 'ios' ? 36 : 0, // ios、android 对状态栏的处理方式不同 
    height: 40,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10
  },
  button: {
    flex: 1
  },
  advertisement: {
    marginTop: 5,
    height: 180
  },
  image: {
    width: Dimensions.get('screen').width,
    height: 180
  }
});