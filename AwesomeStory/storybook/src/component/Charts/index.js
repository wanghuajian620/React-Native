/**
 * Charts
 */

import React, { Component } from 'react';
import Echarts from './echarts';
import uniqueId from 'lodash/uniqueId';
// import InitComponent from '../_utils/InitComponent';
import './methods';

class _Charts extends Component {

  constructor(props) {
    super(props);
    let { autoref } = props;
    this.id = autoref ? `Charts_${autoref}` : uniqueId('charts_auto_ref');
    window.$instanceMap.set(this.id, this);
  }

  getInstance = () => $Toast.info('待完善')

    // 设置数据
  setOption = (arr, theme) => {
    if (!Array.isArray(arr) && arr.length === 0) return;
    this.refs[this.id].chart.setNewOption(arr, theme);
  }

  componentWillUnmount() {
    window.$instanceMap.delete(this.id);
  }

  render() {
    let { option, width, height, onClick } = this.props;
    return (
            <Echarts
                ref={this.id}
                option={option}
                height={height}
                width={width}
                onClick={onClick}
            />
    );
  }
}

// export default InitComponent(_Charts);
export default _Charts;
