/*
 * MIT License
 *
 * Copyright (c) 2018 SmartestEE Co., Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2018/01/29        Wang Huajian
 */

// import Images from '../res/images';

export default {
  namespace: 'home',

  state: {
    slides: [
      'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?h=350&auto=compress&cs=tinysrgb',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?h=350&auto=compress&cs=tinysrgb',
      'https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg?h=350&auto=compress&cs=tinysrgb',
      'https://images.pexels.com/photos/66640/pexels-photo-66640.jpeg?h=350&auto=compress&cs=tinysrgb',
    ],

    business: [{
      uri: 'https://images.pexels.com/photos/823059/pexels-photo-823059.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '南锣鼓巷',
      brief: '北京最古老的街区之一',
    },
    {
      uri: 'https://images.pexels.com/photos/210158/pexels-photo-210158.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '798艺术区',
      brief: '坐拥多远艺术的优质活动地标',
    },
    {
      uri: 'https://images.pexels.com/photos/296492/pexels-photo-296492.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '三里屯',
      brief: '生动的京城夜色符号',
    },
    {
      uri: 'https://images.pexels.com/photos/777157/pexels-photo-777157.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '五道营',
      brief: '一条有趣的胡同',
    },
    {
      uri: 'https://images.pexels.com/photos/296492/pexels-photo-296492.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '前门',
      brief: '毗邻天安门广场',
    },
    {
      uri: 'https://images.pexels.com/photos/296492/pexels-photo-296492.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '国贸',
      brief: '集一线奢侈品于一体',
    },
    {
      uri: 'https://images.pexels.com/photos/296492/pexels-photo-296492.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '望京',
      brief: '理想的落脚之地',
    },
    {
      uri: 'https://images.pexels.com/photos/296492/pexels-photo-296492.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '西单',
      brief: '年轻人的购物天堂',
    }],

    classify: [{
      uri: 'https://images.pexels.com/photos/373888/pexels-photo-373888.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '咖啡馆',
    },
    {
      uri: 'https://images.pexels.com/photos/269126/pexels-photo-269126.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '茶空间',
    },
    {
      uri: 'https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '甜品铺',
    },
    {
      uri: 'https://images.pexels.com/photos/86753/pexels-photo-86753.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '餐吧',
    },
    {
      uri: 'https://images.pexels.com/photos/707581/pexels-photo-707581.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '旅舍',
    },
    {
      uri: 'https://images.pexels.com/photos/261969/pexels-photo-261969.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '艺术空间',
    }],

    shop: [{
      key: 'index[0]',
      uri: 'https://images.pexels.com/photos/19599/city-road-traffic-sun-19599.jpg?h=350&auto=compress&cs=tinysrgb',
      title: '岁月安好， 静默如初',
      curious: '1人想去',
      brief: '静默咖啡Slience Coffee',
    },
    {
      key: 'index[1]',
      uri: 'https://images.pexels.com/photos/784668/pexels-photo-784668.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '胡同里的“粉房子”',
      curious: '19人想去',
      brief: 'Cube Sugar ',
    },
    {
      key: 'index[2]',
      uri: 'https://images.pexels.com/photos/2755/restaurant.jpg?h=350&auto=compress&cs=tinysrgb',
      title: '不忘初心， 方得始终',
      curious: '5人想去',
      brief: '铃木食堂 （丽都店）',
    },
    {
      key: 'index[3]',
      uri: 'https://images.pexels.com/photos/690806/pexels-photo-690806.jpeg?h=350&auto=compress&cs=tinysrgb',
      title: '每秒24格的胶片时光',
      curious: '50人想去',
      brief: 'LA YUN',
    },
    {
      key: 'index[4]',
      uri: 'https://images.pexels.com/photos/7736/food-night-alcohol-beer.jpg?h=350&auto=compress&cs=tinysrgb',
      title: '调皮的麦芽之地',
      curious: '19人想去',
      brief: '调啤俱乐部',
    }],
  },

  effects: {},

  reducers: {},
};
