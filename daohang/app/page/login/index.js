/**
 *     Revision   History:
 *        Initial:  2019/04/29         Author:  Wang Huajian
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Content, Item, Input, Icon, Form, Label } from 'native-base';

export default class Login extends React.Component {
  render() {
    return (
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>账号</Label>
              <Input />
            </Item>
            <Item inlineLabel>
              <Label>密码</Label>
              <Input />
              <Icon type='Ionicons' name='ios-eye' />
            </Item>
          </Form>
        </Content>
    );
  }
}