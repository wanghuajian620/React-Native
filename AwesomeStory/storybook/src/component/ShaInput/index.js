/**
 * @Description  密码框加密组件
 * @Author       beibei
 * @Date         2018/8/15
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image
} from 'react-native';
import DslSDK from '../../sdk/sdk';
import { hex_sha1 } from "../../util/verify/sha.js";//加密
import uniqueId from 'lodash/uniqueId';
import './methods';
import Icon from 'cap4m/lib/Icon'

const boolSwitch = (d) => d ? d !== 'false' : false;
const { width } = Dimensions.get('window');

//组件名称
let selfName = "ShaInput";

class _ShaInput extends Component {


  static defaultProps = {
    text: '密 码'
  }

  constructor(props) {
    super(props);

    this.state = {
      handledValue: undefined,
      psdLevel: 0,
      psdLength: 0,
      opacity: new Animated.Value(0),
      error: false
    }

    let { autoref } = props;

    this.id = autoref ? 'ShaInput_' + autoref : uniqueId('shaInput_auto_ref');

    window.$instanceMap.set(this.id, this)
  }

  //输入时
  onChange = (v) => {
    this.setState({
      value: v
    })
  }

  //加密函数
  shaFn = (v) => {
    return hex_sha1(v);
  }

  //显示密码框内容
  showInput = () => {
    let text;
    let {
      handledValue,
      psdLevel,
      psdLength
    } = this.state;

    let {
      placeholder
    } = this.props;

    text = handledValue ? ('.'.repeat(psdLength)) : (placeholder ? placeholder : '');

    return text;

  }

  //input框点击
  pressInput() {
    
    //如果有值清空
    if (this.state.handledValue !== '') {
      this.setState({
        handledValue: undefined,
        psdLevel: 0,
        psdLength: 0,
        error: false
      })

    }
    //此时光标该闪烁
    this.timer = setInterval(this.animatedFn, 1500);

    //调出键盘
    DslSDK.onKeyboard({
      isUp: '1',
      isRandom: boolSwitch(this.props.isRandom)?'1':'0'
    }, (rel) => {

      //blur效果
      this.timer && clearInterval(this.timer)

      Animated.spring(this.state.opacity, {
        toValue: 0,
        duration: 10000
      })

      if (rel.hasOwnProperty('resultCode') && rel.resultCode === 0) {

        let { resultMessage } = rel;
      
        console.warn('原生返回:', rel)

        if (resultMessage !== 'ok' || resultMessage !== '') {

          this.setState({
            handledValue: resultMessage.pwdValue,
            psdLevel: resultMessage.pwdStrong,
            psdLength: resultMessage.pwdLength
          })

          //回传值
          this.props.onBlur && this.props.onBlur({
            componentName: selfName,
            pwdValue: resultMessage.pwdValue,
            pwdStrong: resultMessage.pwdStrong,
            pwdLength: resultMessage.pwdLength
          })

          if (resultMessage.pwdStrong === '0') {
            $Toast.info('请输入两种类型并且长度不少于8位')
            this.setState({
              error: true
            })
          }
        }

      } else {
        //失败
        $Toast.info(JSON.stringify(rel))
      }
    }, (err) => {
      $Toast.info(JSON.stringify(err))
    })
  }


  //获取值
  getObject = () => {
    let { handledValue, psdLength, psdLevel } = this.state;

    return {
      pwdValue: handledValue,
      pwdStrong: psdLevel,
      pwdLength: psdLength
    }

  }

  //闪烁效果
  animatedFn = () => {
    Animated.sequence([
      Animated.spring(this.state.opacity, {
        toValue: 1,
        duration: 10000
      }),
      Animated.spring(this.state.opacity, {
        toValue: 0,
        duration: 10000
      })
    ]).start();

  }

  //清除密码输入框文本内容
  cleanContent = ()=>{
    let {
      placeholder
    } = this.props;
    this.setState({
      handledValue: placeholder ? placeholder : '',
      psdLevel: 0,
      psdLength: 0,
      error: false
    })
  }

  //显示密码强度
  levelFn = () => {
    let { psdLevel } = this.state; //0,1,2,3,

    if (psdLevel == '0') {
      return;
    }

    let arrLevel = ["弱", "中", "强"];

    let level = arrLevel[Number(psdLevel - 1)];

    let progressBoxWidth = (width - 100) * 0.8;

    let percent = Math.ceil(progressBoxWidth / 3 * (psdLevel));


    return (
      <View style={styles.progressWrap}>
        {
          percent ? (<View style={{ width: progressBoxWidth, height: 2, backgroundColor: '#888' }}>
            <View style={[styles.progress, { width: percent || null }]} ></View>
          </View>) : null
        }
        <Text style={styles.progressText}>{level}</Text>
      </View>
    );
  }

  componentDidMount() {
    let { init } = this.props;
    init && init(this);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
    window.$instanceMap.delete(this.id)
    DslSDK.onKeyboard({
      isUp: '0',
      isRandom: boolSwitch(this.props.isRandom)?'1':'0'
    }, () => { }, () => { })
  }

  render() {

    let showValue = this.showInput();

    return (
      <View ref={this.id} style={{alignItems: 'center'}}>
        <View style={styles.container}>
          <View style={{width: 80}}>
             <Icon type='lock' size={24} ></Icon>
          </View>    
          <View style={styles.inputWrap}>
            <Animated.View style={[styles.cursor, { opacity: this.state.opacity }]}></Animated.View>
            <Text
              style={[styles.input, { color: showValue === this.props.placeholder ? "#888" : '#000' }]}
              onPress={() => { this.pressInput() }}
            >
              {
                showValue
              }
            </Text>
            {
              this.state.error ? <Image
                source={require('./images/error.png')}
                style={styles.error}
              /> : null
            }
          </View>
        </View>
        {boolSwitch(this.props.showLevel)
          ?
          <View style={styles.container}>
            <Text style={[styles.text, { width: 100, color: '#666' }]}>密码强度</Text>

            {
              this.levelFn()
            }

          </View>
          :
          null
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: width * .9,
    height: 44,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dddddd', 
  },
  text: {
    width: 80,
    fontSize: 17,
    color: '#000'
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cursor: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#333'
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    fontSize: 16
  },
  icon: {
    paddingLeft: 2
  },
  progressWrap: {
    height: 22,
    justifyContent: 'flex-end',
    marginTop: -4
  },
  progress: {
    backgroundColor: '#108ee9',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0
  },
  progressText: {
    color: '#666',
    fontSize: 10,
  },
  error: {
    width: 18,
    height: 18
  }
})

export default _ShaInput;
