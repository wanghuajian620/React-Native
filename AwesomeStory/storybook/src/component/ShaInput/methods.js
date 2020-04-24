global.$ShaInput = function(id){
    const scope = window.$instanceMap.get(`ShaInput_${id}`);
    return {
        getValue(){
            return scope.getObject();
        }
    }
}