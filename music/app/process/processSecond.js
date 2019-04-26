/**
 *    Revision    History:
 *     Initial:    2019/04/26          Author:   Wang Huajian
 *     简短介绍:  此页加入了组件 FlatList，渲染长列表，从api请求的全部数据，渲染出来。
 *     主要是 FlatList 的三个属性，data、renderItem、keyExtractor。
 *     data: 是列表的数据源
 *     renderItem: 从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。当然也可以是个函数，在函数中我们return 一个写好格式的组件即可。
 *     keyExtractor: 此函数用于为给定的item生成一个不重复的key。
 *                   Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
 *                   若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标。 
 */

import React from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';

var movie_api = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

export default class processSecond extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // movies: null,
      data: [],
      loaded: false
    }
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(movie_api)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: this.state.data.concat(responseData.movies),
          loaded: true
        })
      })
  }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

      // var movie = this.state.movies[0];
      // return this.renderMovie(movie);
      return (
        <FlatList
          data={this.state.data}
          renderItem={this.renderMovie}
          style={styles.list}
          keyExtractor={item => item.id}
        />
      );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载电影数据……
        </Text>
      </View>
    );
  }

  renderMovie({ item }) {
    return (
      <View style={styles.container}>
        <Image source={{uri: item.posters.thumbnail}}  style={styles.image}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style ={styles.year}>{item.year}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 120,
    height: 160
  },
  rightContainer: {
    flex: 1,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  }
});
