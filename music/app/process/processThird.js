/**
 *    Revision    History:
 *     Initial:    2019/04/26          Author:   Wang Huajian
 *     简短介绍: 此页是长列表 FlatList 以及 ActivityIndicator 的详细使用
 */

import React from 'react';
import { View, Image, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

var movie_api = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

export default class LongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      />
    );
  }

  // renderLoadingView() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>
  //         正在加载电影数据……
  //       </Text>
  //     </View>
  //   );
  // }

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
