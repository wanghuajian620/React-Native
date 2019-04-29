/**
 *     Revision   History:
 *        Initial:  2019/04/29         Author:  Wang Huajian
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Item, Input, Icon } from 'native-base';

export default class Login extends React.Component {
  render() {
    return (
      // <Container>
        <Content>
          <Item>
            <Input placeholder='username'/>
          </Item>
          <Item>
            <Input placeholder='password'/>
            <Icon active name='lock' />
          </Item>
        </Content>
      // </Container>
    );
  }
}