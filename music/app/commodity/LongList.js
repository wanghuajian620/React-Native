/**
 *    Revision    History:
 *     Initial:    2019/04/26          Author:   Wang Huajian
 *     简短介绍: 此页是长列表 FlatList 以及 RefreshControl 的详细使用
 */

import React from 'react';
import { View, Image, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

var movie_api = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

export default class LongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      isRefreshing: false
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
      // return this.renderLoadingView();
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
          <Text>
            正在加载电影数据……
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderMovie}
        keyExtractor={item => item.id}
        style={styles.list}
        refreshControl={this._renderRefreshControl()}
      />
    );
  }

  _renderRefreshControl () {
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        tintColor={'#FF0000'}
        title={'正在刷新数据，请稍后...'}
        titleColor={'#0000FF'} 
        onRefresh={this._onRefresh} // 刷新时调用onRefresh方法
      />
    );
  }
 
  _onRefresh = () => {
    this.setState({isRefreshing: true});

    setTimeout(() => {
      const refresh_movie = [{
        posters: { thumbnail: 'https://images.pexels.com/photos/793166/pexels-photo-793166.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
        title: '死数据',
        year: '2019年'
      },{
        posters: {thumbnail: 'https://images.pexels.com/photos/2174209/pexels-photo-2174209.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
        title: '死数据',
        year: '2019年'
      },{
        posters: {thumbnail: 'https://images.pexels.com/photos/2179689/pexels-photo-2179689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
        title: '死数据',
        year: '2019年'
      },{
        posters: {thumbnail: 'https://images.pexels.com/photos/2121862/pexels-photo-2121862.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
        title: '死数据',
        year: '2019年'
      }]
      this.setState({isRefreshing: false, data: refresh_movie})
    }, 2000);
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
