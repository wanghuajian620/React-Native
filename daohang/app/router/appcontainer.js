/**
 *     Revision   History:
 *        Initial:  2019/05/05         Author:  Wang Huajian
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';

import MyAPP from './stacknavigator';

const APP = createAppContainer(MyAPP);

export default class DaoHang extends React.Component {
  render() {
    return (
      <APP />
    )
  }
};
