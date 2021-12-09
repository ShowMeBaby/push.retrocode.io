/**
 * @description confirm弹窗
 * @param {String} msg 提示文字
 * */
function confirm(msg) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: msg,
      success: function(res) {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      }
    });
  });
}
export default confirm
