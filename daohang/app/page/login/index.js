/**
 *     Revision   History:
 *        Initial:  2019/04/29         Author:  Wang Huajian
 */

import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { Input, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Login extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      account: '',
      password: '',
      pwVisible: false
    }
  }

  render() {
    return (
      <ImageBackground
        source={{ uri: 'https://cdn.magdeleine.co/wp-content/uploads/2019/04/tumblr_og2ppfmQNq1tomxvuo8_1280.jpg'}}
        style={{ height, width }}
      >
        <StatusBar hidden={false} backgroundColor='white' />
        
        <View style={styles.content}>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: "#80989b", borderBottomWidth: 1 }}>
            <Text style={{ color: '#323232', paddingRight: 10 }}>账号</Text>
            <Input
              keyboardType='default'
              placeholder='请输入手机号或账号'
              placeholderTextColor='#eaf4fc'
              onChangeText={account => this.setState({ account })}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: "#80989b", borderBottomWidth: 1, marginVertical: 10 }}>
            <Text style={{ color: '#323232', paddingRight: 10 }}>密码</Text>
            <Input
              keyboardType={!this.state.pwVisible ? 'default' : 'email-address'}
              secureTextEntry={!this.state.pwVisible}
              placeholder='请输入密码'
              placeholderTextColor='#eaf4fc'
              onChangeText={password => this.setState({ password })}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({ pwVisible: !this.state.pwVisible })
              }}
              activeOpacity={0.8}
            >
              {
                this.state.pwVisible ?
                  <Icon name='ios-unlock' size={24} color='#dddddd' />
                  :
                  <Icon name='ios-lock' size={24} color='#dddddd' />
              }
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={this.state.account && this.state.password ? 0.7 : 1}
            style={{
              backgroundColor: this.state.account && this.state.password ? '#5c9291' : '#6c848d',
              paddingVertical: 10,
              borderRadius: 10,
              width: width - 100,
              alignItems: 'center',
              marginTop: 20
            }}
            onPress={() => this.props.navigation.push('Tab')}
          >
            <Text style={{ color: 'white' }}>登录</Text>
          </TouchableOpacity>

          <View style={{ width: width - 100, display: "flex", flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.push('Signup')}>
              <Text style={{ color: '#cccccc', fontSize: 14 }}>注册</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.push('Password')}>
              <Text style={{ color: '#cccccc', fontSize: 14 }}>忘记密码</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: width,
    paddingHorizontal: 50,
  }
};
