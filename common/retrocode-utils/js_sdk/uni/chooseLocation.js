/**
 * @description chooseLocation打开地图选择位置
 * */
function chooseLocation(msg) {
  return new Promise((resolve, reject) => {
    uni.chooseLocation({
      success: resolve,
      fail: reject
    });
  });
}
export default chooseLocation
