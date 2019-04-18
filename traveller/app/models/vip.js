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
 *     Initial: 2018/03/03        Wang Huajian
 */

export default {
  namespace: 'vip',

  state: {
    discount: [{
      uri: 'https://images.pexels.com/photos/799869/pexels-photo-799869.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '专享福利',
      title: '一山杂货',
      brief: '四川省成都市锦江区红星路二段122号508室',
    },
    {
      uri: 'https://images.pexels.com/photos/175711/pexels-photo-175711.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '9.5折',
      title: '叁咖啡',
      brief: '四川省成都市武侯区来福广场三楼水池旁',
    },
    {
      uri: 'https://images.pexels.com/photos/17469/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb',
      welfare: '赠送甜品一份',
      title: '苏坦土耳其餐吧',
      brief: '四川省成都市武侯区芳华街25号附12号',
    },
    {
      uri: 'https://images.pexels.com/photos/5317/food-salad-restaurant-person.jpg?h=350&auto=compress&cs=tinysrgb',
      welfare: '菜品9折优惠',
      title: '瘾食',
      brief: '四川省成都市青羊区奎星楼街55号（近民盟成都社会大学）',
    },
    {
      uri: 'https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '专享福利',
      title: '叁號門生活馆',
      brief: '桐梓林南路6号 芳草地小区三号门右侧',
    },
    {
      uri: 'https://images.pexels.com/photos/756093/pexels-photo-756093.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '8折',
      title: '初代',
      brief: '成都市青羊区奎星楼街18号附6号',
    },
    {
      uri: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '赠送果盘、小吃',
      title: 'H2私房院子',
      brief: '成都市锦江区三圣乡采莲路38号',
    },
    {
      uri: 'https://images.pexels.com/photos/160812/coffee-cup-and-saucer-black-coffee-tea-spoon-160812.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '8.8折',
      title: '墨染咖啡馆',
      brief: '四川省成都市武侯区大学路12号附11号',
    },
    {
      uri: 'https://images.pexels.com/photos/192136/pexels-photo-192136.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '8.8折优惠',
      title: '森小花多肉DIY植物馆',
      brief: '成都市高新区都会路55号城南天府四单元220',
    },
    {
      uri: 'https://images.pexels.com/photos/541525/pexels-photo-541525.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '8折优惠',
      title: '木作花园',
      brief: '四川省成都市高新区天府新谷9栋1楼',
    },
    {
      uri: 'https://images.pexels.com/photos/263168/pexels-photo-263168.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '8.5折优惠',
      title: '遇见烘焙体验馆',
      brief: '成都市金牛区花牌坊街40号无里创意工厂A栋3楼7号',
    },
    {
      uri: 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '享受9折优惠',
      title: '太古里的大象家',
      brief: '成都市锦江区天仙桥北街3号',
    },
    {
      uri: 'https://images.pexels.com/photos/187069/pexels-photo-187069.jpeg?h=350&auto=compress&cs=tinysrgb',
      welfare: '专享福利',
      title: '芦苇屿island',
      brief: '成都市锦江区大慈路3号榔榆1单元4604',
    }],

    type: [{
      uri: 'https://images.pexels.com/photos/691152/pexels-photo-691152.jpeg?h=350&auto=compress&cs=tinysrgb',
      type: '甜品店',
      discount: '低至八折',
    },
    {
      uri: 'https://images.pexels.com/photos/6347/coffee-cup-working-happy.jpg?h=350&auto=compress&cs=tinysrgb',
      type: '咖啡店',
      discount: '低至八折',
    },
    {
      uri: 'https://images.pexels.com/photos/5172/coffee-cup-hand-mug.jpg?h=350&auto=compress&cs=tinysrgb',
      type: '工作室',
      discount: '低至八折',
    },
    {
      uri: 'https://images.pexels.com/photos/545046/pexels-photo-545046.jpeg?h=350&auto=compress&cs=tinysrgb',
      type: '旅舍',
      discount: '最高可省500元',
    },
    {
      uri: 'https://images.pexels.com/photos/669164/pexels-photo-669164.jpeg?h=350&auto=compress&cs=tinysrgb',
      type: '特色餐吧',
      discount: '免费送招牌菜',
    },
    {
      uri: 'https://images.pexels.com/photos/34780/mug-raspberries-berry-tea.jpg?h=350&auto=compress&cs=tinysrgb',
      type: '茶空间',
      discount: '赠送免费茶饮',
    }],

    honor: [{
      uri: 'https://images.pexels.com/photos/756093/pexels-photo-756093.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '初代',
      title: '抹茶的清新回甘，每一口都是惊喜',
      address: '成都市青羊区奎星楼街18号附6号',
      discount: '8折',
    },
    {
      uri: 'https://images.pexels.com/photos/231062/pexels-photo-231062.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '别有AnotherSpace',
      title: '别致的工业风，近世的桃花源',
      address: '锦江区玉成街14号新3号',
      discount: '8折优惠',
    },
    {
      uri: 'https://images.pexels.com/photos/626986/pexels-photo-626986.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '琦琦24小时书店',
      title: '这是个你可以24小时与书独处的地方',
      address: '四川省成都市锦江区义学巷81号',
      discount: '赠送书签或精美小食一份',
    },
    {
      uri: 'https://images.pexels.com/photos/374780/pexels-photo-374780.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: 'INVISI COFFEE SHOP',
      title: '咖啡冲煮大赛中国区冠军为你做咖啡',
      address: '成都市高新区广和二街197号',
      discount: '9折优惠',
    },
    {
      uri: 'https://images.pexels.com/photos/17469/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb',
      name: '苏坦土耳其餐吧',
      title: '美轮美奂的地道土耳其餐',
      address: '四川省成都市武侯区芳华街25号附12号',
      discount: '赠送甜品一份',
    },
    {
      uri: 'https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '叁號門生活馆',
      title: '把生命浪费在喜欢的事物上',
      address: '桐梓林南路6号 芳草地小区三号门右侧',
      discount: '小日子专项套餐：遇双数就半价啦！所有饮品或糕第二单半价，遇第四单，第六单继续半价哦',
    },
    {
      uri: 'https://images.pexels.com/photos/5317/food-salad-restaurant-person.jpg?h=350&auto=compress&cs=tinysrgb',
      name: '瘾食',
      title: '除了自贡菜还有好电影',
      address: '四川省成都市青羊区奎星楼街55号（近民盟成都社会大学）',
      discount: '菜品9折优惠',
    }],
  },

  effects: {},

  reducers: {},
};
