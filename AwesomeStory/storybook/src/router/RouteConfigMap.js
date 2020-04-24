
import __Router from '../../compile/router/router_config.json';
import cps from '../../compile/router/router_config';

//遍历设置路由页面
export const routeConfigMap = function(){
    const routers = __Router.routers;
    Object.keys(routers).forEach((router)=>{
        routers[router].screen = cps[router]
    })
    return routers
}()

