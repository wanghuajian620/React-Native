/**
 *    Revision  History:
 *       Initial:   2019/05/09       Author:   Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableHighlight, Image } from 'react-native';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  _openModalWin = () => {
    this.setState({modalVisible: true});
  }

  _closeModalWin = () => {
      this.setState({modalVisible: false}, () => {
        this.props.navigation.navigate('Setting')
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentStyle}>
          <Text style={styles.contentTextStyle}>
            ModalComp
          </Text>
          <Button
            title="打开Modal窗口"
            color="#841584"
            onPress={this._openModalWin}
          />
        </View>

        <Modal
          animationType='fade' // 指定了 modal 的动画类型。
          transparent={false} // 背景是否透明，默认为白色，当为true时表示背景为透明。
          visible={this.state.modalVisible} // 是否显示 modal 窗口
          onRequestClose={() => { this._closeModalWin() }} // 回调会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发。
          onShow={()=>{console.log('modal窗口显示了');}} // 回调函数会在 modal 显示时调用
        >
          <View style={styles.modalLayer}>
            <View style={styles.modalContainer}>
              {/* <Text style={styles.modalTitleStyle}>这是个Modal窗口！</Text> */}
              <Image style={styles.modalimage} source={{uri: 'https://imgs.xkcd.com/comics/alternative_energy_revolution.jpg'}} />
              <View style={styles.modalButtonStyle}>
                <Button 
                  title='取消' 
                  color="#bf242a"
                  onPress={this._closeModalWin}
                ></Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentStyle: {
    padding:30
  },
  contentTextStyle: {
    textAlign: 'center',
    fontSize: 26
  },
  modalLayer: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 32
  },
  modalimage: {
    height: 300,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  modalTitleStyle: {
    textAlign: 'center',
    fontSize: 26
  },
  modalButtonStyle: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10
  }
});

export default Home;
