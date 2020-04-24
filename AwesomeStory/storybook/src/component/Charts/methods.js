global.$Charts = function (id) {
  let scope = window.$instanceMap.get(`Charts_${id}`);
  return {
    getInstance() {
      return scope.getInstance();
    },
    setOption(arr, theme) {
      return scope.setOption(arr, theme);
    },
  };
};
