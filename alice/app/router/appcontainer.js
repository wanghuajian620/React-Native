/**
 *     Revision   History:
 *        Initial:  2019/05/09         Author:  Wang Huajian
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';

import MyAPP from './stacknavigator';

const APP = createAppContainer(MyAPP);

export default class Alice extends React.Component {
  render() {
    return (
      <APP />
    )
  }
};
