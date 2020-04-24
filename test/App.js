import React, { Component } from 'react';
import { View, NativeEventEmitter, NativeModules, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from './src/store/index';
import Navigator from './src/router/Navigator';

class App extends Component {
  static propTypes = {
    remotePushInfo: PropTypes.any,
  };

  componentDidMount() {
    // NativeModules.SplashScreen.hide();
    if (this.props.remotePushInfo) {
      DeviceEventEmitter.emit('remoteNotifications', this.props.remotePushInfo);
    }
    const { TokenManager } = NativeModules;
    if (TokenManager) {
      const AEWPushMsgHandles = new NativeEventEmitter(TokenManager);
      this.listener = AEWPushMsgHandles.addListener(TokenManager.pushNotification, (data) => {
        DeviceEventEmitter.emit('remoteNotifications', data);
      });
    }
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
    this.listener = null;
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;

