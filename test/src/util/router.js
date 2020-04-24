/**
* 禁用安卓物理返回键处理
*/
export const listenKeyboardEvent = () => true;

/**
 * 路由跳转
 * @param url
 * @param param
 */
export const $Router = {
    // 页面跳转
    load(routeName, params) {
        if (routeName.indexOf('.') !== -1) {
            routeName = routeName.substring(0, routeName.indexOf('.'));
        }
        if (global.__this && global.__this.props) {
            global.__this.props.navigation.navigate(routeName, { ...params });
        } else {
            console.error(' window.$Router.load is not bind domain!');
        }
    },
    // 返回上一级
    back() {
        if (global.__this && global.__this.props) {
            global.__this.props.navigation.goBack();
            $.instanceList.pop();
            global.__this = $.instanceList[$.instanceList.length-1];
        } else {
            console.error(' window.$Router.load is not bind domain!');
        }
    },
  // 返回到堆栈中的上一个页面，如果提供一个参数 n，则指定在堆栈内返回几层。
    pop(n) {
        if (global.__this && global.__this.props) {
            n = isNaN(n) ? 1 : n;
            global.__this.props.navigation.pop(n);
            if(n>=$.instanceList.length){
                $.instanceList.splice(1);
            }else{
                $.instanceList.splice($.instanceList.length-n);
            }
            global.__this = $.instanceList[$.instanceList.length-1];
        } else {
            console.error(' window.$Router.load is not bind domain!');
        }
    },
  // 调用该方法将使用指定的路由覆盖当前的页面
    replace(routeName, params) {
        if (routeName.indexOf('.') !== -1) {
            routeName = routeName.substring(0, routeName.indexOf('.'));
        }
        if (global.__this && global.__this.props) {
            global.__this.props.navigation.replace(routeName, { ...params });
            $.instanceList.splice($.instanceList.length-1,1);
            global.__this = $.instanceList[$.instanceList.length-1];
        } else {
            console.error(' window.$Router.load is not bind domain!');
        }
    },
    // 获取参数
    getParams(param) {
        if (global.__this && global.__this.props) {
            if (param) {
                return global.__this.props.navigation.state.params[param];
            }
            return global.__this.props.navigation.state;
        }
        console.error(' window.$Router.load is not bind domain!');
    },
  // 获取当前路由名称
    getRouteName() {
        if (global.__this && global.__this.props) {
            return global.__this.props.navigation.state.routeName;
        }
        console.error(' window.$Router.getRouteName is not bind domain!');
    },
  // 打开抽屉菜单
    drawerOpen() {
        return global.__this.props.navigation.navigate('DrawerOpen');
    },
};