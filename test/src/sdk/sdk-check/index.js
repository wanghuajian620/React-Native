var $rules = require('./rule')

function check(params , method) {
    var item = $rules[method]
    var result = {
        validate: true,
        message: '成功'
    }
    //如果参数为字符串类型，直接进行校验
    if(typeof(params) == 'string'){
        if(item && item.express){
            var rs = new Function('item',`return ${item.express.replace(/val/g, `item`)}`)(params)
            if (!rs) {
                result.validate = rs
                result.message = item.message
            }
        }
    }else{
     //参数为object，循环校验
     for(var pop in item) { 
        if (item[pop] && item[pop].express) {
            var rs;
            rs = new Function('item',`return ${item[pop].express.replace(/val/g, `item.${pop}`)}`)(params)
            if (!rs) {
                result.validate = rs
                result.message = item[pop].message
                break;
            }
            //参数内属性为数组时
            if(Object.prototype.toString.call(params[pop]) == '[object Array]' && item[pop].child){
                 var paramArray = params[pop];
                 for(var i=0 ;i<paramArray.length ;i++){
                     rs = new Function('item',`return ${item[pop].child.express.replace(/val/g, `item`)}`)(paramArray[i])
                     if (!rs) {
                       result.validate = rs
                       result.message = item[pop].child.message
                       return result    
                    }
                 } 
            }
        } 
      }
    }
   return result
}

function api(params,method) {
    if (params && method) {
        return check(params,method)
    }
    return {
        validate: false,
        message: '调用方法传入参数为空！'
    }
}

module.exports = {
    api: api
}
