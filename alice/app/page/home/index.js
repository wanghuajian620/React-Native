/**
 *    Revision  History:
 *       Initial:   2019/05/09       Author:   Wang Huajian
 */

import React from 'react';
import { StyleSheet, View, Button, Modal, Image } from 'react-native';

import Color from '../../res/color';
import Styles from '../../res/style';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
          <Image style={styles.image} source={{uri: 'https://cdn.magdeleine.co/wp-content/uploads/2019/05/47021989662_5187bbbe62_o-1400x935.jpg'}}/>
          <Button
            title="打开Modal窗口"
            color={Color.buttonColor}
            onPress={this._openModalWin}
          />
        </View>

        <Modal
          animationType='fade'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this._closeModalWin() }}
        >
          <View style={styles.modalLayer}>
            <View style={styles.modalContainer}>
            <Image style={styles.modalimage} source={{uri: 'https://imgs.xkcd.com/comics/alternative_energy_revolution.jpg'}} />
              <View style={styles.modalButtonStyle}>
                <Button
                  title='关闭'
                  color={Color.buttonColor}
                  onPress={this._closeModalWin}
                />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Styles.Height(300)
  },
  image: {
    height: Styles.Height(300),
    width: Styles.Width(300),
    borderRadius: 5,
  },
  modalLayer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Styles.Height(50),
    paddingRight: Styles.Width(50),
    paddingBottom: Styles.Height(50),
    paddingLeft: Styles.Width(50),
    backgroundColor: Color.backgroundColor,
  },
  modalimage: {
    height: Styles.Height(600),
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: Color.backgroundColor
  },
  modalButtonStyle: {
    marginTop: Styles.Height(14),
  }
});

export default Home;
