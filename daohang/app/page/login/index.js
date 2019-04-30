/**
 *     Revision   History:
 *        Initial:  2019/04/29         Author:  Wang Huajian
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Content, Item, Input, Icon } from 'native-base';

export default class Login extends React.Component {
  render() {
    return (
        <Content>
          <Item>
            <Input placeholder='username'/>
          </Item>
          <Item>
            <Input placeholder='password'/>
            <Icon active name='lock' />
          </Item>
        </Content>
    );
  }
}