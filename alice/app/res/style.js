/*
 *      Revision History:
 *           Initial:   2019/05/11        Author:  Wang Huajian
 */

import { Dimensions } from 'react-native';

const _width = 640;
const _height = 1138;

const Styles = {
  ScreenWidth: Dimensions.get('window').width,
  ScreenHeight: Dimensions.get('window').height,

  VirtualWidth: _width,
  VirtualHeight: _height,

  Width: (x) => {
    return x * Dimensions.get('window').width / _width; // eslint-disable-line
  },
  Height: (y) => {
    return y * Dimensions.get('window').height / _height; // eslint-disable-line
  },
};

export default Styles;
