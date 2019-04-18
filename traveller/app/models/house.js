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
 *     Initial: 2018/01/30        Wang Huajian
 */

export default {
  namespace: 'house',

  state: {
    housecards: [{
      id: 1,
      uri: 'https://images.pexels.com/photos/167533/pexels-photo-167533.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '苏州',
      title: '同里驿雲·水舍精品客栈',
      price: '¥298/天',
      tags: ['无微不至', '用品考究', '设计酒店'],
    },
    {
      id: 2,
      uri: 'https://images.pexels.com/photos/261181/pexels-photo-261181.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '大理',
      title: '泸沽湖一生一遇客栈',
      price: '¥468/天',
      tags: '一线滨湖',
    },
    {
      id: 3,
      uri: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '丽江',
      title: '丽江楚香谷客栈义尚酒店',
      price: '¥288/天',
      tags: '纳西民族建筑特色',
    },
    {
      id: 4,
      uri: 'https://images.pexels.com/photos/89184/pexels-photo-89184.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '北京',
      title: '隐居乡里-桃叶谷',
      price: '¥2680/天',
      tags: '体验传统农事',
    },
    {
      id: 5,
      uri: 'https://images.pexels.com/photos/261106/pexels-photo-261106.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '苏州',
      title: '苏州小眸园民国古董公馆',
      price: '¥421/天',
      tags: '由百年历史的苏州老宅改造而成',
    },
    {
      id: 6,
      uri: 'https://images.pexels.com/photos/167533/pexels-photo-167533.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '苏州',
      title: '同里驿雲·水舍精品客栈',
      price: '¥298/天',
      tags: ['无微不至', '用品考究', '设计酒店'],
    },
    {
      id: 7,
      uri: 'https://images.pexels.com/photos/167533/pexels-photo-167533.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '苏州',
      title: '同里驿雲·水舍精品客栈',
      price: '¥298/天',
      tags: ['无微不至', '用品考究', '设计酒店'],
    },
    {
      id: 8,
      uri: 'https://images.pexels.com/photos/167533/pexels-photo-167533.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '苏州',
      title: '同里驿雲·水舍精品客栈',
      price: '¥298/天',
      tags: ['无微不至', '用品考究', '设计酒店'],
    }],

    interestcards: [{
      id: 1,
      uri: 'https://images.pexels.com/photos/834657/pexels-photo-834657.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '成都',
      title: '用水彩的纹理，找到真实中的梦幻浪漫',
      brief: '水彩画的肌理之美',
      newprice: '¥92.00',
      oldprice: '109元/人',
      wish: '去许愿',
    },
    {
      id: 2,
      uri: 'https://images.pexels.com/photos/326583/pexels-photo-326583.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '深圳',
      title: '动手制作一件舒服耐穿的衣服',
      brief: '手作迷人而有趣',
      newprice: '¥160.00',
      oldprice: '180元/人',
      wish: '去许愿',
    },
    {
      id: 3,
      uri: 'https://images.pexels.com/photos/68558/pexels-photo-68558.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '成都',
      title: '鸟语蝉鸣的夏日，一起来手绘一柄娟扇',
      brief: '素雅清凉的手作之旅',
      newprice: '¥149.00',
      oldprice: '240元/人',
      wish: '去许愿',
    },
    {
      id: 4,
      uri: 'https://images.pexels.com/photos/169191/pexels-photo-169191.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '北京',
      title: '生活在画里，体会生命的和煦',
      brief: '缓下匆忙的脚步',
      newprice: '¥108.00',
      oldprice: '138元/人',
      wish: '去许愿',
    },
    {
      id: 5,
      uri: 'https://images.pexels.com/photos/169191/pexels-photo-169191.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '北京',
      title: '生活在画里，体会生命的和煦',
      brief: '缓下匆忙的脚步',
      newprice: '¥108.00',
      oldprice: '138元/人',
      wish: '去许愿',
    },
    {
      id: 6,
      uri: 'https://images.pexels.com/photos/169191/pexels-photo-169191.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '北京',
      title: '生活在画里，体会生命的和煦',
      brief: '缓下匆忙的脚步',
      newprice: '¥108.00',
      oldprice: '138元/人',
      wish: '去许愿',
    },
    {
      id: 7,
      uri: 'https://images.pexels.com/photos/169191/pexels-photo-169191.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '北京',
      title: '生活在画里，体会生命的和煦',
      brief: '缓下匆忙的脚步',
      newprice: '¥108.00',
      oldprice: '138元/人',
      wish: '去许愿',
    },
    {
      id: 8,
      uri: 'https://images.pexels.com/photos/326583/pexels-photo-326583.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '深圳',
      title: '动手制作一件舒服耐穿的衣服',
      brief: '手作迷人而有趣',
      newprice: '¥160.00',
      oldprice: '180元/人',
      wish: '去许愿',
    }],

    inspirationcards: [{
      id: 1,
      aUri: 'https://images.pexels.com/photos/245032/pexels-photo-245032.jpeg?h=350&auto=compress&cs=tinysrgb',
      bUri: 'https://images.pexels.com/photos/434346/pexels-photo-434346.jpeg?h=350&auto=compress&cs=tinysrgb',
      cUri: 'https://images.pexels.com/photos/136419/pexels-photo-136419.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '北京',
      title: '摄影首选高颜值白房子',
      price: '¥500/小时',
      brief: '艺术空间~可容纳10人',
    },
    {
      id: 2,
      aUri: 'https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?h=350&auto=compress&cs=tinysrgb',
      bUri: 'https://images.pexels.com/photos/594452/pexels-photo-594452.jpeg?h=350&auto=compress&cs=tinysrgb',
      cUri: 'https://images.pexels.com/photos/210158/pexels-photo-210158.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '北京',
      title: '体验三里屯创意混搭的共享私密空间',
      price: '¥300/小时',
      brief: '艺术空间~可容纳1人',
    },
    {
      id: 3,
      aUri: 'https://images.pexels.com/photos/165228/pexels-photo-165228.jpeg?h=350&auto=compress&cs=tinysrgb',
      bUri: 'https://images.pexels.com/photos/730804/pexels-photo-730804.jpeg?h=350&auto=compress&cs=tinysrgb',
      cUri: 'https://images.pexels.com/photos/230131/pexels-photo-230131.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '成都',
      title: '体验精致中式品茗空间',
      price: '¥199.99/小时',
      brief: '茶会雅集~可容纳100人',
    },
    {
      id: 4,
      aUri: 'https://images.pexels.com/photos/32266/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb',
      bUri: 'https://images.pexels.com/photos/327136/pexels-photo-327136.jpeg?h=350&auto=compress&cs=tinysrgb',
      cUri: 'https://images.pexels.com/photos/39347/tea-farmhouse-hand-fresh-39347.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '成都',
      title: '茶香缥缈的品茗室',
      price: '¥199.99/小时',
      brief: '茶室~可容纳20人',
    },
    {
      id: 5,
      aUri: 'https://images.pexels.com/photos/601169/pexels-photo-601169.jpeg?h=350&auto=compress&cs=tinysrgb',
      bUri: 'https://images.pexels.com/photos/266174/pexels-photo-266174.jpeg?h=350&auto=compress&cs=tinysrgb',
      cUri: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?h=350&auto=compress&cs=tinysrgb',
      place: '北京',
      title: '京城后山的多功能艺术空间',
      price: '¥199.99/小时',
      brief: '艺术空间~可容纳500人',
    }],
  },

  effects: {},

  reducers: {},
};
