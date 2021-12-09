/**
 * @description toast弹窗
 * @param {String} title 提示文字
 * @param {Object} option 参数对象
 * @param {String} option.position toast位置[top|center|bottom]
 * */
function toast(title, option = {}) {
  option.position = option.position ? option.position : 'bottom';
  option.duration = option.duration ? option.duration : 1500;
  return new Promise((resolve, reject) => {
    // #ifdef APP-PLUS
    plus.nativeUI.toast(title, {
      duration: option.duration > 2000 ? 'long' : 'short',
      verticalAlign: option.position
    });
    setTimeout(resolve, option.duration);
    // #endif
    // #ifndef APP-PLUS
    uni.showToast({
      title: title,
      icon: "none",
      mask: option.mask,
      duration: option.duration,
      position: option.position,
      complete: () => {
        setTimeout(resolve, option.duration);
      }
    });
    // #endif
  });
}

export default toast
