/**
 * ajax请求
 * @param obj
 */
 export const $Ajax = function (obj) {
    const type = obj.type || 'POST';
    const url = obj.url;
    const data = obj.data;
    const success = obj.success;
    const error = obj.error;

  // 提示：body值stringtify留给用户操作。
    fetch(url,
        {
            method: type,
            headers: new Headers(obj.headers || {}),
            body: data,
        })
    .then(
        (response) => {
            response && response.json().then((v) => {
                success && success(v);
            });
        }
    )
    .catch((err) => {
        error && error(err);
    });
};