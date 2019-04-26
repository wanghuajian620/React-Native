/**
 *    Revision    History:
 *     Initial:    2019/04/26          Author:   Wang Huajian
 *     简短介绍: 此页是长列表组件 FlatList 使用前，请求api渲染第一个电影数据，并在渲染前加入常规的正在加载，提示用户。
 */

import React from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';

var movie_api = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

export default class processFirst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
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
          movies: responseData.movies
        })
      })
  }

  render() {

    if (!this.state.movies) {
      return this.renderLoadingView();
    }

      var movie = this.state.movies[0];
      return this.renderMovie(movie);
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

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image source={{uri: movie.posters.thumbnail}}  style={styles.image}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style ={styles.year}>{movie.year}</Text>
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
  }
});
