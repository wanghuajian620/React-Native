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
 *     Initial: 2018/03/08        Wang Huajian
 */

export default {
  namespace: 'shop',

  state: {
    coffee: [{
      id: '1',
      uri: 'https://images.pexels.com/photos/204496/pexels-photo-204496.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '猫头鹰，我的梦想天使',
      title: '猫头鹰公社Owlery Cafe&Brew',
      address: '朝阳区青年路29号院华纺易城22号',
    },
    {
      id: '2',
      uri: 'https://images.pexels.com/photos/704982/pexels-photo-704982.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '把时光煮进咖啡里',
      title: '3.14 coffee',
      address: '石景山区京原路1号院1层1号（景阳',
    },
    {
      id: '3',
      uri: 'https://images.pexels.com/photos/296882/pexels-photo-296882.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '一卿一晨，互相陪伴',
      title: '卿晨咖啡',
      address: '海淀区复兴路69号院2号华熙live',
    },
    {
      id: '4',
      uri: 'https://images.pexels.com/photos/419585/chemist-pharmacy-singer-man-419585.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '跌入爱丽丝的奇幻之境',
      title: '六月花园咖啡馆',
      address: '海淀区中关村东路16号院龙湖南',
    },
    {
      id: '5',
      uri: 'https://images.pexels.com/photos/327173/pexels-photo-327173.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '不仅仅是一家私房咖啡店',
      title: '奥芝驿站',
      address: '海淀区海淀路小区6栋4门401',
    }],

    meal: [{
      id: '1',
      uri: 'https://images.pexels.com/photos/858508/pexels-photo-858508.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '浪漫与恋爱的气息都在这里',
      title: '喜鹊.Magpie咖啡&简餐',
      address: '石景山区政达路6-3号楼旁边',
    },
    {
      id: '2',
      uri: 'https://images.pexels.com/photos/415980/pexels-photo-415980.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '城堡里的香气',
      title: '莱恩堡国际酒庄',
      address: '房山区长阳镇稻田第一村长周路西侧',
    },
    {
      id: '3',
      uri: 'https://images.pexels.com/photos/566344/pexels-photo-566344.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '千寻中觅得一份美味',
      title: '千寻西班牙餐厅',
      address: '海淀区学院路768号创意产业园A区1号',
    }],

    tea: [{
      id: '1',
      uri: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '飞鸟穿梭，碧泉汨淙',
      title: '明慧茶院',
      address: '海淀区大觉寺路9号大觉寺内',
    },
    {
      id: '2',
      uri: 'https://images.pexels.com/photos/641038/pexels-photo-641038.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '上香山，吃茶去',
      title: '香山九号茶人生活馆',
      address: '海淀区香山公园9号停车场内',
    },
    {
      id: '3',
      uri: 'https://images.pexels.com/photos/39347/tea-farmhouse-hand-fresh-39347.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '半亩方塘，得大自在',
      title: '得大茶舍',
      address: '海淀区香山卧佛寺内',
    }],

    hotel: [{
      id: '1',
      uri: 'https://images.pexels.com/photos/175718/pexels-photo-175718.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '置身在绵延的森林中',
      title: '森林香居（合新家1号院）',
      address: '房山区蒲洼乡花台景区',
    },
    {
      id: '2',
      uri: 'https://images.pexels.com/photos/357547/pexels-photo-357547.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '得小筑且小住',
      title: '近山小筑',
      address: '昌平区南口镇虎峪自然风景区近山小筑',
    },
    {
      id: '3',
      uri: 'https://images.pexels.com/photos/128304/pexels-photo-128304.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '采菊东篱下，悠然见南山',
      title: '桃叶谷',
      address: '房山区周口镇黄山店村',
    }],

    dessert: [{
      id: '1',
      uri: 'https://images.pexels.com/photos/808941/pexels-photo-808941.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '淡紫色的香气源于正宗法甜',
      title: '致蜜邂逅法式甜品',
      address: '海淀区复兴路69号蓝色港湾购物中心',
    },
    {
      id: '2',
      uri: 'https://images.pexels.com/photos/236799/pexels-photo-236799.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '京东家的奶茶妹妹',
      title: 'JD智能奶茶馆',
      address: '海淀区中关村创业大街最北边',
    },
    {
      id: '3',
      uri: 'https://images.pexels.com/photos/704982/pexels-photo-704982.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '谈一场关于甜品的恋爱',
      title: 'FreakShake变态奶昔',
      address: '西单区西单北大街西单大悦城9层',
    }],

    work: [{
      id: '1',
      uri: 'https://images.pexels.com/photos/265883/pexels-photo-265883.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '打造年轻人的“饰界”',
      title: 'CENO一饰一诺首饰体验馆',
      address: '海淀区五道口华清嘉园10号楼209',
    },
    {
      id: '2',
      uri: 'https://images.pexels.com/photos/601170/pexels-photo-601170.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '爱美的妞儿自己做衣裳',
      title: '梵不繁工作室',
      address: '海淀区中关村南大2号华宇购物',
    },
    {
      id: '3',
      uri: 'https://images.pexels.com/photos/322674/pexels-photo-322674.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '原生态工作室里的精雕皮艺',
      title: '弄手作 手工皮具',
      address: '朝阳区来广营水岸南街16号',
    }],

    art: [{
      id: '1',
      uri: 'https://images.pexels.com/photos/46152/grandpa-old-shepherd-buffalo-46152.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '诉说时光的意义',
      title: '时间博物馆',
      address: '东城区鼓楼东大街298号',
    },
    {
      id: '2',
      uri: 'https://images.pexels.com/photos/148523/pexels-photo-148523.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '隐世的文艺范 神秘在开放',
      title: '皮娜鲍什下午茶',
      address: '东城区菊儿胡同20号',
    },
    {
      id: '3',
      uri: 'https://images.pexels.com/photos/127901/pexels-photo-127901.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '国子监旁的公益美术馆',
      title: '大都美术馆',
      address: '东城区国子监街乙28号（近雍和宫',
    }],

    life: [{
      id: '1',
      uri: 'https://images.pexels.com/photos/210854/pexels-photo-210854.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '香生活美学空间',
      title: '隐香兰舍',
      address: '海淀区香山公园东门买卖街30号雷音琴',
    },
    {
      id: '2',
      uri: 'https://images.pexels.com/photos/234781/pexels-photo-234781.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '在你身边的生活美学空间',
      title: '乐只生活美学空间',
      address: '海淀区上地安宁庄路26号悦MOMA',
    },
    {
      id: '3',
      uri: 'https://images.pexels.com/photos/53265/pexels-photo-53265.jpeg?h=350&auto=compress&cs=tinysrgb',
      name: '在一拙找寻生活的美好',
      title: '一拙',
      address: '东城区五道营胡同84号',
    }],
  },

  effects: {},

  reducers: {},
};
