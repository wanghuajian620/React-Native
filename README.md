# React Native
+ alice
  + 启动页的使用（Xcode 设置延时）
  + 组件 Modal 的简单使用
  + react-navigation 3.x 的使用
  
  <img width="350" height="350" src="https://github.com/wanghuajian620/React-Native/blob/master/alice/screenshots/interview.png"/>
  
+ daohang
  + react-navigation 3.x 的使用示例。
  
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/daohang/screenimages/login.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/daohang/screenimages/login1.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/daohang/screenimages/home.png"/>
  
+ music
  + 轮播图的实现（不引入第三方库），通过rn组件 ScrollView + 定时器 结合着组件的生命周期实现
  + 圆点指示器的实现  指示器由圆点组成（当然我们也可通过样式控制是圆点还是其他形状），圆点的个数即轮播图页面的数量， 且与当前页面一致时圆点会做颜色区分
  + FlatList  三个属性 data、renderItem、keyExtractor
     data: 是列表的数据源
     renderItem: 从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。当然也可以是个函数，在函数中我们return 一个写好格式的组件即可。
     keyExtractor: 此函数用于为给定的item生成一个不重复的key。
                   Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
                   若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标
  + 上拉加载、下拉刷新  实则是在onReFresh的回调函数中请求新的接口，放到新的数组里，改变state中的初始值。
  + 导航（react-navigation 3.x）
  
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/music/app/shoppingcart/home.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/music/app/shoppingcart/refresh.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/music/app/shoppingcart/refreshed.png"/>
  
+ traveller
  + 结合dva的rn应用 

  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/traveller/app/screenshoot/1.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/traveller/app/screenshoot/2.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/traveller/app/screenshoot/3.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/traveller/app/screenshoot/4.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/traveller/app/screenshoot/5.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/traveller/app/screenshoot/6.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/traveller/app/screenshoot/7.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/traveller/app/screenshoot/8.png"/>
  <img width="250" height="450" src="https://github.com/wanghuajian620/React-Native/blob/master/traveller/app/screenshoot/9.png"/>
  
