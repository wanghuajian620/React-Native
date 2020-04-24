React Native版本升级

### 安装说明(Mac需安装cocoapods)：

1. 根目录下执行 npm install
2. cd ios/
3. 将CocoaPods镜像源更改为  https://gems.ruby-china.com/
5. pod install
6. npm run ios

### 当前依赖包版本如下：

"react": "16.9.0"
"react-native": "0.61.5"
"react-navigation": "4.1.1"
"redux": "4.0.5"

### 升级记录：
1、修改componentWillMount生命周期中的相关逻辑(官方已不推荐使用该生命周期，并将其命名为 UNSAFE_componentWillMount)。
2、路由已修改TransitionStart方法的返回值。
3、修改数据监听的绑定事件